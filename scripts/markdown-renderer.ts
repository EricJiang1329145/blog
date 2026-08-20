import hljs from 'highlight.js';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { escapeHtml, safeUrl } from './markdown-safety';

const renderer = new marked.Renderer();

renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
  return `<a href="${escapeHtml(safeUrl(href, true))}"${titleAttr} class="link-strong link-glass">${text}</a>`;
};

renderer.image = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
  const altAttr = text ? ` alt="${escapeHtml(text)}"` : ' alt=""';
  return `<img src="${escapeHtml(safeUrl(href))}"${altAttr}${titleAttr} loading="lazy" class="prose-image" />`;
};

renderer.html = ({ text }) => escapeHtml(text);

renderer.hr = ({ raw }) => {
  const marker = raw.trim();
  const className = marker.startsWith('***')
    ? 'hr-medium'
    : marker.startsWith('___')
      ? 'hr-thin'
      : 'hr-thick';
  return `<hr class="${className}">\n`;
};

renderer.code = ({ text, lang }) => {
  const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlightedCode = hljs.highlight(text, { language: validLanguage }).value;
  const lines = highlightedCode.split('\n');
  const lineNumbers = lines
    .map((_, index) => `<span class="line-number">${index + 1}</span>`)
    .join('\n');
  const codeWithLines = lines
    .map(line => `<div class="code-line"><span class="line-content">${line}</span></div>`)
    .join('\n');

  return `
    <div class="code-block-container">
      <div class="code-block-header">
        <span class="code-language">${validLanguage}</span>
        <button class="copy-button copy-button-strong btn-strong-interactive" data-code="${encodeURIComponent(text)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
          </svg>
          复制
        </button>
      </div>
      <div class="code-content-wrapper">
        <div class="line-numbers">${lineNumbers}</div>
        <div class="code-content">${codeWithLines}</div>
      </div>
    </div>
  `;
};

marked.use({ renderer });
marked.use(markedKatex({ throwOnError: false }));
marked.use({
  extensions: [
    {
      name: 'footnoteRef',
      level: 'inline',
      start(src) {
        return src.indexOf('[^');
      },
      tokenizer(src) {
        const match = src.match(/^\[\^(\d+)\]/);
        if (!match) return undefined;
        return {
          type: 'footnoteRef',
          raw: match[0],
          id: `fn${match[1]}`,
          label: match[1],
        };
      },
      renderer(token) {
        return `
          <span class="footnote-ref">
            <button class="footnote-button footnote-button-strong btn-strong-interactive" data-footnote-id="${token.id}" aria-label="脚注 ${token.label}">
              [${token.label}]
            </button>
            <span class="footnote-tooltip" id="footnote-tooltip-${token.id}"></span>
          </span>
        `;
      },
    },
  ],
});

export function renderMarkdown(content: string): string {
  const footnoteDefinitions: Array<{ label: string; content: string }> = [];
  const markdown = content.replace(
    /^\[\^(\d+)\]:\s*(.*)$/gm,
    (_definition, label: string, footnoteContent: string) => {
      footnoteDefinitions.push({ label, content: footnoteContent });
      return '';
    }
  );

  let renderedContent = marked.parse(markdown) as string;
  footnoteDefinitions.forEach(({ label, content: footnoteContent }) => {
    const id = `fn${label}`;
    const renderedFootnote = marked.parseInline(footnoteContent) as string;
    renderedContent += `
      <div class="footnote-definition" id="footnote-${id}" style="display: none;">
        <div class="footnote-label">[${label}]</div>
        <div class="footnote-content">${renderedFootnote}</div>
      </div>
    `;
  });

  return renderedContent;
}
