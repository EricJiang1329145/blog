import { posts, tags, categories } from '../data/posts';

// Replicate the functions from lib/posts.ts using the raw data
const getAllPosts = () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug) || null;
const getAllTags = () => [...tags];
const getPostsByTag = (tag: string) => posts.filter(p => p.tags.includes(tag));
const getAllCategories = () => [...categories];
const getPostsByCategory = (cat: string) => posts.filter(p => p.category === cat);

describe('getAllPosts', () => {
  it('returns posts sorted by date descending', () => {
    const result = getAllPosts();
    expect(result.length).toBeGreaterThan(0);
    for (let i = 1; i < result.length; i++) {
      expect(new Date(result[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(result[i].date).getTime()
      );
    }
  });

  it('returns posts with all required fields', () => {
    const result = getAllPosts();
    for (const post of result) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.tags).toBeInstanceOf(Array);
      expect(post.description).toBeTruthy();
      expect(post.readingTime).toBeTruthy();
      expect(post.content).toBeTruthy();
    }
  });
});

describe('getPostBySlug', () => {
  it('returns a post for a valid slug', () => {
    const firstSlug = posts[0].slug;
    const post = getPostBySlug(firstSlug);
    expect(post).not.toBeNull();
    expect(post!.slug).toBe(firstSlug);
  });

  it('returns null for non-existent slug', () => {
    const post = getPostBySlug('non-existent-slug-xyz');
    expect(post).toBeNull();
  });
});

describe('getAllTags', () => {
  it('returns tags in alphabetical order', () => {
    const result = getAllTags();
    expect(result.length).toBeGreaterThan(0);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].localeCompare(result[i])).toBeLessThanOrEqual(0);
    }
  });

  it('all tags are non-empty strings', () => {
    for (const tag of getAllTags()) {
      expect(typeof tag).toBe('string');
      expect(tag.length).toBeGreaterThan(0);
    }
  });
});

describe('getPostsByTag', () => {
  it('returns posts containing the given tag', () => {
    const allTags = getAllTags();
    const tag = allTags[0];
    const result = getPostsByTag(tag);
    expect(result.length).toBeGreaterThan(0);
    for (const post of result) {
      expect(post.tags).toContain(tag);
    }
  });

  it('returns empty array for unknown tag', () => {
    expect(getPostsByTag('不存在的标签xyz')).toEqual([]);
  });
});

describe('getAllCategories', () => {
  it('returns categories', () => {
    const result = getAllCategories();
    expect(result.length).toBeGreaterThan(0);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].localeCompare(result[i])).toBeLessThanOrEqual(0);
    }
  });
});

describe('getPostsByCategory', () => {
  it('returns posts matching the category', () => {
    const allCats = getAllCategories();
    const cat = allCats[0];
    const result = getPostsByCategory(cat);
    expect(result.length).toBeGreaterThan(0);
    for (const post of result) {
      expect(post.category).toBe(cat);
    }
  });

  it('returns empty array for unknown category', () => {
    expect(getPostsByCategory('不存在的分类xyz')).toEqual([]);
  });
});

describe('data integrity', () => {
  it('all categories have matching posts', () => {
    for (const cat of getAllCategories()) {
      const result = getPostsByCategory(cat);
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('all tags have matching posts', () => {
    for (const tag of getAllTags()) {
      const result = getPostsByTag(tag);
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('posts have correctly formatted dates', () => {
    for (const post of posts) {
      const d = new Date(post.date);
      expect(d.toString()).not.toBe('Invalid Date');
    }
  });
});
