import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "../../../lib/posts";

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const categoryCounts = await Promise.all(
    categories.map(async (cat) => ({
      name: cat,
      count: (await getPostsByCategory(cat)).length,
    }))
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          分类
        </h1>
        <p className="text-text-muted text-sm font-[family-name:var(--font-sans)]">按分类浏览文章</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {categoryCounts.length === 0 ? (
          <div className="text-center py-16 w-full">
            <p className="text-text-muted text-lg font-[family-name:var(--font-sans)]">暂无分类</p>
          </div>
        ) : (
          categoryCounts.map(({ name, count }) => (
            <Link
              key={name}
              href={`/categories/${name}`}
              className="tag-pill px-4 py-2 text-sm"
            >
              {name}
              <span className="ml-1.5 text-text-muted text-xs">({count})</span>
            </Link>
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  );
}
