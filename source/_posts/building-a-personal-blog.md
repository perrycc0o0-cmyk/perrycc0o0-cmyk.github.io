---
title: 科研工作流中的一些小习惯
categories:
  - 方法分享
tags:
  - 可复现分析
  - 数据分析
  - 工作流
cover: /img/cover-reproducible-workflow.jpg
series: 研究与学习方法
series_order: 2
description: 用简单、稳定的目录和记录方式，让一次公开练习可以被未来的自己重新运行。
abbrlink: e6663101
date: 2026-08-10 18:30:00
updated: 2026-08-12 09:00:00
---

可复现并不等于一开始就搭建复杂的平台。对公开练习和个人学习，先把输入、代码、结果和环境分开，已经能避免大量返工。

## 一个够用的目录

```text
project/
├─ data/
├─ scripts/
├─ results/
├─ figures/
└─ README.md
```

## 让每张图都能追溯

每张公开示例图都应该能追溯到脚本、数据版本和关键参数。

## 记录“为什么”

代码能说明做了什么，README 应继续说明为什么这么做。
