# 个人主页部署指南 / Deployment Guide

本目录是基于 **al-folio** 模板的个人主页源码，包含两个独立可部署的产物：

| 产物 | 仓库 | 用途 | 访问地址 |
|------|------|------|----------|
| 🌐 **个人网站** | `dgmm-claude.github.io` | 作品集/简历站（放简历给导师看） | https://dgmm-claude.github.io |
| 👤 **Profile README** | `dgmm-claude` （与用户名同名的特殊仓库） | GitHub 个人主页置顶卡片（开源引流） | https://github.com/dgmm-claude |

> 两者相互独立，但都指向同一个网站。建议两个都部署。

---

## 📋 部署前检查清单

打开 `_data/socials.yml`，**至少修改这一处**：

```yaml
email: your-email@cqu.edu.cn   # ← 改成你的真实邮箱
```

其他可选修改（`_config.yml` 里的 `first_name` / `last_name`、`_data/cv.yml` 里的联系方式等）按需调整。

---

## 🌐 第一部分：部署个人网站（dgmm-claude.github.io）

### 步骤 1 — 在 GitHub 建仓库

登录 GitHub（用户名 `dgmm-claude`），**新建一个仓库**：

- **仓库名**：必须正好是 `dgmm-claude.github.io`（用户名 + `.github.io`）
- 可见性：**Public**（免费 GitHub Pages 必须公开）
- **不要**勾选 "Initialize with README"（避免冲突）

### 步骤 2 — 推送源码

在本目录（`个人主页/`）下执行：

```bash
cd /home/dgmm/projectFiles/简历信息汇总/个人主页

# 初始化并提交（保留 al-folio 的 git 历史可选，这里全新开始更干净）
rm -rf .git                  # 如有残留的历史先删掉
git init
git add .
git commit -m "init: al-folio 个人主页 - 郑皓文"

git branch -M main
git remote add origin https://github.com/dgmm-claude/dgmm-claude.github.io.git
git push -u origin main
```

> 💡 若用 HTTPS 推送需要 Personal Access Token；也可改用 SSH：`git remote set-url origin git@github.com:dgmm-claude/dgmm-claude.github.io.git`

### 步骤 3 — 开启 GitHub Actions 部署

al-folio 使用非默认插件（jekyll-scholar 等），**不能**用 GitHub Pages 的默认构建，必须用仓库自带的 GitHub Actions 工作流（`.github/workflows/deploy.yml`）：

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **`GitHub Actions`**（不是 "Deploy from a branch"）
3. 进入 **Actions** 标签页，应能看到 `deploy` workflow 正在运行
4. 等待约 2–4 分钟，构建变绿后访问 **https://dgmm-claude.github.io** 即可

### 步骤 4 — （首次）确认 Actions 权限

若 Actions 没自动运行或失败，进 **Settings → Actions → General**，确保：
- Workflow permissions 选 **Read and write permissions**

---

## 👤 第二部分：部署 Profile README（dgmm-claude/dgmm-claude）

Profile README 是 GitHub 的特殊机制：**当你有一个与用户名同名的仓库**（这里是 `dgmm-claude`），其中的 `README.md` 会显示在你的个人主页顶部。

### 步骤 1 — 建同名仓库

新建仓库：
- **仓库名**：`dgmm-claude`（与你的 GitHub 用户名**完全相同**）
- 可见性：**Public**
- 勾选 **"Add a README file"**

### 步骤 2 — 上传 Profile README

本目录下有 `Profile-README.md`，把它作为该仓库的 `README.md`：

**方式 A（网页，最简单）**：在该仓库网页点 `README.md` → 编辑 → 把 `Profile-README.md` 的内容整体粘贴进去 → Commit。

**方式 B（命令行）**：
```bash
mkdir -p /tmp/profile-repo && cd /tmp/profile-repo
git init
cp /home/dgmm/projectFiles/简历信息汇总/个人主页/Profile-README.md README.md
git add README.md
git commit -m "add profile readme"
git branch -M main
git remote add origin https://github.com/dgmm-claude/dgmm-claude.git
git push -u origin main
```

