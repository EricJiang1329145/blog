import Link from "next/link";
import { getPostsByCategory } from "../../../../lib/posts";
import ScrollReveal from "../../../components/ScrollReveal";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const posts = await getPostsByCategory(category);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          {category}
        </h1>
        <p className="text-text-muted text-sm font-[family-name:var(--font-sans)]">{posts.length} 篇文章</p>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg font-[family-name:var(--font-sans)]">该分类下暂无文章</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <ScrollReveal key={post.slug} style={{ '--delay': `${i * 80}ms` } as React.CSSProperties}>
            <article className="card-paper p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                    <Link href={`/posts/${post.slug}`} className="text-foreground hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-text-secondary text-sm mb-4 font-[family-name:var(--font-sans)] leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="tag-pill"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="text-text-muted text-xs font-[family-name:var(--font-sans)] flex flex-col items-end shrink-0">
                  <p>{new Date(post.date).toLocaleDateString()}</p>
                  <p className="mt-1.5">{post.readingTime}</p>
                </div>
              </div>
              <Link href={`/posts/${post.slug}`} className="inline-block mt-3 text-sm text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)]">
                阅读 →
              </Link>
            </article>
            </ScrollReveal>
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/categories" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回分类列表
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllCategories } = await import("../../../../lib/posts");
  const categories = await getAllCategories();
  return categories.map((category) => ({ category }));
}
