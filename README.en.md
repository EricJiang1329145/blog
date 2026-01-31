# Neon Cosmos Blog

## 语言选择 / Language

- [中文 (默认)](README.md)
- [English](README.en.md)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/next-starter-template)

<!-- dash-content-start -->

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's deployed on Cloudflare Workers as a [static website](https://developers.cloudflare.com/workers/static-assets/).

This template uses [OpenNext](https://opennext.js.org/) via the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare), which works by taking the Next.js build output and transforming it, so that it can run in Cloudflare Workers.

<!-- dash-content-end -->

## Project Overview

Neon Cosmos is a modern blog platform focused on exploring the fascinating worlds of hacking, mathematics, and space. It features a sleek, neon-themed UI with advanced markdown rendering capabilities, code highlighting, and mathematical formula support.

### Key Features

- **Modern Blog System**: Clean, responsive design with neon-themed UI
- **Advanced Markdown Support**: Powered by marked with custom extensions
- **Code Syntax Highlighting**: Using highlight.js with GitHub Dark theme
- **Mathematical Formula Support**: Integrated with KaTeX for beautiful math rendering
- **Content Organization**: Categories and tags for easy content navigation
- **Reading Time Calculation**: Estimated reading time for each article
- **Responsive Design**: Optimized for all screen sizes
- **Performance Optimized**: Built with Next.js and deployed on Cloudflare Workers

### Technology Stack

- **Framework**: Next.js 13+ with App Router
- **Deployment**: Cloudflare Workers via OpenNext
- **Markdown Processing**: gray-matter and marked
- **Code Highlighting**: highlight.js
- **Math Rendering**: KaTeX
- **Styling**: Custom CSS with neon effects

The project structure follows Next.js best practices, with content stored in markdown files under the `content/posts` directory.

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/next-starter-template
```

A live public deployment of this template is available at [https://next-starter-template.templates.workers.dev](https://next-starter-template.templates.workers.dev)

## Getting Started

First, run:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server (using the package manager of your choice):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploying To Production

| Command                           | Action                                       |
| :-------------------------------- | :------------------------------------------- |
| `npm run build`                   | Build your production site                   |
| `npm run preview`                 | Preview your build locally, before deploying |
| `npm run build && npm run deploy` | Deploy your production site to Cloudflare    |
| `npm wrangler tail`               | View real-time logs for all Workers          |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!