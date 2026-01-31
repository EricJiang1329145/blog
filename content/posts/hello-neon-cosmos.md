---
title: 欢迎来到 Neon Cosmos
slug: hello-neon-cosmos
date: 2026-01-31
category: 博客
tags:
  - 介绍
  - 技术
  - Next.js
description: 欢迎来到 Neon Cosmos 博客，探索技术、数学与太空的奇妙世界。
---

# 欢迎来到 Neon Cosmos

## 博客介绍

Neon Cosmos 是一个基于 Next.js 13+ 的个人博客网站，主题为「探索技术、数学与太空的奇妙世界」。网站采用深色主题，带有霓虹绿色和紫色的强调色，营造出科技感和未来感。

## 技术栈

- **前端框架**: Next.js 16.1.6
- **样式框架**: Tailwind CSS 4
- **编程语言**: TypeScript 5+
- **Markdown 解析**: gray-matter 4.0.3
- **Markdown 渲染**: marked 17.0.1
- **数学公式**: katex 0.16.28
- **代码高亮**: highlight.js 11.11.1

## 功能特性

### 文章管理
- 使用 Markdown 格式编写文章
- 支持 front matter 定义元信息
- 自动解析文章内容
- 支持代码高亮和数学公式

### 导航与路由
- 固定在顶部的导航栏
- 响应式导航设计
- 基于 Next.js App Router 的文件系统路由

### 内容展示
- 首页展示文章列表
- 文章详情页显示完整内容
- 分类和标签页面
- 关于页面

### UI/UX 设计
- 深色主题，减少眼睛疲劳
- 霓虹效果，增强科技感
- 响应式设计，适配多设备
- 动态星空背景
- 平滑过渡效果

## 数学公式示例

以下是一个数学公式的示例：

$$ E = mc^2 $$

这是爱因斯坦的质能方程，其中：
- $E$ 表示能量
- $m$ 表示质量
- $c$ 表示光速

## 代码高亮示例

以下是一个 TypeScript 代码示例：

```typescript
import { getAllPosts } from '../lib/posts';

export default async function Home() {
  const posts = await getAllPosts();
  
  return (
    <div>
      {/* 文章列表 */}
    </div>
  );
}
```

## 未来计划

- 添加更多文章内容
- 实现搜索功能
- 添加评论系统
- 优化 SEO 效果
- 增加更多交互功能

感谢您访问 Neon Cosmos 博客！如果您对技术、数学理论或太空探索感兴趣，欢迎关注我的博客，一起探索科技与宇宙的无限可能。
