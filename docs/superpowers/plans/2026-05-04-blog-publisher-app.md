# Blog Publisher App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Tauri app for publishing blog posts — article management (list/preview/edit), GitHub OAuth, git commit + push to trigger GitHub Action deployment.

**Architecture:** Tauri 2.x with React/TypeScript frontend. App clones the fixed repo to local filesystem, manages `.md` files directly, handles GitHub OAuth authentication, and triggers deploy via git push. GitHub Actions handles the actual `wrangler deploy`.

**Tech Stack:** Tauri 2.x, React + TypeScript, GitHub OAuth App, git2 (via tauri-plugin-shell), Node.js for GitHub Action

---

## File Structure

```
blog-publisher/                  # New Tauri project
├── src/                          # React frontend
│   ├── components/
│   │   ├── ArticleList.tsx        # Left panel: article list
│   │   ├── ArticleEditor.tsx      # Right panel: edit/preview
│   │   ├── FrontmatterEditor.tsx  # Frontmatter fields form
│   │   ├── MarkdownPreview.tsx   # Rendered markdown preview
│   │   └── PublishButton.tsx      # Commit + push trigger
│   ├── lib/
│   │   ├── github.ts             # GitHub API (auth, repo info)
│   │   ├── git.ts                # Git operations (clone, commit, push)
│   │   └── frontmatter.ts        # Parse/generate YAML frontmatter
│   ├── hooks/
│   │   ├── useAuth.ts            # GitHub OAuth state
│   │   ├── useRepo.ts            # Repo local path + sync state
│   │   └── useArticles.ts        # Article list + CRUD
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/
│   ├── src/
│   │   ├── main.rs               # Tauri entry
│   │   └── lib.rs                # Rust commands (git, file ops)
│   ├── Cargo.toml
│   └── tauri.conf.json
└── SPEC.md                       # App specification

.github/
└── workflows/
    └── deploy.yml                # GitHub Action for wrangler deploy

blog-site/                        # Your existing blog repo (existing path: .)
├── content/posts/                # Existing articles
└── .github/workflows/deploy.yml  # TO BE CREATED
```

**Shared ownership:** `blog-publisher/` (new app) and repo root `content/posts/` (your existing blog content). The app edits existing files in place.

---

## Task 1: Create GitHub OAuth App and Action Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `.github/workflows/` (ensure directory exists)

- [ ] **Step 1: Create GitHub Action workflow**

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy with Wrangler
        run: npx wrangler pages deploy .open-next
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

- [ ] **Step 2: Add Cloudflare secrets to repo**

Run in repo:
```bash
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```
Or via GitHub UI: Settings → Secrets → Actions → New repository secret.

- [ ] **Step 3: Commit workflow file**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add Cloudflare Pages deploy workflow"
```

**Verification:** Push to main, check Actions tab — workflow should appear within ~30 seconds.

---

## Task 2: Scaffold Tauri App

**Files:**
- Create: All project scaffold files (run `npm create tauri-app@latest`)

- [ ] **Step 1: Create Tauri project**

```bash
npm create tauri-app@latest blog-publisher
# Select: React + TypeScript, Tauri 2.x
cd blog-publisher
```

- [ ] **Step 2: Install frontend dependencies**

```bash
npm install @tauri-apps/api @tauri-apps/plugin-shell
npm install react-hook-form react-markdown remark-gfm yaml
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tauri**

File: `src-tauri/tauri.conf.json` — add these permissions:
```json
{
  "plugins": {
    "shell": {
      "open": true,
      "scope": [
        { "name": "git", "cmd": "git", "args": true }
      ]
    }
  }
}
```

- [ ] **Step 4: Configure iOS/Android builds**

File: `src-tauri/Cargo.toml` — ensure mobile targets present (Tauri 2.x default has them).

- [ ] **Step 5: Commit scaffold**

```bash
git init
git add .
git commit -m "feat: scaffold Tauri app"
```

---

## Task 3: GitHub OAuth Implementation

**Files:**
- Create: `src/lib/github.ts`
- Create: `src/hooks/useAuth.ts`

- [ ] **Step 1: Write GitHub OAuth helper**

File: `src/lib/github.ts`

```typescript
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

export function getOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'repo',
  });
  return `${GITHUB_OAUTH_URL}?${params}`;
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, code }),
  });
  const data = await response.json();
  return data.access_token;
}
```

- [ ] **Step 2: Write auth hook**

File: `src/hooks/useAuth.ts`

```typescript
import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('github_token')
  );

  const login = () => {
    window.location.href = getOAuthUrl();
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setToken(null);
  };

  return { token, login, logout, isAuthenticated: !!token };
}
```

