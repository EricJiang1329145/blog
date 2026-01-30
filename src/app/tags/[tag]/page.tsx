import Link from "next/link";
import { getPostsByTag } from "../../../../lib/posts";

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const posts = await getPostsByTag(tag);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="neon-text-green">标签</span>
          <span className="mx-2">|</span>
          <span className="neon-text-purple">{tag}</span>
        </h1>
        <p className="text-foreground/70 text-lg">{posts.length} 篇文章</p>
      </div>

      {/* 文章列表 */}
      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-xl">该标签下暂无文章</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="bg-card-bg p-6 rounded-lg border border-neon-green/20 hover:neon-border transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link href={`/posts/${post.slug}`} className="hover:neon-text-green transition-all">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-foreground/70 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Link href={`/categories/${post.category}`} className="bg-neon-green/10 text-neon-green px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </Link>
                    {post.tags.map((t) => (
                      <Link 
                        key={t} 
                        href={`/tags/${t}`} 
                        className={`px-3 py-1 rounded-full text-sm ${t === tag ? 'bg-neon-purple/20 text-neon-purple neon-border' : 'bg-neon-purple/10 text-neon-purple'}`}
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="text-foreground/70 text-sm flex flex-col items-end">
                  <p>{new Date(post.date).toLocaleDateString()}</p>
                  <p className="mt-2">{post.readingTime}</p>
                </div>
              </div>
              <Link href={`/posts/${post.slug}`} className="inline-block mt-4 text-neon-green hover:underline">
                探索更多 →
              </Link>
            </article>
          ))
        )}
      </div>

      {/* 返回标签列表 */}
      <div className="mt-12 text-center">
        <Link href="/tags" className="inline-flex items-center gap-2 text-neon-green hover:neon-text-green transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回标签列表
        </Link>
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  const { getAllTags } = await import("../../../../lib/posts");
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}
