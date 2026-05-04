import { useState, useEffect } from 'react';
import { readDir, readFile } from '@tauri-apps/plugin-fs';
import { parseFrontmatter, ArticleFrontmatter } from '../lib/frontmatter';

export interface Article extends ArticleFrontmatter {
  path: string;
}

export function useArticles(repoPath: string | null) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoPath) return;

    const loadArticles = async () => {
      setLoading(true);
      try {
        const postsDir = `${repoPath}/content/posts`;
        const entries = await readDir(postsDir);
        const mdFiles = entries.filter(e => e.name?.endsWith('.md'));

        const articlesList: Article[] = [];
        for (const file of mdFiles) {
          if (file.name) {
            const contentBytes = await readFile(`${postsDir}/${file.name}`);
            const content = new TextDecoder().decode(contentBytes);
            try {
              const { frontmatter } = parseFrontmatter(content);
              articlesList.push({
                ...frontmatter,
                path: `${postsDir}/${file.name}`,
              });
            } catch {
              console.warn(`Failed to parse: ${file.name}`);
            }
          }
        }

        // Sort by date descending
        articlesList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setArticles(articlesList);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [repoPath]);

  return { articles, loading };
}