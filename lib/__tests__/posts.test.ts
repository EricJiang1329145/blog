import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
} from '../posts';
import { renderMarkdown } from '../../scripts/markdown-renderer';
import { escapeHtml, escapeXml, safeUrl } from '../../scripts/markdown-safety';

describe('post data access', () => {
  it('returns posts sorted by date descending without article bodies', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (let index = 1; index < posts.length; index += 1) {
      expect(new Date(posts[index - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[index].date).getTime()
      );
    }
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.tags).toBeInstanceOf(Array);
      expect(post.description).toBeTruthy();
      expect(post.readingTime).toBeTruthy();
      expect(post.content).toBeUndefined();
    }
  });

  it('loads a body only for the requested post', async () => {
    const [firstPost] = await getAllPosts();
    const post = await getPostBySlug(firstPost.slug);
    expect(post?.slug).toBe(firstPost.slug);
    expect(post?.content).toBeTruthy();
  });

  it('returns null for an unknown slug', async () => {
    await expect(getPostBySlug('non-existent-slug-xyz')).resolves.toBeNull();
  });

  it('keeps tags and categories sorted and connected to posts', async () => {
    const tags = await getAllTags();
    const categories = await getAllCategories();
    expect(tags.length).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(0);
    expect(tags).toEqual([...tags].sort());
    expect(categories).toEqual([...categories].sort());

    for (const tag of tags) {
      const posts = await getPostsByTag(tag);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts.every(post => post.tags.includes(tag))).toBe(true);
    }
    for (const category of categories) {
      const posts = await getPostsByCategory(category);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts.every(post => post.category === category)).toBe(true);
    }
  });

  it('returns empty lists for unknown filters', async () => {
    await expect(getPostsByTag('不存在的标签xyz')).resolves.toEqual([]);
    await expect(getPostsByCategory('不存在的分类xyz')).resolves.toEqual([]);
  });

  it('contains valid ISO dates', async () => {
    const posts = await getAllPosts();
    for (const post of posts) {
      expect(Number.isNaN(Date.parse(post.date))).toBe(false);
      expect(new Date(post.date).toISOString()).toBe(post.date);
    }
  });
});

describe('Markdown rendering safety', () => {
  it('escapes raw HTML', () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe(
      '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'
    );
  });

  it('blocks executable URL schemes', () => {
    expect(safeUrl('javascript:alert(1)', true)).toBe('#');
    expect(safeUrl('https://example.com')).toBe('https://example.com');
    expect(safeUrl('mailto:test@example.com', true)).toBe('mailto:test@example.com');
  });

  it('sanitizes raw HTML and executable links in rendered Markdown', () => {
    const rendered = renderMarkdown(
      '<img src=x onerror="alert(1)">\n\n[unsafe](javascript:alert(1))\n\n![unsafe](data:text/html,test)'
    );
    expect(rendered).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
    expect(rendered).toContain('href="#"');
    expect(rendered).toContain('src="#"');
    expect(rendered).not.toContain('javascript:');
    expect(rendered).not.toContain('data:text/html');
  });

  it('escapes RSS XML text', () => {
    expect(escapeXml(`A & B < C > D "quote" 'apostrophe'`)).toBe(
      'A &amp; B &lt; C &gt; D &quot;quote&quot; &apos;apostrophe&apos;'
    );
  });
});
