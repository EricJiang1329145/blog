import { categories as categoriesData, posts as postsData, tags as tagsData } from './data/posts';
import { postContentLoaders } from './data/post-loaders';

export interface PostMetadata {
  title: string;
  date: string;
  category?: string;
  tags: string[];
  description: string;
}

export interface Post extends PostMetadata {
  id: string;
  slug: string;
  content?: string;
  readingTime: string;
}

export async function getAllPosts(): Promise<Post[]> {
  return [...postsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = postsData.find(candidate => candidate.slug === slug);
  const loadContent = postContentLoaders[slug];
  if (!post || !loadContent) return null;

  const { default: content } = await loadContent();
  return { ...post, content };
}

export async function getAllTags(): Promise<string[]> {
  return [...tagsData];
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

export async function getAllCategories(): Promise<string[]> {
  return [...categoriesData];
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}
