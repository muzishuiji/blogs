## 概述

RAG 发展到现在，已经不是简单的「向量检索 + 大模型」这一形态。常见的架构至少有三类：Classic RAG、Graph RAG、和Agentic RAG。

- Classic RAG：retrieves 检索
- Graph RAG： connects 连接
- Agentic RAG：reasons 推理

Classic RAG 负责「找资料」，Graph RAG 负责「找关系」，Agentic RAG负责「决定下一步该查什么」

## 三种RAG的核心区别

1. Classic RAG：先把相似内容找出来

把用户问题转成向量，再从知识库里找出最相似的文本片段，最后交给大模型生成答案。

Classic RAG 的核心成本分为两部分：一部分在知识库准备阶段，一部分在用户查询阶段。

Classic RAG擅长「找到相关内容」，不擅长「沿着关系继续往下找」。

2. Graph RAG：不只找文本，还要找关系

Graph RAG的重点，是在文本检索之外，增加一层「关系结构」。这种关系结构也叫知识图谱，知识图谱表达方式很直观，它会把知识拆成实体和关系。

Graph RAG的基本流程可以理解为两条线并行：
- 文本仍然可以被切成chunk，embedding，并放进知识库；
- 系统还会从文本中抽取实体和关系，构建知识图谱；


Graph 