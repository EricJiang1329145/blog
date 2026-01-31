import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import markedKatex from 'marked-katex-extension';
import readingTime from 'reading-time';

// 配置 marked 库
const renderer = new marked.Renderer();

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
        <button class="copy-button" data-code="${encodeURIComponent(text)}">
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
  throwOnError: false,
  delimiters: [
    { left: "$", right: "$", display: false },
    { left: "$$", right: "$$", display: true }
  ]
}));

// 文章元数据接口
export interface PostMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

// 文章完整结构接口
export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
  readingTime: string;
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  // 检查目录是否存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const metadata = data as PostMetadata;
      const readingTimeResult = readingTime(content);
      
      // 预处理分割线，添加不同的类名
      let processedContent = content;
      // 替换 --- 为 <hr class="hr-thick">
      processedContent = processedContent.replace(/^-{3,}$/gm, '<hr class="hr-thick">');
      // 替换 *** 为 <hr class="hr-medium">
      processedContent = processedContent.replace(/^\*{3,}$/gm, '<hr class="hr-medium">');
      // 替换 ___ 为 <hr class="hr-thin">
      processedContent = processedContent.replace(/^_{3,}$/gm, '<hr class="hr-thin">');

      return {
        id: slug,
        slug,
        title: metadata.title,
        date: metadata.date,
        category: metadata.category,
        tags: metadata.tags,
        description: metadata.description,
        content: marked.parse(processedContent) as string,
        readingTime: `${readingTimeResult.text}`,
      };
    })
  );
  
  // 按日期降序排序
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const metadata = data as PostMetadata;
  const readingTimeResult = readingTime(content);
  
  // 预处理分割线，添加不同的类名
  let processedContent = content;
  // 替换 --- 为 <hr class="hr-thick">
  processedContent = processedContent.replace(/^-{3,}$/gm, '<hr class="hr-thick">');
  // 替换 *** 为 <hr class="hr-medium">
  processedContent = processedContent.replace(/^\*{3,}$/gm, '<hr class="hr-medium">');
  // 替换 ___ 为 <hr class="hr-thin">
  processedContent = processedContent.replace(/^_{3,}$/gm, '<hr class="hr-thin">');

  return {
    id: slug,
    slug,
    title: metadata.title,
    date: metadata.date,
    category: metadata.category,
    tags: metadata.tags,
    description: metadata.description,
    content: marked.parse(processedContent) as string,
    readingTime: `${readingTimeResult.text}`,
  };
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

// 按分类获取文章
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
