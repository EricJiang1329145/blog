import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import type { Metadata } from "next";
import WebsiteAnalytics from "../components/WebsiteAnalytics";
import ScrollReveal from "../components/ScrollReveal";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Eric's Blog — 技术与人文的思考笔记",
    description: "关于技术、社会与生活的思考笔记",
  };
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          Eric&apos;s Blog
        </h1>
        <p className="text-text-muted text-base md:text-lg font-[family-name:var(--font-sans)]">
          技术与人文的思考笔记
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 space-y-6">
          <div className="card-paper p-6">
            <div className="text-center mb-5">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-card-border">
                {/* The remote generator does not expose stable dimensions or a Next Image-compatible host. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20tech%20blogger%20portrait%2C%20neon%20lighting%2C%20tech%20aesthetic%2C%20digital%20art%2C%20high%20quality"
                  alt="作者头像"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Eric Jiang</h3>
              <p className="text-text-secondary text-sm mb-4 font-[family-name:var(--font-sans)]">
                热爱技术、数学和太空探索的技术爱好者，致力于分享有趣的知识和见解。
              </p>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/ericjiang1329145" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="mailto:example@email.com?subject=来自博客的联系&body=您好，我是通过您的博客联系您的。" className="text-text-muted hover:text-accent transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <WebsiteAnalytics />
        </div>

        <div className="lg:w-3/4">
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-muted text-lg font-[family-name:var(--font-sans)]">暂无文章，敬请期待...</p>
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
                          <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="text-text-muted text-xs font-[family-name:var(--font-sans)] flex flex-col items-end shrink-0">
                      <p>{new Date(post.date).toISOString().split('T')[0]}</p>
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
        </div>
      </div>
    </div>
  );
}
