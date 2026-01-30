import Link from "next/link";

export default function About() {
	return (
		<div className="max-w-4xl mx-auto">
			{/* 页面标题 */}
			<div className="mb-16 text-center">
				<h1 className="text-4xl font-bold mb-4">
					<span className="neon-text-green">关于</span>
					<span className="mx-2">|</span>
					<span className="neon-text-purple">Neon Cosmos</span>
				</h1>
				<p className="text-foreground/70 text-lg">探索黑客、数学与太空的奇妙世界</p>
			</div>

			{/* 个人简介 */}
			<section className="bg-card-bg p-8 rounded-lg border border-neon-green/20 mb-12">
				<h2 className="text-2xl font-bold mb-6 neon-text-green">个人简介</h2>
				<p className="text-foreground/90 mb-4 leading-relaxed">
					欢迎来到 Neon Cosmos 博客！我是一名热爱技术、数学和太空的开发者，致力于探索科技与宇宙的奥秘。
				</p>
				<p className="text-foreground/90 mb-4 leading-relaxed">
					这个博客是我分享知识和思考的地方，内容涵盖黑客技术、数学理论、太空探索等多个领域。我希望通过深入浅出的文章，让更多人了解这些奇妙的主题。
				</p>
				<p className="text-foreground/90 leading-relaxed">
					如果你对这些主题也感兴趣，欢迎关注我的博客，一起探索科技与宇宙的无限可能！
				</p>
			</section>

			{/* 技术栈 */}
			<section className="bg-card-bg p-8 rounded-lg border border-neon-green/20 mb-12">
				<h2 className="text-2xl font-bold mb-6 neon-text-purple">技术栈</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">前端技术</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
							<li>Next.js 13+</li>
							<li>Tailwind CSS 4</li>
							<li>TypeScript 5+</li>
							<li>React 19+</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">内容处理</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
							<li>Markdown</li>
							<li>gray-matter</li>
							<li>marked</li>
							<li>highlight.js</li>
							<li>KaTeX</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">开发工具</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
							<li>VS Code</li>
							<li>Git</li>
							<li>ESLint</li>
							<li>Jest</li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">部署平台</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
							<li>Vercel</li>
							<li>Cloudflare Workers</li>
						</ul>
					</div>
				</div>
			</section>

			{/* 联系方式 */}
			<section className="bg-card-bg p-8 rounded-lg border border-neon-green/20">
				<h2 className="text-2xl font-bold mb-6 neon-text-green">联系方式</h2>
				<p className="text-foreground/70 mb-4">
					如果你有任何问题或建议，欢迎通过以下方式联系我：
				</p>
				<div className="space-y-2">
					<p className="text-foreground/90">
						<span className="font-semibold">Email:</span> contact@neoncosmos.dev
					</p>
					<p className="text-foreground/90">
						<span className="font-semibold">GitHub:</span> <a href="https://github.com/neoncosmos" className="text-neon-green hover:underline">github.com/neoncosmos</a>
					</p>
					<p className="text-foreground/90">
						<span className="font-semibold">Twitter:</span> <a href="https://twitter.com/neoncosmos" className="text-neon-green hover:underline">@neoncosmos</a>
					</p>
				</div>
			</section>

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
