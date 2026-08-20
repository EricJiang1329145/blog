import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { renderMarkdown } from './markdown-renderer';
import { escapeXml } from './markdown-safety';

// 文章元数据接口
interface PostMetadata {
  title: string;
  date: string | Date;
  category?: string;
  tags: string[];
  description: string;
}

// 文章完整结构接口
interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  category?: string;
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
      tags: [],
      categories: []
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

export const categories = ${JSON.stringify(emptyData.categories, null, 2)};
`
    );

    fs.writeFileSync(
      path.join(outputDirectory, 'post-loaders.ts'),
      'export const postContentLoaders: Record<string, () => Promise<{ default: string }>> = {};\n'
    );
    
    return;
  }
  
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));
  const allPosts: Post[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`Invalid post filename ${fileName}; use lowercase kebab-case`);
      }
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const metadata = data as PostMetadata;
      const readingTimeResult = readingTime(content);

      if (
        typeof metadata.title !== 'string' || !metadata.title.trim()
        || typeof metadata.description !== 'string' || !metadata.description.trim()
        || !Array.isArray(metadata.tags) || !metadata.tags.every(tag => typeof tag === 'string' && tag.trim())
        || !metadata.date
        || (metadata.category !== undefined && typeof metadata.category !== 'string')
      ) {
        throw new Error(`Invalid frontmatter in ${fileName}`);
      }

      const parsedDate = metadata.date instanceof Date ? metadata.date : new Date(metadata.date);
      if (Number.isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date in ${fileName}`);
      }
      const date = parsedDate.toISOString();
      const renderedContent = renderMarkdown(content);
      
      return {
        id: slug,
        slug,
        title: metadata.title,
        date,
        category: metadata.category,
        tags: metadata.tags,
        description: metadata.description,
        content: renderedContent,
        readingTime: `${readingTimeResult.text}`,
      };
    })
  );
  
  // 按日期降序排序
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // 提取标签和分类
  const tagsSet = new Set<string>();
  const categoriesSet = new Set<string>();
  sortedPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
    if (post.category) categoriesSet.add(post.category);
  });
  const tags = Array.from(tagsSet).sort();
  const categories = Array.from(categoriesSet).sort();
  
  // 创建输出目录
  const outputDirectory = path.join(process.cwd(), 'lib', 'data');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  
  const postSummaries = sortedPosts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    category: post.category,
    tags: post.tags,
    description: post.description,
    readingTime: post.readingTime,
  }));

  // 元数据与正文分开输出，让列表页面无需加载所有文章 HTML。
  fs.writeFileSync(
    path.join(outputDirectory, 'posts.ts'),
    `export const posts = ${JSON.stringify(postSummaries, null, 2)};

export const tags = ${JSON.stringify(tags, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};
`
  );

  const contentDirectory = path.join(outputDirectory, 'post-content');
  fs.rmSync(contentDirectory, { recursive: true, force: true });
  fs.mkdirSync(contentDirectory, { recursive: true });

  sortedPosts.forEach(post => {
    fs.writeFileSync(
      path.join(contentDirectory, `${post.slug}.ts`),
      `const content = ${JSON.stringify(post.content)};\nexport default content;\n`
    );
  });

  const loaderEntries = sortedPosts
    .map(post => `  ${JSON.stringify(post.slug)}: () => import(${JSON.stringify(`./post-content/${post.slug}`)})`)
    .join(',\n');
  fs.writeFileSync(
    path.join(outputDirectory, 'post-loaders.ts'),
    `export const postContentLoaders: Record<string, () => Promise<{ default: string }>> = {\n${loaderEntries}\n};\n`
  );
  
  console.log(`Generated posts data for ${sortedPosts.length} posts`);

  // 生成 RSS feed
  const siteUrl = 'https://blog.jmr-eric.workers.dev';
  const rssItems = sortedPosts.map(post => {
    const postUrl = `${siteUrl}/posts/${encodeURIComponent(post.slug)}`;
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Eric's Blog — 技术与人文的思考笔记</title>
    <link>${siteUrl}</link>
    <description>关于技术、社会与生活的思考笔记</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
  console.log('Generated rss.xml');

  // 生成搜索索引
  const searchIndex = sortedPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
    category: p.category,
    date: p.date,
  }));
  fs.writeFileSync(
    path.join(publicDir, 'search-index.json'),
    JSON.stringify(searchIndex)
  );
  console.log('Generated search-index.json');
}

// 执行生成
if (require.main === module) {
  generatePostsData().catch((error) => {
    console.error('Error generating posts data:', error);
    process.exit(1);
  });
}

export default generatePostsData;
