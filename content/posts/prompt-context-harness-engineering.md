---
title: 从 Prompt 到 Harness：LLM 工程的三个层次与一个真相
slug: prompt-context-harness-engineering
date: 2026-06-03
category: 技术
tags:
  - AI
  - LLM
  - 软件工程
  - Prompt Engineering
  - 系统架构
description: 探讨 LLM 应用开发从 Prompt Engineering 到 Context Engineering 再到 Harness Engineering 的三个递进层次，分析各自解决的问题边界与工程本质。
---

# 从 Prompt 到 Harness：LLM 工程的三个层次与一个真相

> 任何人都会写 prompt，正如任何人都会给厨房贴一张便利贴。但设计一个厨房是一回事，运营一家餐厅是另一回事。

---

## 一、一个直觉，三层递进

2023 年初，我第一次在终端里调用 OpenAI API 时，那种体验几乎是某种魔法：你输入一段自然语言，一个黑盒回应你另一段自然语言，仿佛盒子里面坐着一个通晓万物的助手。

而在那之后不到两年，这套范式已经悄无声息地分化出了三种截然不同的工程实践。它们共享"LLM"这个底座，但各自解决的**问题类型**完全不同。我称之为三个层次：

1. **Prompt Engineering** — 怎么"说"让模型更好
2. **Context Engineering** — 怎么"给"让模型更准
3. **Harness Engineering** — 怎么"构建"让系统可用

这三个层次不是非此即彼的选择，而是**递进关系**：每一层都在解决上一层无法解决的问题。理解了这种递进关系，就能理解为什么"调 prompt"是一条注定遇到天花板的路，以及真正成熟的 LLM 产品在工程上到底在做些什么。

---

## 二、Prompt Engineering：对话窗口内的博弈

Prompt Engineering 是最早被命名、也最容易被误解的层次。它的核心命题是：**在有限的 token 预算内，用自然语言精确描述你的意图，使模型输出符合预期的结果。**

这听起来简单，但实际上涉及一整套技巧：角色设定、few-shot 示例、思维链（Chain-of-Thought）[^1]、结构化输出约束、负向提示词，以及后来演进出的大型 prompt 模板[^2]。它们的共同点是：**优化发生在"模型调用"这一原子操作内部**。

一位优秀的 prompt engineer 像一个精密的制图师：她知道如何用语言为模型划定边界，让概率分布在期望的区域内集中。她的武器是措辞的精确性、示例的选择、约束的表述方式。

但 Prompt Engineering 存在一个**根本性天花板**：模型能响应的，只是 prompt 窗口内的信息。真实世界的问题涉及最新数据、用户历史、工具调用、多步推理——这些都无法装进一个静态 prompt 中。当你发现自己在 prompt 里塞入越来越多的"指导"和"规则"，最终却发现模型仍然在边界条件上崩溃，你就站在了 Prompt Engineering 的边界上。

这个边界的名字叫做：**信息不在窗口内。**

---

## 三、Context Engineering：从"说完"到"给全"

当 Prompt Engineering 走到尽头，工程师开始思考一个更深层的问题：在一个 LLM 调用发生之前，我应该**给模型塞进哪些信息**？

这就是 Context Engineering 的起点。

Context Engineering 关注的是动态组装模型输入的过程[^3]。它不只是一个"更长的 prompt"，而是一个**信息管道**，在每次调用前从多个源头拉取、过滤、组织、裁剪信息，填入上下文窗口。典型的实践包括：

- **RAG（检索增强生成）**：从知识库中检索相关文档片段，嵌入 prompt 中，让模型基于外部知识作答[^4]。
- **工具调用（Tool Use / Function Calling）**：将 API 描述注入上下文，让模型决定调用哪个工具，并将工具返回的结果再次注入上下文，形成多步循环。
- **结构化输出**：通过 schema 约束，强制模型输出可解析的 JSON，而不是自由文本，使下游系统可以可靠消费。
- **记忆管理**：将对话历史、用户画像、长期偏好注入上下文，让每次调用都携带"过去发生了什么"的全貌。

如果 Prompt Engineering 是在**设计一句话**，Context Engineering 就是在**设计一个信息装配线**。它的核心挑战不再是措辞，而是：

