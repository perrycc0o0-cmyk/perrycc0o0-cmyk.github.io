---
title: Linux 应用基础：文件、目录与常用命令
categories:
  - Linux
tags:
  - Linux 基础
  - 命令行
  - 文件系统
cover: /img/cover-linux-files.jpg
series: Linux for Bioinformatics
series_order: 1
description: 从路径、文件操作和文本查看开始，建立 Linux 命令行的基本心智模型。
abbrlink: 1100aa01
date: 2026-08-12 15:00:00
updated: 2026-08-12 15:00:00
---

Linux 命令行的核心并不是记忆大量命令，而是理解三件事：我在哪里、我要操作什么、结果要去哪里。

## 认识当前目录

```bash
pwd
ls
ls -lah
```

`pwd` 显示当前路径；`ls` 列出目录内容；`-l` 显示详细信息，`-a` 包含隐藏文件，`-h` 将文件大小显示为更容易阅读的单位。

路径分为两类：

- 绝对路径从根目录 `/` 开始；
- 相对路径从当前目录开始，`.` 表示当前目录，`..` 表示上一级目录。

## 创建、复制和移动

```bash
mkdir practice
touch practice/notes.txt
cp practice/notes.txt practice/notes-copy.txt
mv practice/notes-copy.txt practice/archive.txt
```

处理文件前可以先用 `ls` 检查目标位置。批量移动或删除时尤其要谨慎，不要在没有确认路径的情况下使用通配符。

## 查看文本文件

```bash
head -n 5 example.txt
tail -n 5 example.txt
less example.txt
wc -l example.txt
```

`head` 和 `tail` 适合快速查看开头与结尾；`less` 可以分页浏览大文件；`wc -l` 统计行数。

对很大的生物信息学文本文件，不要直接用编辑器完整打开。先查看文件大小，再用 `head`、`tail` 或流式命令抽样。

## 搜索文本和文件

```bash
grep -n "keyword" notes.txt
find . -type f -name "*.txt"
```

`grep` 在文本中找内容，`find` 在目录树中找文件。可以先限制搜索目录和文件类型，减少不必要的扫描。

## 理解权限

`ls -l` 输出最左侧类似 `-rw-r--r--` 的字段表示权限。三组字符分别对应文件所有者、所属组和其他用户。

```bash
chmod u+x run.sh
```

这条命令为文件所有者增加执行权限。不要习惯性使用过宽的权限；只开放完成任务所需的最小范围。

## 先检查，再执行

一个安全的小习惯是：先打印目标，再执行改变文件的命令。命令行效率很高，但也意味着错误操作会被迅速放大。

学会路径、输入输出和权限之后，新的 Linux 命令通常只是这套模型上的不同工具。
