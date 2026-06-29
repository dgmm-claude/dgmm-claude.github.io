---
layout: post
category: research
featured: true
title: "Why Forearm Pose + Shoulder Distance Cannot Uniquely Locate a Point"
date: 2026-01-22 21:00:00 +0800
description: "A rigorous derivation showing that knowing the forearm's pose, a point's distance to the shoulder, and the arm lengths still does not uniquely determine the point's 3D position — the solution set is a one-parameter family, not a single point. This underdetermination explains why a pose-only IMU scheme must add extra constraints (multiple IMUs, calibration, magnetometer) to localize. Geometrically the distance constraint is a sphere, the pose a ray, and the arm-length constraint another sphere, whose intersection is generally a curve."
description_en: "A rigorous derivation showing that knowing the forearm's pose, a point's distance to the shoulder, and the arm lengths still does not uniquely determine the point's 3D position — the solution set is a one-parameter family, not a single point. This underdetermination explains why a pose-only IMU scheme must add extra constraints (multiple IMUs, calibration, magnetometer) to localize. Geometrically the distance constraint is a sphere, the pose a ray, and the arm-length constraint another sphere, whose intersection is generally a curve."
description_zh: "严格推导：已知前臂姿态、某点到肩部的距离与臂长，仍无法唯一确定该点的三维位置——解集是单参数族而非单点。这种欠定性解释了仅姿态的 IMU 方案为何需要额外约束（多 IMU、标定、磁力计）才能定位。几何上，距离约束是球面、姿态是射线、臂长约束是另一个球面，三者交一般为曲线。"
title_en: "Why Forearm Pose + Shoulder Distance Cannot Uniquely Locate a Point"
title_zh: "为何前臂姿态 + 肩距无法唯一确定一点的位置"
translation_key: ik-solution-space-underdetermined
body_lang: zh        # the Markdown body below is written in Chinese
has_zh_content: true
has_en_content: false
tags: 逆运动学 数学 解空间 IMU 遥操
categories: 数学推导
---

> 这是 [宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/) 设计早期的一个数学疑问：如果我知道小臂的姿态、小臂上某点到肩点的距离、以及大小臂长度，能不能唯一解出这个点的三维位置？直觉上似乎可以，但严格推导表明**不行**——这解释了为什么遥操系统必须引入额外约束（如多 IMU、校准、磁力计）才能定位。

## 问题描述

已知：

- 小臂的**姿态**（用单位向量 $\mathbf{A}$ 表示，$\|\mathbf{A}\|=1$）
- 小臂上某一点到**肩点**的距离 $R$
- **大臂长度** $L_1$ 与**小臂长度**

判断：能否唯一确定该点在三维空间中的位置？

> 注：点本身没有姿态，这里的"姿态"指的是小臂的姿态。

## 符号定义

- 肩点 $\mathbf{S}\in\mathbb{R}^3$，肘点 $\mathbf{Z}\in\mathbb{R}^3$
- 大臂长度 $L_1=\|\mathbf{Z}-\mathbf{S}\|$
- 小臂姿态单位向量 $\mathbf{A}$，$\|\mathbf{A}\|=1$
- 目标点到肘点距离 $d$，目标点位置 $\mathbf{P}$
- 目标点到肩点距离 $R=\|\mathbf{P}-\mathbf{S}\|$（已知）

## 几何建模

目标点在小臂上、小臂姿态已知，故：

$$\mathbf{P}=\mathbf{Z}+d\,\mathbf{A}$$

记大臂向量 $\mathbf{W}=\mathbf{Z}-\mathbf{S}$，肩点指向目标点的向量 $\mathbf{V}=\mathbf{P}-\mathbf{S}$，代入得：

$$\mathbf{V}=\mathbf{W}+d\,\mathbf{A}$$

## 约束推导

**约束 1（距离已知）**：$\|\mathbf{V}\|=R$，平方得 $\mathbf{V}\cdot\mathbf{V}=R^2$。

**约束 2（展开内积）**：将 $\mathbf{V}=\mathbf{W}+d\mathbf{A}$ 代入：

$$(\mathbf{W}+d\mathbf{A})\cdot(\mathbf{W}+d\mathbf{A})=R^2$$

展开：

$$\mathbf{W}\cdot\mathbf{W}+d^2\,\mathbf{A}\cdot\mathbf{A}+2d\,\mathbf{A}\cdot\mathbf{W}=R^2$$

由 $\|\mathbf{W}\|=L_1$、$\|\mathbf{A}\|=1$：

$$L_1^2+d^2+2d\,\mathbf{A}\cdot\mathbf{W}=R^2$$

**约束 3（方向约束）**：整理得

$$\mathbf{A}\cdot\mathbf{W}=\frac{R^2-L_1^2-d^2}{2d}$$

## 结论：解空间是一族，不是一点

上述结果表明，已知量仅对 $\mathbf{A}\cdot\mathbf{W}$ 施加了**一个标量约束**——它只限制了 $\mathbf{W}$ 在 $\mathbf{A}$ 方向上的投影分量。在满足该投影的前提下，$\mathbf{W}$ 仍然可以在**垂直于 $\mathbf{A}$ 的整个平面内连续变化**。

> 因此，已知小臂姿态、点到肩距离、大小臂长度，目标点的位置**并不唯一**，存在一族解。

## 物理直观

三个约束各自的几何含义：

- 到肩距离 $R$ → 目标点位于以肩为心、$R$ 为半径的**球面**上
- 小臂姿态 $\mathbf{A}$ → 给定一条方向射线
- 大臂长度 $L_1$ → 肘点位于以肩为心、$L_1$ 为半径的**球面**上

三者的交集一般是一条**曲线**（或多个解），而非唯一点。

## 对遥操设计的启示

正是这个"欠定"性，决定了纯姿态 IMU 方案必须叠加更多约束才能定位：[宇树遥操系统](/projects/1_unitree_g1_teleop/) 在大臂与小臂各放一个 IMU（给出两段方向）、用固定臂长做正运动学、并用一次侧平举校准对齐坐标系——把"一族解"收敛到唯一解。而 [ORB-SLAM3 方案](/projects/2_orbslam3_pose/) 则用视觉特征直接给出全局位置，绕开了这个欠定性。两种思路的精度差异见两项目的交叉对比。
