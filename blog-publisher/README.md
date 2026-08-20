# Blog Publisher

用于编辑并发布本仓库 Markdown 文章的 React + Tauri 桌面应用。

## GitHub 登录配置

1. 创建 GitHub OAuth App，并在设置中启用 **Device Flow**。
2. 复制 `.env.example` 为 `.env.local`。
3. 将 OAuth App Client ID 填入 `VITE_GITHUB_CLIENT_ID`。

应用只申请 `public_repo` 权限。访问令牌只保存在 Rust 进程内存中，不写入 WebView 存储、文件或 Git remote URL；应用退出后需要重新登录。

## 开发与验证

```bash
npm install
npm run tauri dev
npm run build
cd src-tauri && cargo check --locked
```
