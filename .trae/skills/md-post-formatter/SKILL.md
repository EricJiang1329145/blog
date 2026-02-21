---
name: "md-post-formatter"
description: "Converts Markdown documents to Neon Cosmos blog post format with standardized front matter. Invoke when user needs to format/convert MD files to blog post format."
---

# Markdown 博客文章格式化器

将任意 Markdown 文档转换为符合 Neon Cosmos 博客项目的标准格式。

## 触发条件

当用户需要：
- 将外部 Markdown 文档转换为博客文章格式
- 格式化现有 Markdown 文档使其符合博客规范
- 批量处理 Markdown 文档

## 标准格式

目标 front matter 格式：

```yaml
---
title: 文章标题
slug: url-slug
date: YYYY-MM-DD
category: 分类名称
tags:
  - 标签1
  - 标签2
description: 文章简介描述
---
```

## 字段映射规则

### 必填字段处理

| 目标字段 | 来源优先级 | 默认值/处理方式 |
|---------|-----------|----------------|
| `title` | 原文 `title` > 第一个 `#` 标题 > 文件名 | 必须有值 |
| `slug` | 原文 `slug` > `permalink` > `url` | 从 title 生成：小写、空格转连字符、移除特殊字符 |
| `date` | 原文 `date` > `created` > `published` > `time` | 使用当前日期 |
| `category` | 原文 `category` > `categories`（取第一个） | 默认 "未分类" |
| `tags` | 原文 `tags` > `keywords` | 空数组 `[]` |
| `description` | 原文 `description` > `summary` > `excerpt` | 从正文前 150 字符截取 |

### 需删除的字段

以下字段应从原文 front matter 中删除（不属于标准格式）：
- `author`、`authors`
- `layout`、`template`
- `permalink`、`url`
- `updated`、`modified`
- `image`、`cover`、`thumbnail`
- `comments`、`toc`
- `keywords`（已转换为 tags）
- 其他自定义字段

## 执行步骤

1. **读取源文件**：获取原始 Markdown 内容
2. **解析 front matter**：提取现有元数据
3. **字段转换**：
   - 按映射规则转换字段
   - 删除非标准字段
   - 生成缺失的必填字段
4. **重建文档**：
   - 生成新的 front matter
   - 保留原始正文内容
5. **输出结果**：返回格式化后的完整文档

## 示例

### 输入（Hexo 风格）

```markdown
---
title: 我的第一篇文章
date: 2024-01-15 10:30:00
categories:
  - 技术
  - 编程
tags:
  - JavaScript
  - React
author: Eric
cover: /images/cover.jpg
---

# 我的第一篇文章

这是正文内容...
```

### 输出（Neon Cosmos 格式）

```markdown
---
title: 我的第一篇文章
slug: wo-de-di-yi-pian-wen-zhang
date: 2024-01-15
category: 技术
tags:
  - JavaScript
  - React
description: 这是正文内容...
---

# 我的第一篇文章

这是正文内容...
```

## 注意事项

- 正文内容保持不变，仅处理 front matter
- slug 生成时移除中文字符，转为拼音或使用日期+序号
- 日期格式统一为 `YYYY-MM-DD`，去除时间部分
- description 如需从正文生成，截取前 150 字符并添加省略号
- 不添加任何多余注释
