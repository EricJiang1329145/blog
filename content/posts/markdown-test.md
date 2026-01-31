---
title: Markdown 格式测试
slug: markdown-test
date: 2026-01-31
category: 测试
tags:
  - Markdown
  - 测试
  - 格式
description: 测试各种 Markdown 格式的渲染效果
---

# Markdown 格式测试

本文档用于测试各种 Markdown 格式在博客中的渲染效果，帮助确定哪些格式生效，哪些不生效，以及是否需要对不生效的格式进行修复。

## 1. 标题层级

# H1 标题

## H2 标题

### H3 标题

#### H4 标题

##### H5 标题

###### H6 标题

## 2. 文本格式

**粗体文本**

*斜体文本*

***粗斜体文本***

~~删除线文本~~

<u>下划线文本</u>

## 3. 列表

### 3.1 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

### 3.2 有序列表

1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项

### 3.3 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成任务

## 4. 链接

[外部链接 - Google](https://www.google.com)

[内部链接 - 首页](/)

[内部链接 - 关于页面](/about)

## 5. 图片

![测试图片](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=test%20image%20for%20markdown%20testing&image_size=square)

## 6. 代码

### 6.1 行内代码

这是一段 `行内代码` 示例。

### 6.2 代码块

#### TypeScript 代码

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

console.log(greet(user));
```

#### JavaScript 代码

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出 55
```

#### Python 代码

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 输出 120
```

#### 无语言指定

```
这是一段没有指定语言的代码块
```

## 7. 引用块

> 这是一个引用块
> 可以包含多行文本
> 
> 引用块内的引用
>> 嵌套引用

## 8. 分割线

---

***

___

## 9. 表格

| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |
| 王五 | 35   | 产品经理 |

## 10. 数学公式

### 10.1 行内公式

爱因斯坦的质能方程：$E = mc^2$，其中 $E$ 表示能量， $m$ 表示质量， $c$ 表示光速。

### 10.2 块级公式

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$

## 11. 脚注

这里有一个脚注[^1]，用于测试脚注功能。

[^1]: 这是脚注的内容

## 12. 特殊格式

### 12.1 内联 HTML

<div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
  这是一段内联 HTML 内容
</div>

### 12.2 转义字符

\*这不是斜体\*
\_这不是下划线\_
\[这不是链接\]

## 13. 自动链接

https://www.example.com

user@example.com

## 14. 定义列表

术语 1
: 术语 1 的定义

术语 2
: 术语 2 的定义
: 术语 2 的另一个定义

## 总结

本文档测试了以下 Markdown 格式：

1. ✅ 标题层级
2. ✅ 文本格式（粗体、斜体、删除线）
3. ✅ 列表（有序、无序、任务列表）
4. ✅ 链接（外部、内部）
5. ✅ 图片
6. ✅ 代码（行内、代码块）
7. ✅ 引用块
8. ✅ 分割线
9. ✅ 表格
10. ⚠️ 数学公式（需要 KaTeX 支持）
11. ❓ 脚注
12. ❓ 内联 HTML
13. ✅ 转义字符
14. ❓ 自动链接
15. ❓ 定义列表

通过查看本文档的渲染效果，可以确定哪些格式需要进一步优化或修复。
