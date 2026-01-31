import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import type { Metadata } from "next";

// 生成页面元数据
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Neon Cosmos - 探索黑客、数学与太空的奇妙世界",
    description: "一个关于黑客技术、数学和太空探索的博客",
  };
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="neon-text-green">Neon</span>
          <span className="mx-2">|</span>
          <span className="neon-text-purple">Cosmos</span>
        </h1>
        <p className="text-foreground/70 text-lg md:text-xl">
          探索黑客、数学与太空的奇妙世界
        </p>
      </div>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-xl">暂无文章，敬请期待...</p>
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
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/tags/${tag}`} className="bg-neon-purple/10 text-neon-purple px-3 py-1 rounded-full text-sm">
                        {tag}
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
    </div>
  );
}
