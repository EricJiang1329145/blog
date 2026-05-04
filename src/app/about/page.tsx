import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
          关于
        </h1>
        <p className="text-text-muted text-sm font-[family-name:var(--font-sans)]">关于我和这个博客</p>
      </div>

      <section className="card-paper p-8 mb-8">
        <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: 'var(--font-serif)' }}>个人简介</h2>
        <p className="text-text-secondary mb-3 leading-relaxed text-[15px]">
          欢迎！我是一名热爱技术、数学和太空的开发者，致力于探索科技与宇宙的奥秘。
        </p>
        <p className="text-text-secondary mb-3 leading-relaxed text-[15px]">
          这个博客是我分享知识和思考的地方，内容涵盖技术、数学理论、太空探索等多个领域。我希望通过深入浅出的文章，让更多人了解这些奇妙的主题。
        </p>
        <p className="text-text-secondary leading-relaxed text-[15px]">
          如果你对这些主题也感兴趣，欢迎关注我的博客，一起探索科技与宇宙的无限可能！
        </p>
      </section>

      <section className="card-paper p-8 mb-8">
        <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: 'var(--font-serif)' }}>技术栈</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[family-name:var(--font-sans)] text-sm">
          <div className="space-y-1.5">
            <h3 className="font-medium text-foreground text-xs uppercase tracking-wide text-text-muted">前端技术</h3>
            <ul className="space-y-1 text-text-secondary">
              <li><a href="https://nextjs.org/" className="text-accent hover:text-accent-secondary transition-colors">Next.js</a></li>
              <li><a href="https://tailwindcss.com/" className="text-accent hover:text-accent-secondary transition-colors">Tailwind CSS</a></li>
              <li><a href="https://www.typescriptlang.org/" className="text-accent hover:text-accent-secondary transition-colors">TypeScript</a></li>
              <li><a href="https://react.dev/" className="text-accent hover:text-accent-secondary transition-colors">React</a></li>
            </ul>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-medium text-foreground text-xs uppercase tracking-wide text-text-muted">内容处理</h3>
            <ul className="space-y-1 text-text-secondary">
              <li><a href="https://daringfireball.net/projects/markdown/" className="text-accent hover:text-accent-secondary transition-colors">Markdown</a></li>
              <li><a href="https://github.com/jonschlinkert/gray-matter" className="text-accent hover:text-accent-secondary transition-colors">gray-matter</a></li>
              <li><a href="https://marked.js.org/" className="text-accent hover:text-accent-secondary transition-colors">marked</a></li>
              <li><a href="https://katex.org/" className="text-accent hover:text-accent-secondary transition-colors">KaTeX</a></li>
            </ul>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-medium text-foreground text-xs uppercase tracking-wide text-text-muted">开发工具</h3>
            <ul className="space-y-1 text-text-secondary">
              <li><a href="https://git-scm.com/" className="text-accent hover:text-accent-secondary transition-colors">Git</a></li>
              <li><a href="https://eslint.org/" className="text-accent hover:text-accent-secondary transition-colors">ESLint</a></li>
              <li><a href="https://jestjs.io/" className="text-accent hover:text-accent-secondary transition-colors">Jest</a></li>
            </ul>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-medium text-foreground text-xs uppercase tracking-wide text-text-muted">部署平台</h3>
            <ul className="space-y-1 text-text-secondary">
              <li><a href="https://workers.cloudflare.com/" className="text-accent hover:text-accent-secondary transition-colors">Cloudflare Workers</a></li>
              <li><a href="https://pages.cloudflare.com/" className="text-accent hover:text-accent-secondary transition-colors">Cloudflare Pages</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card-paper p-8 mb-8">
        <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: 'var(--font-serif)' }}>联系方式</h2>
        <p className="text-text-secondary mb-4 text-[15px]">如果你有任何问题或建议，欢迎通过以下方式联系我：</p>
        <div className="space-y-2 font-[family-name:var(--font-sans)] text-sm">
          <p className="text-text-secondary">
            <span className="font-medium text-foreground">Email:</span>{' '}
            <a href="mailto:jmr_eric@outlook.com?subject=关于博客&body=您好，我是通过您的博客了解到您的。" className="text-accent hover:text-accent-secondary transition-colors">
              jmr_eric@outlook.com
            </a>
          </p>
          <p className="text-text-secondary">
            <span className="font-medium text-foreground">GitHub:</span>{' '}
            <a href="https://github.com/ericjiang1329145" className="text-accent hover:text-accent-secondary transition-colors">
              github.com/ericjiang1329145
            </a>
          </p>
        </div>
      </section>

      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  );
}
