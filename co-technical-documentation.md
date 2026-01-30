# Neon Cosmos 博客技术文档

## 项目概述

Neon Cosmos 是一个基于 Next.js 13+ 的个人博客网站，主题为「探索黑客、数学与太空的奇妙世界」。网站采用深色主题，带有霓虹绿色和紫色的强调色，营造出科技感和未来感。

## 技术栈

| 类别 | 技术/库 | 版本 | 用途 |
|------|---------|------|------|
| 前端框架 | Next.js | 16.1.6 | 网站框架，提供路由、SSG/SSR 支持 |
| 样式框架 | Tailwind CSS | 4 | 响应式样式设计 |
| 编程语言 | TypeScript | 5+ | 类型安全的代码 |
| Markdown 解析 | gray-matter | 4.0.3 | 解析 Markdown 文件的 front matter |
| Markdown 渲染 | marked | 17.0.1 | 将 Markdown 转换为 HTML |
| 数学公式 | katex | 0.16.28 | 渲染数学公式 |
| 数学公式插件 | marked-katex-extension | 5.1.6 | 为 marked 提供 KaTeX 支持 |
| 代码高亮 | highlight.js | 11.11.1 | 代码块语法高亮 |
| 阅读时间计算 | reading-time | 1.5.0 | 计算文章阅读时间 |
| 站点地图 | next-sitemap | 4.2.3 | 生成站点地图 |
| 测试 | Jest | 30.2.0 | 单元测试 |
| 测试环境 | jest-environment-jsdom | 30.2.0 | JSDOM 测试环境 |

## 项目结构

```
co/
├── .jest/                # Jest 配置
├── .next/                # Next.js 构建输出
├── app/                  # App Router 目录
│   ├── about/            # 关于页面
│   ├── categories/       # 分类页面
│   ├── posts/            # 文章详情页
│   ├── tags/             # 标签页面
│   ├── favicon.ico       # 网站图标
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 全局布局
│   └── page.tsx          # 首页
├── content/              # 内容目录
│   └── posts/            # Markdown 文章文件
├── lib/                  # 工具函数
│   └── posts.ts          # 文章相关函数
├── public/               # 静态资源
├── .gitignore            # Git 忽略文件
├── package.json          # 项目依赖
├── tailwind.config.ts    # Tailwind 配置
└── tsconfig.json         # TypeScript 配置
```

## 核心功能

### 1. 文章管理

- **Markdown 文章**：使用 Markdown 格式编写文章，支持 front matter 定义元信息
- **文章解析**：自动解析 Markdown 文件，提取标题、日期、分类、标签等信息
- **内容渲染**：将 Markdown 转换为 HTML，支持代码高亮和数学公式
- **阅读时间**：自动计算每篇文章的阅读时间

### 2. 导航与路由

- **导航栏**：固定在顶部的导航栏，包含网站标题和主要链接
- **响应式导航**：在移动端显示汉堡菜单
- **路由系统**：基于 Next.js App Router 的文件系统路由

### 3. 内容展示

- **首页**：展示所有文章的列表，按日期降序排序
- **文章详情**：显示单篇文章的完整内容，包含元信息和导航
- **分类页面**：按分类筛选文章
- **标签页面**：按标签筛选文章
- **关于页面**：展示个人信息和技术栈

### 4. UI/UX 设计

- **深色主题**：默认使用深色背景，减少眼睛疲劳
- **霓虹效果**：使用绿色和紫色的霓虹效果，增强科技感
- **响应式设计**：适配桌面、平板和移动设备
- **动态背景**：星空背景动画效果
- **装饰元素**：代码片段和数学符号作为装饰元素
- **平滑过渡**：页面元素的平滑过渡效果

### 5. 技术特性

- **静态生成**：使用 Next.js 的 SSG 功能，提高性能和 SEO
- **SEO 优化**：自动生成页面元数据和站点地图
- **类型安全**：使用 TypeScript 确保代码类型安全
- **代码质量**：配置 ESLint 确保代码质量
- **测试**：使用 Jest 进行单元测试

## 核心文件详解

### 1. 全局布局 (app/layout.tsx)

全局布局文件定义了网站的基本结构，包括：
- 根 HTML 元素和语言设置
- 字体配置（使用 Google Fonts 的 Geist 字体）
- 背景星空效果（StarBackground 组件）
- 导航栏（固定在顶部，带有模糊效果）
- 页脚（包含版权信息）

### 2. 首页 (app/page.tsx)

首页文件负责展示所有文章的列表：
- 使用 `getAllPosts()` 获取所有文章
- 按日期降序排序展示文章卡片
- 每个卡片包含标题、日期、分类、标签、描述和阅读时间
- 提供「探索更多」链接跳转到文章详情页
- 处理无文章的空状态

### 3. 文章详情页 (app/posts/[slug]/page.tsx)

文章详情页负责展示单篇文章的完整内容：
- 使用 `getPostBySlug()` 获取指定文章
- 生成静态参数和 SEO 元数据
- 展示文章标题、元信息、标签和内容
- 提供返回首页的链接
- 处理文章不存在的情况

### 4. 分类页面 (app/categories/[category]/page.tsx)

