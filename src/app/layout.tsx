import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/Navigation";
import BackToTopButton from "../components/BackToTopButton";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eric's Blog — 技术与人文的思考笔记",
  description: "关于技术、社会与生活的思考笔记",
  keywords: ["博客", "技术", "思考", "人文", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`,
          }}
        />
        <script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="b572d3db-28bf-4534-b2ed-6ccbfe769302"></script>
      </head>
      <body className="min-h-screen">
        <Navigation />

        <main className="container mx-auto px-4 pt-24 pb-16">
          {children}
        </main>

        <footer className="border-t border-card-border py-10">
          <div className="container mx-auto px-4 text-center">
            <Link href="/" className="text-accent font-medium text-lg font-[family-name:var(--font-serif)]">
              Eric&apos;s Blog
            </Link>
            <p className="text-text-muted mt-2 text-sm font-[family-name:var(--font-sans)]">
              技术与人文的思考笔记
            </p>
            <p className="text-text-muted mt-1 text-xs">
              &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>

        <BackToTopButton />
      </body>
    </html>
  );
}
