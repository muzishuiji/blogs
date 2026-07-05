---
title: Obsidian 知识库整理建议
type: moc
status: growing
tags:
  - obsidian
  - knowledge-base
  - workflow
created: 2026-07-05
updated: 2026-07-05
---

# Obsidian 知识库整理建议

## 当前判断

`blogs` 很适合用 Obsidian skills 做整理和管理。它现在已经具备三个优势：

1. 绝大多数内容是 Markdown，天然适合 Obsidian。
2. 目录主题清楚，适合先做索引和视图，不需要推倒重来。
3. 同时包含技术笔记、读书笔记和个人原则，适合用 MOC、Base、Canvas 组合管理。

## 不建议一上来做的事

- 不建议马上大规模移动文件。现有 README 和外部链接可能依赖当前路径。
- 不建议一次性给所有笔记补 frontmatter。先处理高频笔记和新笔记即可。
- 不建议把所有目录改成英文或统一命名。当前中文路径对个人知识库是可接受的。

## 第一阶段：入口和视图

目标：让知识库可以被快速浏览。

- 增加 `00-知识库管理/知识库入口.md` 作为 Obsidian 首页。
- 增加前端知识和读书笔记两个 MOC。
- 增加 `.base` 文件，按文件夹查看笔记。
- 增加 `.canvas` 文件，做知识库地图。

## 第二阶段：轻量属性治理

目标：让笔记可筛选、可排序、可追踪状态。

建议优先给这些类型的笔记补 frontmatter：

- 新写的笔记。
- 准备继续长期维护的核心笔记。
- 读书笔记。
- 面试/复习高频笔记。

推荐字段：

```yaml
---
title: 标题
type: reading
status: seed
tags:
  - reading/book
created: 2026-07-05
updated: 2026-07-05
source:
rating:
---
```

## 第三阶段：双链和主题网络

目标：把“文章集合”变成“知识网络”。

- 技术概念之间补 `[[双链]]`，例如 Event Loop、Promise、async/await、浏览器渲染。
- 读书笔记里补“相关原则”和“可行动启发”链接。
- 每个主题维护一个 MOC，而不是依赖单一 README。

## 第四阶段：每周整理仪式

每周做一次小整理：

- 查看 `知识库总览.base` 中最近修改的笔记。
- 搜索 `TODO`、`待整理`、`暂未分类`。
- 给 1-3 篇高价值笔记补 frontmatter 和双链。
- 把新材料挂到对应 MOC。

## Codex 可以帮你做什么

你可以直接这样说：

```text
用 Obsidian skills 帮我把这篇文章整理进 blogs 知识库，放到 AI 分类，生成 frontmatter、摘要、双链和行动清单。
```

```text
帮我扫描 blogs 里最近新增的笔记，把它们挂到合适的 MOC，必要时补 frontmatter。
```

```text
根据我的读书笔记生成一个 Canvas，展示主题之间的关系。
```

```text
帮我创建一个 Base，用来查看所有 status=seed 的笔记。
```
