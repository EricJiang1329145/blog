# Neon Cosmos 博客

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/next-starter-template)

<!-- dash-content-start -->

这是一个使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 引导的 [Next.js](https://nextjs.org/) 项目。它作为 [静态网站](https://developers.cloudflare.com/workers/static-assets/) 部署在 Cloudflare Workers 上。

该模板通过 [OpenNext Cloudflare 适配器](https://opennext.js.org/cloudflare) 使用 [OpenNext](https://opennext.js.org/)，其工作原理是获取 Next.js 构建输出并对其进行转换，以便它可以在 Cloudflare Workers 中运行。

<!-- dash-content-end -->

## 项目概述

Neon Cosmos 是一个现代博客平台，专注于探索技术、数学和太空的奇妙世界。它具有时尚的霓虹主题用户界面，支持高级 Markdown 渲染、代码高亮和数学公式显示。

### 主要功能

- **现代博客系统**：简洁、响应式设计，带有霓虹主题界面
- **高级 Markdown 支持**：由 marked 提供支持，带有自定义扩展
- **代码语法高亮**：使用带有 GitHub Dark 主题的 highlight.js
- **数学公式支持**：集成 KaTeX 以实现美观的数学渲染
- **内容组织**：分类和标签，便于内容导航
- **阅读时间计算**：每篇文章的预计阅读时间
- **响应式设计**：针对所有屏幕尺寸进行优化
- **性能优化**：使用 Next.js 构建并部署在 Cloudflare Workers 上

### 技术栈

- **框架**：Next.js 13+ 与 App Router
- **部署**：通过 OpenNext 部署在 Cloudflare Workers
- **Markdown 处理**：gray-matter 和 marked
- **代码高亮**：highlight.js
- **数学渲染**：KaTeX
- **样式**：带有霓虹效果的自定义 CSS

项目结构遵循 Next.js 最佳实践，内容以 Markdown 文件形式存储在 `content/posts` 目录下。

在这个仓库之外，你可以使用 [C3](https://developers.cloudflare.com/pages/get-started/c3/)（`create-cloudflare` CLI）使用此模板启动新项目：

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/next-starter-template
```

此模板的实时公共部署可在 [https://next-starter-template.templates.workers.dev](https://next-starter-template.templates.workers.dev) 访问

## 开始使用

首先，运行：

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

然后运行开发服务器（使用你选择的包管理器）：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

你可以通过修改 `app/page.tsx` 开始编辑页面。页面会在你编辑文件时自动更新。

此项目使用 [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) 自动优化和加载 Inter，这是一种自定义 Google 字体。

## 部署到生产环境

| 命令                           | 操作                                       |
| :---------------------------- | :----------------------------------------- |
| `npm run build`               | 构建生产站点                               |
| `npm run preview`             | 在部署前在本地预览构建                     |
| `npm run build && npm run deploy` | 将生产站点部署到 Cloudflare          |
| `npm wrangler tail`           | 查看所有 Workers 的实时日志                |

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 特性和 API。
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程。

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js/) - 欢迎你的反馈和贡献！