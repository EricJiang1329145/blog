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
			</body>
		</html>
	);
}
