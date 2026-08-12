---
title: 深度学习入门：训练循环到底发生了什么
categories:
  - 深度学习
tags:
  - 神经网络
  - PyTorch
  - 机器学习基础
cover: /img/perry-cover.png
description: 从张量、前向传播、损失、反向传播和参数更新理解一个最小训练循环。
abbrlink: d100ee01
date: 2026-08-12 14:40:00
updated: 2026-08-12 14:40:00
---

深度学习代码看起来有很多模块，但一次训练迭代通常只包含五件事：准备数据、前向传播、计算损失、反向传播、更新参数。

## 张量：模型处理的数据

张量可以理解为带有多个维度的数值数组。一个批次的输入常见形状是：

```text
[batch_size, features]
```

图像任务中则常见：

```text
[batch_size, channels, height, width]
```

很多初学错误并非模型原理错误，而是张量形状、数据类型或所在设备不一致。

## 前向传播

模型接收输入并产生预测：

```python
pred = model(x)
```

神经网络中的每一层都对输入进行一次可微分变换。层数更多并不自动意味着效果更好，结构要与数据规模和问题复杂度匹配。

## 损失函数

损失函数把预测与真实标签之间的差异转换为一个标量：

```python
loss = loss_fn(pred, y)
```

训练的直接目标是让损失下降。但损失的选择必须与任务一致：分类、回归和排序问题使用的目标并不相同。

## 反向传播与参数更新

```python
optimizer.zero_grad()
loss.backward()
optimizer.step()
```

`backward()` 根据计算图求出损失对每个参数的梯度，优化器再使用这些梯度更新参数。清空梯度很重要，因为许多框架默认累积梯度。

## 一个最小训练循环

```python
model.train()

for x, y in train_loader:
    optimizer.zero_grad()
    pred = model(x)
    loss = loss_fn(pred, y)
    loss.backward()
    optimizer.step()
```

验证时不需要更新梯度：

```python
model.eval()

with torch.no_grad():
    for x, y in valid_loader:
        pred = model(x)
```

`train()` 和 `eval()` 会影响 Dropout、Batch Normalization 等层的行为，因此不能只依赖 `no_grad()`。

## 训练时记录什么

至少记录训练损失、验证损失、主要评价指标、学习率和训练轮次。如果只看训练集表现，很难发现过拟合。

理解训练循环后，复杂模型只是增加了数据处理、网络结构、损失设计和训练策略。底层逻辑仍然是：预测、比较、求梯度、更新。
