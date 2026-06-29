---
layout: post
category: research
title: "Reading: Self-Collision Avoidance for Humanoid Robots"
date: 2026-06-11 21:00:00 +0800
description: "A literature note motivated by the G1 hardware-protection anomaly. Two families of self-collision avoidance (SCA): offline planning (local minima, slow for high-DoF) and online (impedance potential from a simplified convex model, precision-versus-cost tradeoff). The key idea: collision is static given geometry and joint angles, so a differentiable collision-risk function can be learned. A 29-DoF robot is decomposed into submodules, and SVM, CPSP and NN are compared. This points toward a data-driven route beyond the current deterministic dynamic-limit fix."
description_en: "A literature note motivated by the G1 hardware-protection anomaly. Two families of self-collision avoidance (SCA): offline planning (local minima, slow for high-DoF) and online (impedance potential from a simplified convex model, precision-versus-cost tradeoff). The key idea: collision is static given geometry and joint angles, so a differentiable collision-risk function can be learned. A 29-DoF robot is decomposed into submodules, and SVM, CPSP and NN are compared. This points toward a data-driven route beyond the current deterministic dynamic-limit fix."
description_zh: "由 G1 硬件保护异常引发的文献笔记。自碰撞避免（SCA）两大家族：离线规划（局部极小值、高自由度下慢）与在线（基于简化凸模型的阻抗势，精度与成本权衡）。核心思想：给定几何与关节角，碰撞是静态的，因此可学习一个可微的碰撞风险函数。将 29 自由度机器人分解为子模块，比较 SVM、CPSP 与 NN。指向超越当前确定性动态限位的数据驱动路线。"
title_en: "Reading: Self-Collision Avoidance for Humanoid Robots"
title_zh: "阅读笔记：人形机器人自碰撞避免"
translation_key: humanoid-self-collision-avoidance
body_lang: zh        # the Markdown body below is written in Chinese
has_zh_content: true
has_en_content: false
tags: 机器人 自碰撞 avoidance 论文阅读 人形
categories: 论文阅读
_styles: ".post-content img, #markdown-content img { max-width: 100%; height: auto; display: block; margin: 1.5em auto; border-radius: 0.375rem; } .post-content figure, #markdown-content figure { margin: 1.5em 0; text-align: center; }"
---

> 这是 [宇树 G1 上肢遥操系统「硬件保护」异常诊断](/blog/2026/unitree-g1-hardware-protection-anomaly/) 的延伸阅读。我先用一个粗糙的动态限位做了应急修复（只扫描大臂电机、用强行截断防止撞击），但这个修复存在不少问题，于是去查别人怎么处理同类问题——本文是这篇自碰撞避免（Self-Collision Avoidance, SCA）论文的阅读笔记。

## 问题背景

人形机器人自由度很高，执行任务时必须**防止对自身的碰撞**，这就是 SCA 问题。现有方法大致分两类：

- **离线方法**：不在运动过程中实时规划，而是在运动开始前离线规划。缺点是容易陷入局部最小值，且在高自由度机器人上可能耗时过长。
- **在线方法**：运动过程中实时计算，通过简化的机器人外形扫描最近距离，形成一个"阻抗势"。缺点是精度与计算量需要权衡，且实时计算要求机器人模型**严格凸**，否则出现数值问题。

## 核心思想：把碰撞学成一个可微函数

论文指出一个关键观察：**碰撞是 static 的**——只要机器人几何结构、关节定义、角度不变，"哪些角度会碰撞"就是固定不变的。因此可以让机器学习方法学到一个**可微函数**，直接输出碰撞风险。

前人工作已在 14-DoF 机器人上验证用**稀疏 SVM** 做 SCA：这个 SVM 不仅能告诉机器人"何时快要撞上"，还能指出"往哪个方向调整可以脱离风险区"。

## 两大工程难点与解法

作者通过采样获取"会碰撞 / 不会碰撞"的关节角数据集，面临两个难题：

1. **数据集巨大**：高自由度下，碰撞/不碰撞的关节角组合数以百万计。
   - **解法**：把 29-DoF 机器人拆成多个**子模块**，每个子模块只关注内部少数部件是否碰撞，从而把全局问题降维成若干局部问题。
2. **精度与连续性**：在保证函数连续的前提下提升判断精度。
   - **解法**：对比多种机器学习方法——**SVM、CPSP、神经网络（NN）**，在精度、连续性、可微性之间权衡。

## 与我的工作的联系

论文的"子模块分解 + 学一个连续风险函数"思路，正好对应我那篇动态限位专利想要做的事——只是我用的是**确定性的几何限位函数**，而论文给的是**数据驱动的可微风险场**。后续如果要把限位从"大臂 yaw 单关节硬截断"推广到全臂连续避障，这条数据驱动的路线是更可扩展的方向。

> 论文信息：*Real-Time Self-Collision Avoidance in Joint Space for Humanoid Robots*（阅读笔记，2026-06）。
