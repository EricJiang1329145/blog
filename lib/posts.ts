import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import markedKatex from 'marked-katex-extension';

// 配置 marked 库
const renderer = new marked.Renderer();

// 自定义链接渲染
renderer.link = ({ href, title, text }) => {
  const linkClasses = 'link-strong link-glass';
  const titleAttr = title ? `title="${title}"` : '';
  return `<a href="${href}" ${titleAttr} class="${linkClasses}">${text}</a>`;
};

// 代码高亮配置
renderer.code = ({ text, lang }) => {
  const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlightedCode = hljs.highlight(text, { language: validLanguage }).value;
  
  // 生成带行号的代码
  const lines = highlightedCode.split('\n');
  const lineNumbers = lines.map((_, index) => `<span class="line-number">${index + 1}</span>`).join('\n');
  const codeWithLines = lines.map((line, index) => `<div class="code-line"><span class="line-content">${line}</span></div>`).join('\n');
  
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

// 配置 KaTeX 插件
const katexOptions = {
  throwOnError: false,
  displayMode: false,
};

// 初始化 marked
marked.use({
  renderer
});

// 添加 KaTeX 扩展
marked.use(markedKatex({
  throwOnError: false
}));

// 文章元数据接口
export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  description: string;
}

// 文章完整结构接口
export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
  readingTime: string;
}

// 导入预生成的文章数据
import { posts as postsData, tags as tagsData } from './data/posts';

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  return postsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return postsData.find(post => post.slug === slug) || null;
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  return tagsData;
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
