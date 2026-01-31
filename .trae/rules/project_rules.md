# Neon Cosmos 博客项目概述
Neon Cosmos 是一个现代化个人博客项目，部署在 blog.ericjiang.top 域名上，专注于探索黑客、数学和太空的奇妙世界。该项目基于 Next.js 16+ 框架与 App Router 构建，通过 OpenNext 适配器部署在 Cloudflare Workers 上，实现了高性能的静态网站体验。

技术栈方面，项目采用 React 19+ 作为前端框架，使用 Tailwind CSS 进行样式管理，并集成了多种专业工具：通过 gray-matter 和 marked 处理 Markdown 内容，利用 highlight.js 实现代码语法高亮（采用 GitHub Dark 主题），集成 KaTeX 支持数学公式渲染，以及 reading-time 计算文章阅读时间。

功能上，该博客系统具备现代、响应式的霓虹主题界面，支持高级 Markdown 渲染、代码语法高亮、数学公式显示、内容分类与标签管理、阅读时间计算等特性。项目结构清晰，内容以 Markdown 文件形式存储在 content/posts 目录下，通过脚本自动构建处理。

此外，项目还包含多个实用组件，如返回顶部按钮、分享按钮、阅读进度条和星空背景效果，为用户提供了流畅且富有视觉吸引力的阅读体验。整体设计注重性能优化和用户体验，适合作为个人技术博客或知识分享平台。