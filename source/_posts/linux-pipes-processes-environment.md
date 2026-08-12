---
title: Linux 应用基础：管道、进程与环境
categories:
  - Linux
tags:
  - Shell
  - 管道
  - 进程管理
cover: /img/cartoon-linux-pipelines.jpg
series: Linux for Bioinformatics
series_order: 2
description: 理解标准输入输出、管道、进程和环境变量，让多个小命令组成可靠工作流。
abbrlink: 1100aa02
date: 2026-08-12 14:50:00
updated: 2026-08-12 14:50:00
---

Linux 的力量来自组合：一个命令只做好一件事，再用管道把多个命令连接起来。

## 标准输入与标准输出

大多数命令从标准输入读取内容，把正常结果写到标准输出，把错误信息写到标准错误。

```bash
command > result.txt
command >> result.txt
command 2> error.log
```

`>` 覆盖文件，`>>` 追加文件。重定向前应确认目标文件，避免无意覆盖重要结果。

## 用管道组合命令

管道符 `|` 会把左侧命令的输出交给右侧命令：

```bash
grep -v '^#' records.txt | sort | uniq -c | sort -nr | head
```

这条命令依次去掉注释行、排序、计数、按数量倒序排列，并显示前几项。面对复杂管道，可以先单独运行每一段，确认中间结果后再组合。

## 查看和管理进程

```bash
ps aux
top
jobs
```

`ps` 查看进程快照，`top` 动态展示资源使用，`jobs` 查看当前 shell 启动的后台任务。

在终止进程之前，应确认进程编号和命令来源。优先让程序正常退出，只有确认普通终止无效时才考虑更强制的方式。

## 环境变量

```bash
echo "$PATH"
export PROJECT_MODE="practice"
```

环境变量为程序提供运行时配置。`PATH` 决定 shell 到哪些目录寻找可执行文件。

密钥、令牌和密码不应直接写入脚本或提交到版本控制。即使使用环境变量，也要确保日志不会把它们打印出来。

## 写一个可读的 Shell 脚本

```bash
#!/usr/bin/env bash
set -euo pipefail

input="${1:?please provide an input file}"

if [[ ! -f "$input" ]]; then
  echo "file not found: $input" >&2
  exit 1
fi

wc -l "$input"
```

这里有几个值得保留的习惯：变量始终加引号、检查输入是否存在、错误信息写到标准错误、遇到未定义变量或失败命令时及时停止。

## 保存运行记录

一个可靠工作流应该能回答：运行了什么命令、使用哪个软件版本、输入是什么、输出在哪里、是否成功结束。

管道让命令行变得简洁，日志和检查则让这种简洁保持可靠。