- [ ] **Step 3: Add OAuth callback handler**

File: `src/App.tsx` — handle `/auth/callback` route, exchange code for token, redirect to main.

- [ ] **Step 4: Commit**

```bash
git add src/lib/github.ts src/hooks/useAuth.ts src/App.tsx
git commit -m "feat: GitHub OAuth implementation"
```

---

## Task 4: Git Operations (Clone, Commit, Push)

**Files:**
- Create: `src/lib/git.ts`
- Create: `src/hooks/useRepo.ts`
- Modify: `src-tauri/src/lib.rs` (add Rust git commands)

- [ ] **Step 1: Write Rust git commands**

File: `src-tauri/src/lib.rs`

```rust
use std::process::Command;

#[tauri::command]
pub fn git_clone(token: &str, repo_url: &str, dest: &str) -> Result<(), String> {
    let url = format!("https://x-access-token:{}@{}", token, repo_url.replace("https://", ""));
    let output = Command::new("git")
        .args(["clone", &url, dest])
        .output()
        .map_err(|e| e.to_string())?;
    if output.status.success() {
        Ok(())
    } else {
        Err(String::from_utf8_lossy(&output.stderr).to_string())
    }
}

#[tauri::command]
pub fn git_commit_push(repo_path: &str, message: &str) -> Result<(), String> {
    let push = Command::new("git")
        .current_dir(repo_path)
        .args(["push"])
        .output()
        .map_err(|e| e.to_string())?;

    if !push.status.success() {
        return Err(String::from_utf8_lossy(&push.stderr).to_string());
    }
    Ok(())
}
```

Update `src-tauri/src/main.rs` to register these commands.

- [ ] **Step 2: Write Git library**

File: `src/lib/git.ts`

```typescript
import { invoke } from '@tauri-apps/api/core';

const REPO_URL = 'https://github.com/EricJiang1329145/blog'; // fixed

export async function cloneRepo(token: string, destPath: string): Promise<void> {
  await invoke('git_clone', { token, repoUrl: REPO_URL, dest: destPath });
}

export async function commitAndPush(
  repoPath: string,
  filePath: string,
  content: string
): Promise<void> {
  // Write file
  await invoke('write_file', { path: filePath, content });
  // Git add + commit + push
  await invoke('git_add_commit_push', { repoPath, message: `publish: update ${filePath}` });
}
```

- [ ] **Step 3: Write repo hook**

File: `src/hooks/useRepo.ts`

```typescript
import { useState } from 'react';
import { cloneRepo } from '../lib/git';

export function useRepo() {
  const [repoPath, setRepoPath] = useState<string | null>(
    localStorage.getItem('repo_path')
  );
  const [syncing, setSyncing] = useState(false);

  const sync = async (token: string) => {
    setSyncing(true);
    const path = `${await getAppDataDir()}/blog-repo`;
    await cloneRepo(token, REPO_URL, path);
    setRepoPath(path);
    localStorage.setItem('repo_path', path);
    setSyncing(false);
  };

  return { repoPath, sync, syncing };
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/git.ts src/hooks/useRepo.ts src-tauri/src/
git commit -m "feat: git operations for clone and push"
```

---

## Task 5: Article List & Frontmatter Editor

**Files:**
- Create: `src/lib/frontmatter.ts`
- Create: `src/hooks/useArticles.ts`
- Create: `src/components/ArticleList.tsx`
- Create: `src/components/FrontmatterEditor.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write frontmatter parser**

File: `src/lib/frontmatter.ts`

```typescript
import { parse, stringify } from 'yaml';

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

export function parseFrontmatter(content: string): { frontmatter: ArticleFrontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Invalid frontmatter');
  return {
    frontmatter: parse(match[1]) as ArticleFrontmatter,
    body: match[2],
  };
}

export function stringifyFrontmatter(fm: ArticleFrontmatter, body: string): string {
  return `---\n${stringify(fm)}---\n${body}`;
}
```

- [ ] **Step 2: Write articles hook**

File: `src/hooks/useArticles.ts`

```typescript
import { useState, useEffect } from 'react';
import { readDir, readFile } from '@tauri-apps/plugin-fs';
import { parseFrontmatter, ArticleFrontmatter } from '../lib/frontmatter';

