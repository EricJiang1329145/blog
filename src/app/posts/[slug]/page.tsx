import Link from "next/link";
import { getPostBySlug } from "../../../../lib/posts";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata | undefined> {
	const post = await getPostBySlug(params.slug);
	if (!post) return;

	return {
		title: post.title,
		description: post.description,
		keywords: [...post.tags, post.category],
	};
}

export default async function PostPage({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return (
			<div className="max-w-4xl mx-auto text-center py-16">
				<h1 className="text-4xl font-bold mb-4 neon-text-green">文章不存在</h1>
				<p className="text-foreground/70 text-lg mb-8">该文章可能已被删除或移动</p>
				<Link href="/" className="inline-flex items-center gap-2 text-neon-green hover:neon-text-green transition-all">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
					返回首页
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto">
			{/* 文章标题和元信息 */}
			<div className="mb-12 text-center">
				<h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
				<div className="flex flex-wrap justify-center gap-4 text-foreground/70 mb-6">
					<p>{new Date(post.date).toLocaleDateString()}</p>
					<p>•</p>
					<Link href={`/categories/${post.category}`} className="hover:neon-text-green transition-all">
						{post.category}
					</Link>
					<p>•</p>
					<p>{post.readingTime}</p>
				</div>
				<div className="flex flex-wrap justify-center gap-2">
					{post.tags.map((tag) => (
						<Link key={tag} href={`/tags/${tag}`} className="bg-neon-purple/10 text-neon-purple px-3 py-1 rounded-full text-sm">
							{tag}
						</Link>
					))}
				</div>
			</div>

			{/* 文章内容 */}
			<article className="bg-card-bg p-6 md:p-8 rounded-lg border border-neon-green/20 mb-12">
				<div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
			</article>

			{/* 导航链接 */}
			<div className="flex justify-between">
				<Link href="/" className="inline-flex items-center gap-2 text-neon-green hover:neon-text-green transition-all">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
					返回首页
				</Link>
				<Link href={`/categories/${post.category}`} className="inline-flex items-center gap-2 text-neon-green hover:neon-text-green transition-all">
					查看更多 {post.category} 文章
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</Link>
			</div>
		</div>
	);
}

// 生成静态参数
export async function generateStaticParams() {
	const { getAllPosts } = await import("../../../../lib/posts");
	const posts = await getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
