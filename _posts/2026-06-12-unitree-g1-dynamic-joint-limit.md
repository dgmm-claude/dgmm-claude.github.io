---
layout: post
title: "Configuration-Aware Dynamic Joint Limits for Safe Teleoperation"
date: 2026-06-12 21:00:00 +0800
description: "The fix for the G1 hardware-protection anomaly: instead of a fixed software limit (the union of all reachable ranges — too loose), the limit becomes a function of the other joint angles. Dangerous joints the operator cannot easily feel (e.g. upper-arm yaw) are tightened per configuration, cutting the target angle before the mechanical limit is reached. Collision boundaries are pre-characterized in Isaac Lab / wheel-legged gym and validated on the real robot by creeping to about 0.9 of the limit. Condensed into a patent disclosure; future work extends to full-arm continuous collision-risk modeling."
tags: 机器人 宇树G1 遥操 安全 动态限位
categories: 工程实践
_styles: ".post-content img, #markdown-content img { max-width: 100%; height: auto; display: block; margin: 1.5em auto; border-radius: 0.375rem; } .post-content figure, #markdown-content figure { margin: 1.5em 0; text-align: center; }"
---

> 本文是宇树遥操「异常 trilogy」的第三篇：[第一篇](/blog/2026/unitree-g1-hardware-protection-anomaly/)诊断了硬件保护异常（夹肘撞机械限位），[第二篇](/blog/2026/humanoid-self-collision-avoidance/)调研了自碰撞避免文献。本篇给出工程修复方案。

## 问题回顾

实机遥操中，软件限位取的是"所有姿态下可达范围的**并集**"，偏宽松。后果是：某些姿态下（如夹肘）大臂已经撞上机械限位，但目标角还没触及软件限位，操作员继续动作就触发硬件保护。

![异常时段检测](/assets/img/posts/unitree_anomaly_detail_1.png){:width="95%"}

## 两种修复思路

- **A. 姿态打分函数**：对每个候选姿态打分，靠近目标且处于安全区打高分、危险区打低分，取最高分作为实际输出。缺点：每次执行都要在工作区内搜索，算力要求高。
- **B. 动态限位函数**：让软件限位**依赖其他关节角**——根据当前姿态实时计算该关节的真实可达范围，在撞上机械限位前就截断目标角。

我先实现 B（算力友好）。

## B 方案：依赖关节角的动态限位

核心思想：对大臂 yaw 等"操作者不易感知碰撞"的危险关节，限位不再是固定常数，而是其它关节角的函数

```
limit(joint_i) = f(joint_j, joint_k, ...)
```

在仿真侧（Isaac Lab / wheel-legged gym）预先标定各关节组合下的碰撞边界，重点扫描大臂 yaw 电机的范围（其它电机一旦碰撞，操作者容易感知，暂不优先处理）。

## 实机验证

验证方法：让机器人**缓动到限位位置附近（约 0.9 倍处）**，实地查看并微调间隙——确认动态限位在撞上机械限位前确实截断，同时不误伤正常动作空间。

## 产出与后续

这部分已凝练为发明专利交底书《基于多 IMU 遥操作的人形机器人上肢关节目标安全生成与动态限位控制方法及系统》。当前方案采用保守的构型相关限位机制（仅扫描大臂、以截断防撞）；后续将扩展至全臂连续碰撞风险建模（见 [自碰撞避免论文阅读](/blog/2026/humanoid-self-collision-avoidance/)）。

> 关联项目：[宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/)。
