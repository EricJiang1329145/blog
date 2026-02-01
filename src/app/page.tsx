import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import type { Metadata } from "next";

// 生成页面元数据
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Neon Cosmos - 探索技术、数学与太空的奇妙世界",
    description: "一个关于技术、数学和太空探索的博客",
  };
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-7xl mx-auto">
      {/* 标题部分 */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
          <span className="neon-text-green neon-glow-green">Neon</span>
          <span className="mx-2 text-foreground/50">|</span>
          <span className="neon-text-purple neon-glow-purple">Cosmos</span>
        </h1>
        <p className="text-foreground/70 text-lg md:text-xl neon-text-subtitle">
          探索技术、数学与太空的奇妙世界
        </p>
      </div>

      {/* 左右两栏布局 */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧栏 */}
        <div className="lg:w-1/4 space-y-6">
          {/* 作者信息区域 */}
          <div className="bg-card-bg p-6 rounded-lg border border-neon-green/20">
            <div className="text-center mb-6">
              {/* 作者头像 */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-neon-green/50">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20tech%20blogger%20portrait%2C%20neon%20lighting%2C%20tech%20aesthetic%2C%20digital%20art%2C%20high%20quality&image_size=square_hd" 
                  alt="作者头像" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 作者姓名 */}
              <h3 className="text-xl font-bold mb-2 neon-text-green">Eric Jiang</h3>
              {/* 作者简介 */}
              <p className="text-foreground/70 mb-4">
                热爱技术、数学和太空探索的技术爱好者，致力于分享有趣的知识和见解。
              </p>
              {/* 联系方式 */}
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-foreground hover:neon-text-green transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" className="text-foreground hover:neon-text-green transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-foreground hover:neon-text-green transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 网站数据分析模块 */}
          <div className="bg-card-bg p-6 rounded-lg border border-neon-green/20">
            <h3 className="text-lg font-bold mb-4 neon-text-purple">网站数据分析</h3>
            <div className="space-y-4">
              <div className="text-foreground/70 space-y-4">
                <div className="flex justify-between items-center p-3 bg-card-bg/50 rounded-lg border border-neon-green/10">
                  <span className="font-medium">站点总访问量</span>
                  <span className="neon-text-green font-bold">
                    <span id="busuanzi_value_site_pv"></span>
                    <span className="text-sm ml-1">次</span>
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card-bg/50 rounded-lg border border-neon-green/10">
                  <span className="font-medium">站点访客数</span>
                  <span className="neon-text-purple font-bold">
                    <span id="busuanzi_value_site_uv"></span>
                    <span className="text-sm ml-1">人次</span>
                  </span>
                </div>
                <div className="text-xs text-center text-foreground/50 mt-4">
                  数据统计由 <a href="http://busuanzi.ibruce.info/" target="_blank" rel="noopener noreferrer" className="hover:neon-text-green transition-all">不蒜子</a> 提供
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧主要内容区域 */}
        <div className="lg:w-3/4">
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
                      <p>{new Date(post.date).toISOString().split('T')[0]}</p>
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
      </div>
    </div>
  );
}
