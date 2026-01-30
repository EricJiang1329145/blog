import Link from "next/link";
import { getAllTags } from "../../../lib/posts";

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="neon-text-green">标签</span>
          <span className="mx-2">|</span>
          <span className="neon-text-purple">Tags</span>
        </h1>
        <p className="text-foreground/70 text-lg">按标签浏览文章</p>
      </div>

      {/* 标签列表 */}
      <div className="flex flex-wrap gap-4 justify-center">
        {tags.length === 0 ? (
          <div className="text-center py-16 w-full">
            <p className="text-foreground/70 text-xl">暂无标签</p>
          </div>
        ) : (
          tags.map((tag) => (
            <Link 
              key={tag} 
              href={`/tags/${tag}`} 
              className="bg-card-bg px-6 py-3 rounded-full border border-neon-green/20 hover:neon-border transition-all"
            >
              <span className="hover:neon-text-green transition-all">{tag}</span>
            </Link>
          ))
        )}
      </div>

      {/* 返回首页 */}
      <div className="mt-12 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-neon-green hover:neon-text-green transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  );
}
