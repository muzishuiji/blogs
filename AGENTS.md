# blogs 知识库协作约定

这个仓库既是博客内容库，也是 Obsidian vault。以后 Codex 处理本仓库时，优先把它当作一个小型知识库来维护。

## 语言与风格

- 始终使用简体中文沟通和写作。
- 保留现有文章正文风格，不为了统一格式而大规模重写历史笔记。
- 新增管理类文档优先放在 `00-知识库管理/`。

## Obsidian Skills 使用约定

- 写或改 `.md` 笔记时，使用 Obsidian Markdown 语法：frontmatter、`[[wikilink]]`、callout、标签、嵌入等。
- 创建数据库式视图时，使用 `.base` 文件，优先按文件夹和 frontmatter 属性组织。
- 创建知识地图、主题路径、学习路线时，使用 `.canvas` 文件，并校验 JSON 结构和节点连线。
- 需要直接操作打开中的 Obsidian vault 时，使用 `obsidian` CLI；命令目标优先显式指定当前 vault 或在本仓库目录下运行。
- 把网页整理进知识库时，先用 Defuddle 抽取干净 Markdown，再改写成符合本库风格的笔记。

## 笔记治理规则

- 新笔记建议包含 frontmatter：

```yaml
---
title: 标题
type: note
status: seed
tags:
  - topic/example
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

- `type` 建议值：`reading`、`tech`、`principle`、`record`、`moc`、`template`。
- `status` 建议值：`seed`、`growing`、`evergreen`、`archived`。
- 内部链接使用 `[[路径/文件名|展示名]]`；外部链接使用标准 Markdown 链接。
- 每次整理优先做小步提交式修改：补索引、补 frontmatter、补双链，不一次性搬动大量文件。

## 推荐工作流

1. 先打开 `00-知识库管理/知识库入口.md`。
2. 用 `00-知识库管理/知识库总览.base` 查看当前笔记分布。
3. 新增读书笔记时从 `00-知识库管理/Templates/阅读笔记模板.md` 复制结构。
4. 新增技术笔记时从 `00-知识库管理/Templates/技术笔记模板.md` 复制结构。
5. 每周整理一次 `TODO.md`、孤立笔记和缺少 frontmatter 的笔记。
