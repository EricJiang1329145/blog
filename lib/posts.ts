import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
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
  return `<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code class="language-${validLanguage}">${highlightedCode}</code></pre>`;
};

// 配置 KaTeX 插件
const katexOptions = {
  throwOnError: false,
  displayMode: true,
};

// 初始化 marked
marked.use({
  renderer
});

// 添加 KaTeX 扩展
marked.use(markedKatex({
  katexOptions
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
      
      return {
        id: slug,
        slug,
        title: metadata.title,
        date: metadata.date,
        category: metadata.category,
        tags: metadata.tags,
        description: metadata.description,
        content: marked.parse(content) as string,
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
  
  return {
    id: slug,
    slug,
    title: metadata.title,
    date: metadata.date,
    category: metadata.category,
    tags: metadata.tags,
    description: metadata.description,
    content: marked.parse(content) as string,
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
