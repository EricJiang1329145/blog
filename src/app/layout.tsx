import type { Metadata } from "next";
import Link from "next/link";
import StarBackground from "../components/StarBackground";
import BackToTopButton from "../components/BackToTopButton";
import Navigation from "../components/Navigation";
import ClientEffects from "../components/ClientEffects";
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
				{/* 不蒜子访问统计脚本 */}
				<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
				{/* umamiis 统计脚本 */}
				<script defer src="https://cloud.umami.is/script.js" data-website-id="b572d3db-28bf-4534-b2ed-6ccbfe769302"></script>
			</head>
			<body className="min-h-screen">
				<StarBackground />
				
				{/* 导航栏 */}
				<Navigation />
				
				{/* 客户端效果初始化 */}
				<ClientEffects />
				
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
			</body>
		</html>
	);
}
