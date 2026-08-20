export const postContentLoaders: Record<string, () => Promise<{ default: string }>> = {
  "math-learning-methods": () => import("./post-content/math-learning-methods"),
  "prompt-context-harness-engineering": () => import("./post-content/prompt-context-harness-engineering"),
  "idealization-and-afo": () => import("./post-content/idealization-and-afo"),
  "red-packet": () => import("./post-content/red-packet"),
  "tech-consumerism-identity": () => import("./post-content/tech-consumerism-identity"),
  "ai-hype-cycle-reflection": () => import("./post-content/ai-hype-cycle-reflection"),
  "ai-overfitting-in-education": () => import("./post-content/ai-overfitting-in-education"),
  "hello-neon-cosmos": () => import("./post-content/hello-neon-cosmos"),
  "markdown-test": () => import("./post-content/markdown-test")
};
