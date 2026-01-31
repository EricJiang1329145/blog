'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
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
				</nav>
				
				{/* 移动端导航按钮 */}
				<button 
					className="md:hidden text-foreground p-2 rounded-full hover:bg-white/10 transition-all"
					onClick={toggleMobileMenu}
					aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						{mobileMenuOpen ? (
							<>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</>
						) : (
							<>
								<line x1="3" y1="12" x2="21" y2="12"></line>
								<line x1="3" y1="6" x2="21" y2="6"></line>
								<line x1="3" y1="18" x2="21" y2="18"></line>
							</>
						)}
					</svg>
				</button>
			</div>

			{/* 移动端菜单 */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-nav-bg/95 backdrop-blur-md border-b border-neon-green/20">
					<div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
						<Link 
							href="/" 
							className="text-foreground hover:neon-text-green transition-all py-2"
							onClick={toggleMobileMenu}
						>
							首页
						</Link>
						<Link 
							href="/about" 
							className="text-foreground hover:neon-text-green transition-all py-2"
							onClick={toggleMobileMenu}
						>
							关于
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}