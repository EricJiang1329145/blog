'use client';

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchButton from "./SearchButton";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nav-bg backdrop-blur-sm border-b border-card-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-semibold text-foreground hover:text-accent transition-colors font-[family-name:var(--font-serif)] tracking-tight"
        >
          Eric&apos;s Blog
        </Link>

        <div className="flex items-center gap-4">
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="nav-link-strong">
            首页
          </Link>
          <Link href="/categories" className="nav-link-strong">
            分类
          </Link>
          <Link href="/tags" className="nav-link-strong">
            标签
          </Link>
          <Link href="/about" className="nav-link-strong">
            关于
          </Link>
        </nav>
        <SearchButton />
        <ThemeToggle />

        <button
          className="md:hidden p-2 rounded text-text-secondary hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-nav-bg border-b border-card-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link href="/" className="nav-link-strong py-1" onClick={() => setMobileMenuOpen(false)}>
              首页
            </Link>
            <Link href="/categories" className="nav-link-strong py-1" onClick={() => setMobileMenuOpen(false)}>
              分类
            </Link>
            <Link href="/tags" className="nav-link-strong py-1" onClick={() => setMobileMenuOpen(false)}>
              标签
            </Link>
            <Link href="/about" className="nav-link-strong py-1" onClick={() => setMobileMenuOpen(false)}>
              关于
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
