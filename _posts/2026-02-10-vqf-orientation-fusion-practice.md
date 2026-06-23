---
layout: post
featured: true
title: "VQF 9-Axis Attitude Fusion in Practice"
date: 2026-02-10 21:00:00 +0800
description: "Why the teleoperation system chose VQF over Madgwick/Mahony: decoupled inclination/heading estimation, the physical meaning of the time constants tau_acc and tau_mag, online gyroscope-bias compensation, and adaptive magnetic-disturbance rejection. VQF estimates inclination using only the accelerometer (low-pass filtered, parameterized by tau_acc) and heading using only the magnetometer horizontal projection, so the magnetometer never contaminates inclination. Engineering notes: ICM-20948 at 225 Hz with local real-time solving, runtime ellipsoidal magnetometer calibration stored in NVS, and a 6-axis fallback mode."
tags: IMU VQF 姿态融合 滤波 宇树G1
categories: 技术详解
---

> [宇树 G1 遥操系统](/projects/1_unitree_g1_teleop/) 与 [ESP32 无线 IMU 节点](/projects/6_wireless_imu/) 的姿态融合都用 VQF。本文记录选型理由与工程要点，源自 VQF 原始论文的阅读笔记。

## 为什么选 VQF

传统 Madgwick / Mahony 把加速度计、磁力计放进同一个梯度下降里一起矫正，有两个痛点：磁力计的水平分量被误用来矫正倾斜、加速度计的动态扰动污染航向。VQF（Versatile Quaternion-based Filter）的核心改进是**倾斜与航向分离估计**：

- **倾斜（重力方向）**：只用加速度计矫正，在一个"几乎惯性"的倾斜参考系里
- **航向（绕重力轴的旋转）**：只用磁力计的水平投影矫正，不污染倾斜

两个通道独立、各自带时间常数，物理意义清晰。

## 倾斜通道：加速度计低通矫正

对加速度做低通滤波（截止频率代表对加速度计的置信度），估计重力方向，再以固定增益矫正倾斜四元数。矫正旋转轴取自当前估计与重力反方向的叉积——关键是这一步在**倾斜参考系**里做，矫正后能精确指向重力反方向。

低通滤波用二阶 Butterworth，参数化为时间常数 $\tau_{\text{acc}}$：

$$f_c = \frac{1}{2\pi\,\tau_{\text{acc}}}$$

$\tau_{\text{acc}}$ 的物理意义：**多长时间内信任加速度计**。$\tau$ 越大，加速度计矫正越慢（更信任陀螺短期积分）；越小，越快跟随加速度计。

## 航向通道：磁力计水平投影

磁力计不能直接用于航向——它在世界系下是 3D 向量，本身含倾角信息。VQF 先把磁场投影到水平面，算出航向偏差，再用固定增益修正航向。增益同样参数化为时间常数 $\tau_{\text{mag}}$（磁力计融合有多慢）。

这样磁力计**只影响航向，不污染倾斜**。

## 陀螺零偏在线补偿

陀螺零偏会随温度 / 时间漂移，导致姿态长期漂移。VQF 在静止 / 缓动段从加速度计与磁力计的矫正残差里**在线估计陀螺零偏**并扣除——这对长时间遥操至关重要。

## 工程实践要点

- **采样率**：ICM-20948 @ 225 Hz，节点本地实时解算后上传四元数（不在上位机算）
- **磁力计校准**：运行时椭球校准并存 NVS（硬铁 / 软铁补偿），否则航向会被环境磁场带偏
- **磁场异常拒绝**：VQF 自带磁力计异常自适应拒绝，遇到铁磁扰动时不盲从
- **6 轴降级**：无磁力计场景可切 VQF 6D（仅倾斜，航向漂移），用于排查磁力计影响

## 与传统滤波的取舍

| 维度 | VQF | Madgwick / Mahony |
|------|-----|-------------------|
| 倾斜 / 航向 | 分离估计 | 耦合 |
| 磁力计 | 仅航向，自适应拒绝 | 易污染倾斜 |
| 参数 | 物理时间常数 τ | 增益 β，调参偏经验 |
| 陀螺零偏 | 在线补偿 | 通常需外挂 |

> 关联：[ESP32 无线 IMU 节点](/projects/6_wireless_imu/)（VQF 在 ESP32-C3 上本地运行）、[宇树 G1 遥操系统](/projects/1_unitree_g1_teleop/)。