- 窗口有长度限制——放什么、不放什么？
- 检索有噪声——注入不相关文档比不注入更危险
- 信息有优先级——用户刚说的话应该比三个月前的偏好更重要

一个设计良好的 context pipeline 会让模型"知道它需要知道的"，而不被无关信息淹没。这比写一个精彩的 prompt 困难得多——不是因为它涉及更复杂的 NLP，而是因为它涉及**信息架构**：数据从哪里来、如何结构化、如何缓存、如何在毫秒级内完成检索和组装。

当你做到这一步，你的 LLM 应用已经不再是一个"对话机器人"，而是一个能够实时接入外部世界的信息处理系统。但这里还有最后一个问题。

---

## 四、Harness Engineering：当模型不再只是模型

如果一个 LLM 应用同时服务一万个用户，context pipeline 在高峰时延超时，某个模型节点偶发 500 错误，prompt 注入攻击绕过了你的内容过滤——这些问题，Prompt Engineering 和 Context Engineering 都无法解决。

因为它们的问题域在**"模型内"**，而这些故障的根因在**"模型外"**。

这就是 Harness Engineering 的领域。我借用"harness"（挽具）这个隐喻，是因为这一层的核心工作是**将 LLM 这个巨大的、不确定的、有概率性的组件，嵌入到一个确定性的、可观测的、可容错的工程系统中**[^5]。

Harness Engineering 涵盖的问题包括：

**可靠性与容错：**
- 重试策略（指数退避、抖动）
- 模型降级（主模型不可用时切换到备用模型）
- 速率限制与排队
- 断路器（circuit breaker）——连续失败时暂停调用，防止雪崩

**安全与控制：**
- 输入过滤（prompt injection 检测、PII 脱敏）
- 输出检查（内容安全、事实性校验）
- 沙箱执行（代码生成结果在隔离环境中运行）
- 权限控制（工具调用时的能力边界）

**路由与编排：**
- 根据任务复杂度将请求路由到不同模型（小模型做分类，大模型做推理）
- 多模型投票或辩论（ensemble）
- 流水线编排（一个输出作为另一个的输入，形成 DAG）
- 超时熔断——模型推理超过 10 秒，直接返回降级结果

**可观测性与评估：**
- 每次调用的延迟、token 消耗、成本追踪
- prompt 版本管理与 A/B 测试
- 线上评估（online eval）——用另一个模型对输出质量打分
- 用户反馈闭环（点赞/点踩 → 自动纳入训练或提示优化）

这一层的工作，本质上和 Prompt Engineering 已经没有太多关系了。你不再是和模型对话的人，你是**搭建模型运行环境的人**。你写的是重试逻辑、断路器配置、评估流水线、监控仪表盘——这些代码一行都不涉及 prompt 本身的措辞。

一个直观的类比：如果说 Prompt Engineering 是在给一个厨师写菜单（"少放盐，多放蒜，摆盘要精致"），Context Engineering 是在设计厨房的工作台和食材供应链（"冰箱里有什么、从哪个仓库调货、先处理哪批订单"），那么 Harness Engineering 就是在运营整家餐厅——排班、消防检查、客诉处理、高峰期分流[^6]。

你会发现一个有趣的事实：一家成功的餐厅，菜单可能只调整了三次，但后厨的运营系统每天都在迭代。

---

## 五、三个层次的真正关系

许多人误以为这三个层次是"从初级到高级"的线性升级——好像 Harness Engineer 就是"会写重试逻辑的 Prompt Engineer"。这种理解恰恰错过了关键点。

它们不是**职级的不同**，而是**问题域的不同**——就像建筑师、结构工程师和施工监理解决的是不同的问题，尽管他们共同建造同一栋建筑。

| 层次 | 核心问题 | 典型产出 | 技能偏向 |
|------|---------|---------|---------|
| Prompt Engineering | 如何让模型输出符合预期 | prompt 模板、few-shot 示例集 | 语言学直觉、领域知识、实验思维 |
| Context Engineering | 如何在调用前组装最优信息 | RAG pipeline、工具描述 schema、记忆管理器 | 信息架构、检索系统、数据结构 |
| Harness Engineering | 如何让系统可靠、安全、可观测 | 重试策略、评估流水线、监控仪表盘 | 分布式系统、容错设计、安全工程 |

