import type { Metadata } from "next";
import Link from "next/link";
import StarBackground from "../components/StarBackground";
import BackToTopButton from "../components/BackToTopButton";
import Navigation from "../components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "Neon Cosmos",
	description: "探索技术、数学与太空的奇妙世界",
	keywords: ["博客", "技术", "数学", "太空", "Next.js", "TypeScript"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN">
			<head>
				<script defer src="https://cloud.umami.is/script.js" data-website-id="b572d3db-28bf-4534-b2ed-6ccbfe769302"></script>
				{/* 不蒜子统计代码 */}
				<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
			</head>
			<body className="min-h-screen">
				<StarBackground />
				
				{/* 导航栏 */}
				<Navigation />
				
				
				{/* 主要内容 */}
				<main className="container mx-auto px-4 pt-24 pb-16">
					{children}
				</main>
				
				{/* 页脚 */}
				<footer className="bg-nav-bg/90 backdrop-blur-md border-t border-neon-green/20 py-8">
					<div className="container mx-auto px-4 text-center">
						<p className="text-foreground/70">
							© {new Date().getFullYear()} Neon Cosmos. 探索技术、数学与太空的奇妙世界.
						</p>
					</div>
				</footer>

				<BackToTopButton />

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

								// 脚注功能
								const footnoteButtons = document.querySelectorAll('.footnote-button');
								footnoteButtons.forEach(button => {
									button.addEventListener('click', function(e) {
										e.preventDefault();
										const footnoteId = this.getAttribute('data-footnote-id');
										if (!footnoteId) return;

										const tooltip = document.getElementById('footnote-tooltip-' + footnoteId);
										const footnoteDefinition = document.getElementById('footnote-' + footnoteId);
										if (!tooltip || !footnoteDefinition) return;

										// 显示脚注内容
										tooltip.innerHTML = footnoteDefinition.innerHTML;
										tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';

										// 点击其他地方关闭脚注
										document.addEventListener('click', function closeFootnote(event) {
											if (!button.contains(event.target) && !tooltip.contains(event.target)) {
												tooltip.style.display = 'none';
												document.removeEventListener('click', closeFootnote);
											}
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
