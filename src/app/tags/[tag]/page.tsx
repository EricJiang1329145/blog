import Link from "next/link";
import { getPostsByTag } from "../../../../lib/posts";
import ScrollReveal from "../../../components/ScrollReveal";

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          {tag}
        </h1>
        <p className="text-text-muted text-sm font-[family-name:var(--font-sans)]">{posts.length} 篇文章</p>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg font-[family-name:var(--font-sans)]">该标签下暂无文章</p>
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
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/tags/${t}`}
                        className={t === tag ? 'tag-pill tag-pill-active' : 'tag-pill'}
                      >
                        {t}
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
        <Link href="/tags" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回标签列表
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllTags } = await import("../../../../lib/posts");
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}