分类页面负责按分类筛选文章：
- 使用 `getPostsByCategory()` 获取指定分类的文章
- 生成静态参数
- 展示分类标题和文章数量
- 按日期降序排序展示文章卡片
- 处理分类下无文章的空状态

### 5. 标签页面 (app/tags/[tag]/page.tsx)

标签页面负责按标签筛选文章：
- 使用 `getPostsByTag()` 获取指定标签的文章
- 生成静态参数
- 展示标签标题和文章数量
- 按日期降序排序展示文章卡片
- 高亮当前标签
- 处理标签下无文章的空状态

### 6. 文章工具函数 (lib/posts.ts)

文章工具函数提供了文章相关的核心功能：
- **getAllPosts()**：获取所有文章，按日期降序排序
- **getPostBySlug()**：根据 slug 获取单篇文章
- **getAllCategories()**：获取所有分类
- **getAllTags()**：获取所有标签
- **getPostsByCategory()**：按分类获取文章
- **getPostsByTag()**：按标签获取文章
- **Markdown 配置**：配置 marked 库，支持代码高亮和数学公式

### 7. 关于页面 (app/about/page.tsx)

关于页面展示个人信息和技术栈：
- 个人简介
- 技术栈列表
- 联系方式

## 样式系统

### 1. 全局样式 (app/globals.css)

全局样式文件定义了网站的基础样式：
- 重置浏览器默认样式
- 定义自定义颜色变量
- 实现霓虹效果和动画
- 定义通用组件样式

### 2. Tailwind 配置

使用 Tailwind CSS 4 进行样式管理：
- 自定义颜色主题（深色背景，霓虹强调色）
- 配置字体和间距
- 定义自定义工具类

## 数据结构

### 文章元数据结构

```typescript
interface PostMetadata {
  title: string;        // 文章标题
  date: string;         // 发布日期
  category: string;     // 分类
  tags: string[];       // 标签数组
  description: string;  // 文章描述
}
```

### 文章完整结构

```typescript
interface Post {
  id: string;           // 文章 ID（与 slug 相同）
  slug: string;         // 文章 slug（用于 URL）
  title: string;        // 文章标题
  date: string;         // 发布日期
  category: string;     // 分类
  tags: string[];       // 标签数组
  description: string;  // 文章描述
  content: string;      // 渲染后的 HTML 内容
  readingTime: string;  // 阅读时间
}
```

## 部署与构建

### 构建命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行代码检查
npm run lint

# 运行测试
npm run test
```

### 静态生成

项目使用 Next.js 的静态生成功能：
- 首页：静态生成所有文章列表
- 文章详情页：为每篇文章静态生成页面
- 分类页面：为每个分类静态生成页面
- 标签页面：为每个标签静态生成页面

### 站点地图

使用 next-sitemap 自动生成站点地图：
- 包含所有页面的链接
- 支持优先级和更新频率设置

## 开发指南

### 1. 添加新文章

1. 在 `content/posts/` 目录下创建新的 Markdown 文件
2. 使用以下格式编写 front matter：

```markdown
---
title: 文章标题
date: 2024-01-01
category: 分类
tags:
  - 标签1
  - 标签2
description: 文章描述
---

文章内容...
```

3. 编写 Markdown 内容，支持代码块和数学公式

### 2. 自定义样式

- 在 `app/globals.css` 中添加全局样式
- 在 `tailwind.config.ts` 中配置 Tailwind 选项
- 使用 Tailwind 类名进行组件样式设计

### 3. 添加新页面

1. 在 `app/` 目录下创建新的文件夹
2. 在文件夹中创建 `page.tsx` 文件
3. 实现页面组件

### 4. 测试

- 使用 Jest 编写单元测试
- 运行 `npm run test` 执行测试

## 技术要点

### 1. 静态生成与动态内容

项目充分利用了 Next.js 的静态生成能力，同时保持了内容的动态性：
- 文章内容静态生成，提高加载速度
- 分类和标签页面静态生成，优化 SEO
- 动态背景和交互效果，提升用户体验

### 2. Markdown 处理

使用现代工具链处理 Markdown 内容：
- gray-matter 解析 front matter
- marked 渲染 Markdown
- highlight.js 实现代码高亮
- katex 支持数学公式

### 3. UI 设计

采用现代前端设计原则：
- 深色主题减少眼睛疲劳
- 霓虹效果增强科技感
- 响应式设计适配多设备
- 微动画提升用户体验

### 4. 性能优化

通过多种方式优化网站性能：
- 静态生成减少服务器负载
- 代码分割减小初始加载体积
- 图片优化减少带宽使用
- 缓存策略提升重复访问速度

## 总结

Neon Cosmos 是一个功能完整、设计现代的个人博客网站，使用 Next.js 13+ 和 Tailwind CSS 4 构建。网站采用深色主题，带有霓虹效果，营造出科技感和未来感。核心功能包括文章管理、分类标签、内容展示和 SEO 优化，同时提供了良好的用户体验。

通过本技术文档，另一个 AI 应该能够复刻出相同功能和 UI 的博客网站，只需要按照文档中的结构和功能实现即可。