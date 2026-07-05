---
title: 本机 Obsidian CLI 配置记录
type: note
status: evergreen
tags:
  - obsidian
  - cli
  - setup
created: 2026-07-05
updated: 2026-07-05
---

# 本机 Obsidian CLI 配置记录

## 已完成

- 已通过 Flatpak 用户级安装 Obsidian Desktop：`md.obsidian.Obsidian 1.12.7`。
- 已创建 `~/.local/bin/obsidian`，指向 Flatpak 包内的官方 CLI：`/app/obsidian-cli`。
- 已创建 `~/.local/bin/obsidian-app`，用于启动 Obsidian 桌面端。
- 已安装 `defuddle`，用于从网页抽取干净 Markdown。

## 当前状态

`obsidian` 命令已经存在，但官方 CLI 需要 Obsidian 桌面端正在运行。当前在终端直接执行：

```bash
obsidian version
```

会得到：

```text
The CLI is unable to find Obsidian. Please make sure Obsidian is running and try again.
```

这说明 CLI wrapper 本身已经生效，下一步是启动 Obsidian 并在应用里启用命令行接口。

## 你需要手动做的一步

1. 启动 Obsidian：

```bash
obsidian-app /home/muzifu/project/blogs
```

2. 在 Obsidian 桌面端里打开：

```text
Settings -> General -> Command line interface
```

3. 启用 Command line interface，并按提示完成注册。

4. 保持 Obsidian 打开，在终端验证：

```bash
cd /home/muzifu/project/blogs
obsidian help
obsidian vault
obsidian files
```

## 常用命令

```bash
cd /home/muzifu/project/blogs

obsidian help
obsidian vault
obsidian files
obsidian search query="Promise"
obsidian read file="00-知识库管理/知识库入口"
obsidian backlinks file="00-知识库管理/知识库入口"
obsidian unresolved
obsidian tags counts
```

## 网页整理命令

```bash
defuddle parse "https://example.com/article" --md
defuddle parse "https://example.com/article" --md -o /tmp/article.md
```

把网页整理进本库时，建议流程是：

1. 用 `defuddle` 抽取正文。
2. 用 `obsidian-markdown` 改成带 frontmatter、摘要、双链的笔记。
3. 挂到对应 MOC。
4. 必要时更新 `.base` 或 `.canvas`。
