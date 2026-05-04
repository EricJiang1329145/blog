import { parse, stringify } from 'yaml';

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

export function parseFrontmatter(content: string): { frontmatter: ArticleFrontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Invalid frontmatter');
  return {
    frontmatter: parse(match[1]) as ArticleFrontmatter,
    body: match[2],
  };
}

export function stringifyFrontmatter(fm: ArticleFrontmatter, body: string): string {
  return `---\n${stringify(fm)}---\n\n${body}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, '-')
    .replace(/^-+|-+$/g, '');
}