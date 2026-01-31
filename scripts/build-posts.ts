import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
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

// 初始化 marked
marked.use({
  renderer
});

// 添加 KaTeX 扩展
marked.use(markedKatex({
  throwOnError: false
}));

// 文章元数据接口
interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  description: string;
}

// 文章完整结构接口
interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
  readingTime: string;
}

// 生成文章数据
async function generatePostsData() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  // 检查目录是否存在
  if (!fs.existsSync(postsDirectory)) {
    console.log('Posts directory not found, creating empty data file');
    const emptyData = {
      posts: [],
      tags: []
    };
    
    // 创建输出目录
    const outputDirectory = path.join(process.cwd(), 'lib', 'data');
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }
    
    // 写入空数据文件
    fs.writeFileSync(
      path.join(outputDirectory, 'posts.ts'),
      `export const posts = ${JSON.stringify(emptyData.posts, null, 2)};

export const tags = ${JSON.stringify(emptyData.tags, null, 2)};
`
    );
    
    return;
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts: Post[] = await Promise.all(
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
        tags: metadata.tags,
        description: metadata.description,
        content: marked.parse(processedContent) as string,
        readingTime: `${readingTimeResult.text}`,
      };
    })
  );
  
  // 按日期降序排序
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // 提取标签
  const tagsSet = new Set<string>();
  sortedPosts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
  const tags = Array.from(tagsSet).sort();
  
  // 创建输出目录
  const outputDirectory = path.join(process.cwd(), 'lib', 'data');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  
  // 写入数据文件
  fs.writeFileSync(
    path.join(outputDirectory, 'posts.ts'),
    `export const posts = ${JSON.stringify(sortedPosts, null, 2)};

export const tags = ${JSON.stringify(tags, null, 2)};
`
  );
  
  console.log(`Generated posts data for ${sortedPosts.length} posts`);
}

// 执行生成
if (require.main === module) {
  generatePostsData().catch((error) => {
    console.error('Error generating posts data:', error);
    process.exit(1);
  });
}

export default generatePostsData;
