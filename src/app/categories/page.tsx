import Link from "next/link";
import { getAllCategories } from "../../../lib/posts";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="neon-text-green">分类</span>
          <span className="mx-2">|</span>
          <span className="neon-text-purple">Categories</span>
        </h1>
        <p className="text-foreground/70 text-lg">按分类浏览文章</p>
      </div>

      {/* 分类列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.length === 0 ? (
          <div className="text-center py-16 col-span-full">
            <p className="text-foreground/70 text-xl">暂无分类</p>
          </div>
        ) : (
          categories.map((category) => (
            <Link 
              key={category} 
              href={`/categories/${category}`} 
              className="bg-card-bg p-6 rounded-lg border border-neon-green/20 hover:neon-border transition-all"
            >
              <h2 className="text-2xl font-bold mb-2 hover:neon-text-green transition-all">
                {category}
              </h2>
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