访问 **https://github.com/dgmm-claude** 即可看到置顶卡片。

> ⚠️ Profile README 里的 GitHub Stats 卡片（`github-readme-stats.vercel.app`）需你的仓库有公开提交后才有数据，初期可能显示 "An error occurred"，属正常。

---

## 🔧 日常维护

### 改完内容如何更新网站

```bash
cd /home/dgmm/projectFiles/简历信息汇总/个人主页
git add .
git commit -m "update: <改了什么>"
git push
```

push 后 GitHub Actions 会自动重新构建部署，1–3 分钟生效。

### 常见改动位置

| 想改什么 | 改哪个文件 |
|---------|-----------|
| 头像 | `assets/img/prof_pic.jpg`（同名替换） |
| 首页自我介绍 | `_pages/about.md` |
| 新增/修改项目 | `_projects/*.md` |
| 新增博客文章 | `_posts/YYYY-MM-DD-标题.md` |
| 简历数据（CV 页） | `_data/cv.yml` |
| 邮箱/GitHub/社交链接 | `_data/socials.yml` |
| 开源仓库展示 | `_data/repositories.yml` |
| 动态新闻 | `_news/*.md` |
| 中文/英文简历 PDF | `assets/pdf/CV_Zheng_Haowen_CN.pdf` / `_EN.pdf` |

### 新增一篇博客文章

在 `_posts/` 新建 `YYYY-MM-DD-英文slug.md`，开头：

```yaml
---
layout: post
title: "文章标题"
date: 2026-06-01 10:00:00 +0800
description: 一句话摘要
tags: 标签1 标签2
categories: 分类
---
正文（支持 Markdown + LaTeX 数学公式 + 图片）...
```

---

## 🖥️ 可选：本地预览（Docker，推荐）

al-folio 官方推荐用 Docker 本地预览（避免装 Ruby/Node 环境）：

```bash
cd /home/dgmm/projectFiles/简历信息汇总/个人主页
docker compose up
# 浏览器访问 http://localhost:8080
```

修改文件会自动热重载。按 `Ctrl+C` 停止。

> 本机构建说明：本机 Ruby 3.2.3 直接 `bundle install` 会因 al-folio 需要的 `bigdecimal` 原生 gem 与 Ruby 版本不完全匹配而可能报错，**用 Docker 是最省心的本地预览方式**；最终构建以 GitHub Actions 为准。

---

## ❓ 故障排查

| 现象 | 解决 |
|------|------|
| 网站显示 404 | 确认仓库名严格为 `dgmm-claude.github.io`，且 Pages Source 选了 `GitHub Actions` |
| Actions 失败 | 进 Actions 页看日志；多数是 YAML 语法错误，检查最近改的 `.md` front matter |
| 图片不显示 | 确认路径以 `assets/img/...` 开头且文件确实在该路径 |
| Profile README 不显示 | 确认仓库 `dgmm-claude` 与用户名同名、Public、有 `README.md` |
| Stats 卡片报错 | 初期无数据正常；或仓库设为 Private 也会失效，需 Public |

---

## 📁 本目录结构速览

```
个人主页/
├── _config.yml              # 站点总配置（标题/URL/语言）
├── _pages/                  # 导航页面（about/projects/blog/repositories/cv）
├── _projects/               # 11 个项目作品集
├── _posts/                  # 博客文章（3 篇技术文档）
├── _news/                   # 首页动态新闻
├── _data/                   # socials / cv / repositories 数据
├── _bibliography/           # 论文（暂空，发表后填）
├── assets/
│   ├── img/projects/        # 项目配图（58 张）
│   ├── img/posts/           # 博客配图
│   ├── img/prof_pic.jpg     # 头像
│   └── pdf/                 # 中英文简历 PDF
├── .github/workflows/       # deploy.yml（部署）+ codeql.yml
├── Profile-README.md        # ← Profile README 源文件（单独部署）
└── DEPLOY.md                # ← 本文件
```