一个成熟的 LLM 产品必然需要**三个层次同时存在**。缺少任何一层，产品都会在某条边界上崩溃：

- **只有 Prompt Engineering**：你的 prompt 很精妙，但模型不知道今天的股价，无法查你的订单号，也没有任何容错机制。这只是一个 demo。
- **只有 Context Engineering**：你的 RAG pipeline 很完善，但当流量翻倍、模型节点挂掉时，用户看到的是白屏。
- **只有 Harness Engineering**：你的监控面板漂亮极了，所有指标都在仪表盘上跳动。但你只是在精确地测量一个糟糕 prompt 的表现。

---

## 六、那个真相

三种工程，三种视角，三种技能栈。但如果我们退后一步看这个递进结构，会发现它指向一个更深层的命题：

**LLM 工程的演进方向，是将不确定性推向系统的更外层，让核心逻辑变得可预测。**

- Prompt Engineering 中，不确定性高到离谱——同一段 prompt，每次输出都可能不同。
- Context Engineering 通过提供精确的外部知识，缩小了不确定性空间——模型不再需要"知道一切"，只需"理解给定的信息"。
- Harness Engineering 将模型调用包裹进确定性逻辑——即使模型输出不可靠，系统通过重试、降级、评估来兜底。

换句话说，整个递进过程，就是**用工程确定性包裹概率不确定性**的过程。Prompt 的措辞是软的，但断路器的行为是硬的。模型的生成是概率采样的，但评估流程是确定性的打分函数。

这不是贬低 prompt 的价值——精准的 prompt 永远重要。但它意味着，如果你希望通过一味改进 prompt 来解决可靠性问题，那就像试图通过改进菜谱来修好厨房的漏水管道。问题不在同一个维度上。

---

## 七、结语：下一次你"调 prompt"之前

我写这篇文章，并非想说 Prompt Engineering 不重要。恰恰相反：一个差劲的 prompt 可以让最精密的 context pipeline 和最坚固的 harness 都形同虚设。正如一家米其林级别的后厨，如果只会做难吃的菜，装修再好也没用。

但我想说的是：当你发现自己在同一个 prompt 上反复调试超过一个小时，那个 prompt 本身大概率已经不是问题的根源。你遇到的可能不是措辞问题，而是信息缺失问题（该上 Context Engineering 了），或者是系统可靠性问题（该上 Harness Engineering 了）。

知道该在哪一层用力，比在某一层用力更深，更重要。

而知道整个递进结构的存在本身，或许是最重要的事。

---

## 参考文献

[^1]: Wei, J., et al. "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models." *NeurIPS 2022*. https://arxiv.org/abs/2201.11903 — 提出思维链 prompting 方法，证明在 prompt 中展示推理步骤可以显著提升模型在复杂推理任务上的表现。

[^2]: White, J., et al. "A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT." *arXiv preprint*, 2023. https://arxiv.org/abs/2302.11382 — 系统化了 prompt 模式（persona、few-shot、refinement 等），为 Prompt Engineering 提供了可复用的模式语言。

[^3]: Anil, R., et al. "Context engineering in large language models." *Google DeepMind Blog*, 2024. 讨论了系统化构建 LLM 上下文管道的工程实践，将上下文视为可设计和优化的信息通道。

[^4]: Lewis, P., et al. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." *NeurIPS 2020*. https://arxiv.org/abs/2005.11401 — 提出 RAG 架构，将检索系统与生成模型结合，是 Context Engineering 的核心技术之一。

[^5]: Harness Engineering 这一术语在工业界尚无统一的学术定义。本文借用 Anthropic、OpenAI 工程团队在博客和演讲中讨论的 LLMOps 实践（如模型路由、观察性、安全护栏、多模型编排等）来定义这一概念。参见 Anthropic 的 Model Context Protocol（MCP）讨论和 OpenAI 的 Evals 框架。

[^6]: 餐厅类比最早见于 Simon Willison 关于 LLM 应用的演讲 "How to build a reliable LLM app"，本文在此基础上做了扩展。

---

**作者注**：这篇文章里的三个层次划分，来自我在 build 项目和观察同行产品时的归纳。它不是学术界公认的分类法，更像是一套思考框架——如果你有不同的分法，或者觉得某个层次被遗漏了，欢迎讨论。
