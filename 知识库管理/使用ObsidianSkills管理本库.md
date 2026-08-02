---
title: 使用 Obsidian Skills 管理本库
type: note
status: growing
tags:
  - obsidian
  - codex
  - workflow
created: 2026-07-05
updated: 2026-07-05
---

# 使用 Obsidian Skills 管理本库

## 这几个 skill 分别怎么用

### obsidian-markdown

用途：写和改 Obsidian 风格 Markdown。

适合任务：

- 新建读书笔记、技术笔记、原则笔记。
- 补 frontmatter、tags、aliases。
- 加 `[[双链]]`、`![[嵌入]]`、callout。
- 把普通 Markdown 改成更适合 Obsidian 阅读的格式。

示例：

```text
帮我把 fe/AI/RAG架构解析.md 整理成 Obsidian 笔记，补 frontmatter、摘要、相关链接和行动清单。
```

### obsidian-bases

用途：创建 `.base` 管理视图。

适合任务：

- 按文件夹查看读书笔记。
- 按 `status` 找待整理笔记。
- 按更新时间查看最近修改。
- 做技术主题、书籍、输出状态的表格或卡片视图。

示例：

```text
帮我新增一个 Base，展示所有 type=reading 的笔记，按 updated 倒序排序。
```

### json-canvas

用途：创建 `.canvas` 知识地图。

适合任务：

- 生成前端学习路线图。
- 生成一本书的主题结构图。
- 把多个技术概念之间的关系画出来。

示例：

```text
根据 fe/前端基础/javaScript 下的笔记，生成一张 JavaScript 学习路线 Canvas。
```

### obsidian-cli

用途：通过命令行操作打开中的 Obsidian。

适合任务：

- 搜索 vault。
- 创建/读取/追加笔记。
- 查看 backlinks、unresolved links、tags。
- 用 Obsidian 自己的上下文验证文件是否能被识别。

常用命令：

```bash
cd /home/muzifu/project/blogs
obsidian help
obsidian vault
obsidian files
obsidian search query="Promise"
obsidian read file="00-知识库管理/知识库入口"
obsidian create name="临时笔记" content="# 临时笔记\n\n内容" silent
```

本机配置细节见 [[00-知识库管理/本机ObsidianCLI配置记录|本机 Obsidian CLI 配置记录]]。当前 `obsidian` 是 CLI wrapper，`obsidian-app` 用来启动桌面端。

### defuddle

用途：把网页正文抽取成干净 Markdown。

适合任务：

- 把文章、文档、博客整理成新笔记。
- 提取网页标题、摘要和正文。

常用命令：

```bash
defuddle parse "https://example.com/article" --md
defuddle parse "https://example.com/article" --md -o article.md
```

## 推荐你和 Codex 的协作方式

### 新增资料

```text
把这个 URL 整理进 blogs，归到 fe/AI，生成 Obsidian 笔记，并挂到 MOC。
```

### 整理旧文

```text
扫描 fe/前端基础/javaScript，挑 5 篇最值得整理的笔记，补 frontmatter 和双链，不移动文件。
```

### 建视图

```text
帮我建一个 Base：展示所有读书笔记，字段包含书名、状态、评分、更新时间、相关主题。
```

### 画图谱

```text
根据我的 AI 编程笔记生成 Canvas，分成 Claude Code、Agent、RAG、提示词工程四组。
```

## 当前库的建议节奏

1. 本次先创建入口、MOC、Base、Canvas。
2. 下一次优先给 `myself-records/daily-reading` 的读书笔记补 frontmatter。
3. 再下一次整理 `fe/AI`，它最适合做双链和 Canvas。
4. 最后再处理前端基础目录下的大量历史文章。
