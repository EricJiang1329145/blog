'use client';

import Link from "next/link";
import EmailLink from "../../components/EmailLink";

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
				<p className="text-foreground/70 text-lg">探索技术、数学与太空的奇妙世界</p>
			</div>

			{/* 个人简介 */}
			<section className="bg-card-bg p-8 rounded-lg border border-neon-green/20 mb-12">
				<h2 className="text-2xl font-bold mb-6 neon-text-green">个人简介</h2>
				<p className="text-foreground/90 mb-4 leading-relaxed">
					欢迎来到 Neon Cosmos 博客！我是一名热爱技术、数学和太空的开发者，致力于探索科技与宇宙的奥秘。
				</p>
				<p className="text-foreground/90 mb-4 leading-relaxed">
					这个博客是我分享知识和思考的地方，内容涵盖技术、数学理论、太空探索等多个领域。我希望通过深入浅出的文章，让更多人了解这些奇妙的主题。
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
							<li><a href="https://nextjs.org/" className="text-neon-green hover:underline">Next.js 13+</a></li>
							<li><a href="https://tailwindcss.com/" className="text-neon-green hover:underline">Tailwind CSS 4</a></li>
							<li><a href="https://www.typescriptlang.org/" className="text-neon-green hover:underline">TypeScript 5+</a></li>
							<li><a href="https://react.dev/" className="text-neon-green hover:underline">React 19+</a></li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">内容处理</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
							<li><a href="https://daringfireball.net/projects/markdown/" className="text-neon-green hover:underline">Markdown</a></li>
							<li><a href="https://github.com/jonschlinkert/gray-matter" className="text-neon-green hover:underline">gray-matter</a></li>
							<li><a href="https://marked.js.org/" className="text-neon-green hover:underline">marked</a></li>
							<li><a href="https://highlightjs.org/" className="text-neon-green hover:underline">highlight.js</a></li>
							<li><a href="https://katex.org/" className="text-neon-green hover:underline">KaTeX</a></li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">开发工具</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
							<li><a href="https://www.trae.cn/" className="text-neon-green hover:underline">Trae</a></li>
							<li><a href="https://git-scm.com/" className="text-neon-green hover:underline">Git</a></li>
							<li><a href="https://eslint.org/" className="text-neon-green hover:underline">ESLint</a></li>
							<li><a href="https://jestjs.io/" className="text-neon-green hover:underline">Jest</a></li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-foreground">部署平台</h3>
						<ul className="list-disc list-inside text-foreground/70 space-y-1">
								<li><a href="https://workers.cloudflare.com/" className="text-neon-green hover:underline">Cloudflare Workers</a></li>
								<li><a href="https://pages.cloudflare.com/" className="text-neon-green hover:underline">Cloudflare Pages</a></li>
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
						<span className="font-semibold">Email:</span> <EmailLink 
							email="jmr_eric@outlook.com"
							subject="关于 Neon Cosmos 博客"
							body="您好，我是通过您的博客了解到您的。我对您分享的内容很感兴趣，想了解更多关于以下方面的信息：\n\n1. 博客内容相关问题\n2. 技术交流\n3. 其他合作机会\n\n期待您的回复！"
						>jmr_eric@outlook.com</EmailLink>
					</p>
					<p className="text-foreground/90">
						<span className="font-semibold">GitHub:</span> <a href="https://github.com/ericjiang1329145" className="text-neon-green hover:underline">github.com/ericjiang1329145</a>
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