export function useArticles(repoPath: string | null) {
  const [articles, setArticles] = useState<Array<ArticleFrontmatter & { path: string }>>([]);

  useEffect(() => {
    if (!repoPath) return;
    // Read all .md files from content/posts/
    const postsDir = `${repoPath}/content/posts`;
    // list files, parse frontmatter, expose as list
  }, [repoPath]);

  return { articles };
}
```

- [ ] **Step 3: Build ArticleList component**

File: `src/components/ArticleList.tsx`

- Left panel showing article cards (title, date, category)
- Click to select article
- "New Article" button

- [ ] **Step 4: Build FrontmatterEditor component**

File: `src/components/FrontmatterEditor.tsx`

- Form fields: title, slug (auto-generated from title), date (date picker), category, tags (multi-input), description (textarea)
- Auto-slug: title → slug on change

- [ ] **Step 5: Wire up in App.tsx**

Two-panel layout: ArticleList left, FrontmatterEditor + preview right.

- [ ] **Step 6: Commit**

```bash
git add src/lib/frontmatter.ts src/hooks/useArticles.ts src/components/
git commit -m "feat: article list and frontmatter editor"
```

---

## Task 6: Markdown Preview

**Files:**
- Create: `src/components/MarkdownPreview.tsx`

- [ ] **Step 1: Build MarkdownPreview**

File: `src/components/MarkdownPreview.tsx`

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-lg dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
```

- [ ] **Step 2: Integrate into editor panel**

Add tab toggle: "Edit" / "Preview" in the right panel above the markdown body.

- [ ] **Step 3: Commit**

```bash
git add src/components/MarkdownPreview.tsx
git commit -m "feat: markdown preview component"
```

---

## Task 7: Publish Flow (Commit + Push)

**Files:**
- Create: `src/components/PublishButton.tsx`
- Modify: `src/components/ArticleEditor.tsx` (integrate publish)

- [ ] **Step 1: Build PublishButton**

File: `src/components/PublishButton.tsx`

```tsx
import { useState } from 'react';
import { commitAndPush } from '../lib/git';

export function PublishButton({ repoPath, filePath, content }: Props) {
  const [publishing, setPublishing] = useState(false);

  const publish = async () => {
    setPublishing(true);
    const timestamp = new Date().toISOString();
    const message = `publish: ${timestamp}`;
    await commitAndPush(repoPath, filePath, content, message);
    setPublishing(false);
  };

  return (
    <button onClick={publish} disabled={publishing}>
      {publishing ? 'Publishing...' : '发布'}
    </button>
  );
}
```

- [ ] **Step 2: Integrate into editor**

Add PublishButton in the editor header, next to the frontmatter form.

- [ ] **Step 3: Commit**

```bash
git add src/components/PublishButton.tsx
git commit -m "feat: publish button with git push"
```

---

## Task 8: Platform Build (macOS, iPadOS, Android)

**Files:**
- Modify: `src-tauri/tauri.conf.json`
- Modify: `src-tauri/Cargo.toml`

- [ ] **Step 1: Configure app metadata and icons**

In `tauri.conf.json`, set:
```json
{
  "productName": "Blog Publisher",
  "identifier": "com.ericjiang.blogpublisher",
  "macOS": { "minimumSystemVersion": "13.0" },
  "iOS": { "minimumOSVersion": "16.0" },
  "android": {
    "minSdkVersion": 24,
    "targets": ["aarch64", "armv7", "x86_64"]
  }
}
```

- [ ] **Step 2: Build macOS**

```bash
cd blog-publisher
npm run tauri build -- --target x86_64-apple-darwin
```

- [ ] **Step 3: Build iPadOS**

```bash
npm run tauri build -- --target aarch64-apple-ios
```

- [ ] **Step 4: Build Android**

```bash
npm run tauri build -- --target aarch64-linux-android
```

**Output:** `.app` for macOS, `.ipa` for iOS, `.apk` for Android in `src-tauri/target/release/bundle/`.

---

## Verification

After all tasks:

1. **App loads** — GitHub OAuth login works, repo clones
2. **Article list** — all posts in `content/posts/` appear
3. **Edit & preview** — frontmatter + markdown renders correctly
4. **Publish** — clicking "发布" commits and pushes to GitHub
5. **GitHub Action** — workflow runs `wrangler deploy` within ~2 min of push
6. **Cloudflare Pages** — site updates with new content

---

## Self-Review Checklist

- [ ] GitHub Action workflow covers the fixed repo path and wrangler deploy command
- [ ] OAuth uses `repo` scope for read/write access
- [ ] All frontmatter fields (title, slug, date, category, tags, description) are editable
- [ ] Publish flow: local file write → git commit → git push → Action triggers
- [ ] Mobile build targets (iPadOS 16+, Android 24+) are configured
- [ ] No placeholder code — all file paths and function names are concrete