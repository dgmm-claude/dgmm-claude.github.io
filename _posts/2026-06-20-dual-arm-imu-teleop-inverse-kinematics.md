---
layout: post
featured: true
title: "Inverse Kinematics for Dual-Arm IMU Teleoperation: 4-Step Calibration to Analytical 5-DoF Solutions"
date: 2026-06-20 21:00:00 +0800
description: "The core algorithm of the G1 dual-arm system: turning five wireless-IMU quaternions into 10 robot joint angles in real time. A three-stage pipeline — offline 4-step calibration (Procrustes alignment with SVD plus roll-axis refinement), online incremental tracking that cancels absolute IMU drift, and an analytical IK that decouples rotation axes (Y-component gives shoulder roll, XZ gives pitch; Z gives elbow, XY gives yaw; palm gives wrist roll), each step with dual-solution selection and limit clamping. Smoothed by a 3.5 rad/s rate limit and sent over UDP at 50 Hz."
tags: 机器人 逆运动学 IMU 宇树G1 遥操 Procrustes
categories: 技术详解
---

> 这是 [宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/) 的核心算法笔记：如何把 5 个无线 IMU 的四元数，实时变成机器人双臂 10 个关节角。配套数学背景见 [IK 解空间推导](/blog/2026/ik-solution-space-underdetermined/)。

## 目标与三阶段管线

穿戴者佩戴 5 个无线 IMU（胸 + 双大臂 + 双小臂），实时驱动 G1 双臂。管线分三阶段：

```
IMU 原始四元数
   │
   ▼  阶段一：校准（离线 4 步） → R_align, arm_body_dir
   ▼  阶段二：方向重建（实时） → 胸体坐标系下的方向向量
   ▼  阶段三：解析 IK（实时）  → URDF 关节角 SP/SR/SY/EL/WR
```

## 阶段一：4 步校准 + Procrustes 对齐

校准用于消除 IMU 佩戴的随意性。每臂独立，按 `C` 键依次摆 4 个姿态：

| 步骤 | 姿态 | 已知方向 |
|------|------|---------|
| 1 | 自然下垂 | [0, 0, −1] |
| 2 | 前平举 | [1, 0, 0] |
| 3 | 侧平举（掌心朝下） | [0, ±1, 0] |
| 4 | 绕手臂长轴缓慢旋转（Roll） | 提取骨骼方向 |

**步骤 1–3** 求解 IMU 局部帧到胸体坐标系的旋转 $R_{\text{align}}$——这是一个 **Procrustes 问题**：3 组"观测方向 ↔ 真值方向"对应，用 SVD 求最优旋转

$$M = V_{\text{真值}}\,U_{\text{观测}}^{\mathsf{T}},\quad M = W\Sigma V^{\mathsf{T}},\quad R_{\text{align}} = W\,\mathrm{diag}(1,1,\det(WV^{\mathsf{T}}))\,V^{\mathsf{T}}$$

由于骨骼方向 `arm_body_dir` 未知，需**迭代**：固定 `arm_body_dir` 求 $R_{\text{align}}$，再固定 $R_{\text{align}}$ 反推 `arm_body_dir`，至收敛。

**步骤 4（Roll）** 精修：绕手臂长轴旋转时，帧间四元数变化的旋转轴就是骨骼方向，加权平均后混入 Procrustes 约束——3 个方向约束不够，Roll 数据补上第 4 个。

## 阶段二：增量跟踪，消除 IMU 绝对漂移

无线 IMU 的绝对方向有缓慢漂移，直接用 $q_{\text{rel}}=\mathrm{conj}(q_{\text{chest}})\otimes q_{\text{link}}$ 会累积漂移。解法是**增量式累积**：

- 每帧只算微小增量 $dq_c=\mathrm{conj}(q_{\text{chest,prev}})\otimes q_{\text{chest}}$，$dq_l$ 同理
- 累积更新 $q_{\text{rel}}^{inc} \leftarrow \mathrm{conj}(dq_c)\,q_{\text{rel}}^{inc}\,dq_l$

短时增量里漂移影响极小。帧间变化超阈值（0.5 rad）则回退绝对值（防 IMU 重连异常）。

方向重建：$\mathbf{d}_{\text{chest}} = R_{\text{align}}\,\mathrm{quat\_rotate}(q_{\text{rel}}^{inc},\,\mathbf{arm\_body\_dir})$。

## 阶段三：分离旋转轴的解析 IK

每臂 5 自由度：Shoulder Pitch / Roll / Yaw、Elbow、Wrist Roll。关键是**利用旋转链结构，分离各轴贡献，逐个解析求解**：

**上臂方向 → SP / SR**。肩部链 $R=R_x(\text{origin})\,R_y(\text{SP})\,R_x(\text{SR})$。由于 $R_y$ 不影响 Y 分量，**Y 分量只由 SR 决定** → 解三角方程得两个候选 SR，按关节限位选最优；再由 XZ 分量求 SP。

**前臂方向 → SY / EL**。同理，肩后链 $R_z(\text{SY})\,R_y(\text{EL})$ 中 **Z 分量只由 EL 决定** → 求 EL；再由 XY 求 SY。

**掌心朝向 → WR**。把掌心向量转到腕关节局部帧，$\text{WR}=\mathrm{atan2}(p_z, p_y)-\text{wr\_ref}$。

每步都做：**双解选择 → 关节限位 clamp → 连续性处理（防 2π 跳变）**。G1 右臂限位：SP [−177°, 153°]、SR [−129°, 91°]、SY ±150°、EL [−60°, 120°]、WR ±113°。

## 平滑与发送

解算角不能直接发电机——IMU 噪声会导致电机突跳。**限速平滑** 3.5 rad/s（50 Hz 下每帧 ≤4°），用户停止跟随时以 0.5 rad/s 缓慢回零。UDP 50 Hz 发送 10 个 float（双臂各 SP/SR/SY/EL/WR）到机器人端。

> 关联项目：[宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/)；感知节点见 [ESP32 无线 IMU 节点](/projects/6_wireless_imu/)。
