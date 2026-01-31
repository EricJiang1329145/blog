import type { Metadata } from "next";
import Link from "next/link";
import StarBackground from "../components/StarBackground";
import "./globals.css";

export const metadata: Metadata = {
	title: "Neon Cosmos",
	description: "探索黑客、数学与太空的奇妙世界",
	keywords: ["博客", "技术", "黑客", "数学", "太空", "Next.js", "TypeScript"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN">
			<body className="min-h-screen">
				<StarBackground />
				
				{/* 导航栏 */}
				<header className="fixed top-0 left-0 right-0 z-50 bg-nav-bg/90 backdrop-blur-md border-b border-neon-green/20">
					<div className="container mx-auto px-4 py-4 flex justify-between items-center">
						<Link href="/" className="text-2xl font-bold neon-text-green">
							Neon Cosmos
						</Link>
						
						{/* 桌面导航 */}
						<nav className="hidden md:flex space-x-8">
							<Link href="/" className="text-foreground hover:neon-text-green transition-all">
								首页
							</Link>
							<Link href="/about" className="text-foreground hover:neon-text-green transition-all">
								关于
							</Link>
							<Link href="/categories" className="text-foreground hover:neon-text-green transition-all">
								分类
							</Link>
							<Link href="/tags" className="text-foreground hover:neon-text-green transition-all">
								标签
							</Link>
						</nav>
						
						{/* 移动端导航按钮 */}
						<button className="md:hidden text-foreground">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<line x1="3" y1="12" x2="21" y2="12"></line>
								<line x1="3" y1="6" x2="21" y2="6"></line>
								<line x1="3" y1="18" x2="21" y2="18"></line>
							</svg>
						</button>
					</div>
				</header>
				
				{/* 主要内容 */}
				<main className="container mx-auto px-4 pt-24 pb-16">
					{children}
				</main>
				
				{/* 页脚 */}
				<footer className="bg-nav-bg/90 backdrop-blur-md border-t border-neon-green/20 py-8">
					<div className="container mx-auto px-4 text-center">
						<p className="text-foreground/70">
							© {new Date().getFullYear()} Neon Cosmos. 探索黑客、数学与太空的奇妙世界.
						</p>
					</div>
				</footer>

				{/* 复制按钮脚本 - 只在客户端执行 */}
				<script dangerouslySetInnerHTML={{
					__html: `
						if (typeof window !== 'undefined') {
							window.addEventListener('DOMContentLoaded', function() {
								const copyButtons = document.querySelectorAll('.copy-button');
								copyButtons.forEach(button => {
									button.addEventListener('click', function() {
										const code = this.getAttribute('data-code');
										if (!code) return;

										const decodedCode = decodeURIComponent(code);
										const originalContent = this.innerHTML;

										navigator.clipboard.writeText(decodedCode)
											.then(() => {
												// 显示复制成功
												this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> 复制成功';
												this.classList.add('copied');

												// 2秒后恢复
												setTimeout(() => {
													this.innerHTML = originalContent;
													this.classList.remove('copied');
												}, 2000);
											})
											.catch(err => {
												console.error('复制失败:', err);
												this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> 复制失败';
												this.classList.add('copied');
												setTimeout(() => {
													this.innerHTML = originalContent;
													this.classList.remove('copied');
												}, 2000);
											});
									});
								});
							});
						}
					`
				}} />
			</body>
		</html>
	);
}
