---
layout: page
title: AI PPT Maker
description: 全栈 AI 应用 · Flask 后端 + React 前端 · MiniMax 大模型驱动
importance: 11
category: software
related_publications: false
---

一个全栈 AI 应用：输入主题，大模型自动生成 PPT 大纲，支持自然语言对话式编辑、模板上传、在线编辑，最终导出可演示的 PPT。

### 功能

- **AI 生成大纲**：输入主题，MiniMax 大模型自动生成结构化 PPT 大纲
- **自然语言编辑**：通过对话式交互修改 PPT 内容（"把第二页改成…"）
- **模板上传**：上传 PPT/PDF 作为视觉模板
- **在线编辑**：编辑幻灯片标题、内容、备注
- **导出**：生成可直接演示的 .pptx 文件

### 技术架构

```
pptMaker/
├── backend/              # Flask 后端
│   ├── routes/           # ai / ppt / templates API
│   └── services/         # MiniMax 服务 / PPT 生成
├── frontend/             # React 前端
│   └── src/              # api / components / pages / store
└── generated/            # 生成的 PPT
```

> 技术栈：Flask · React · MiniMax API · python-pptx · Vite
