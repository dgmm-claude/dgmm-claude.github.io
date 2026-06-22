---
layout: page
title: ORB-SLAM3 末端位姿评估系统
description: 与遥操系统配套的交叉验证真值系统 · RealSense D435i + ORB-SLAM3
img: assets/img/projects/08_slam_trajectory.png
importance: 2
category: robotics
related_publications: false
---

将 Intel RealSense D435i 安装于操作者前臂，利用 ORB-SLAM3 的 IMU_STEREO 模式实时估计末端位姿，作为独立的外部真值参考，与项目一的双 IMU 正运动学方案进行**交叉精度对比**。独立完成全部搭建与评估。

- **传感器**：D435i 立体相机（双目 848×480 @ 30 fps）+ 板载 BMI055 IMU @ 200 Hz
- **算法**：ORB-SLAM3 IMU_STEREO 模式，视觉惯性联合优化，实时输出 SE3 位姿
- **评估方法**：静态噪声测试、手臂长度约束（径向漂移）、轨迹一致性三类量化指标
- **工程价值**：为低成本的纯 IMU 方案提供高精度视觉惯性参照，量化系统误差边界

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/06_slam_static_noise.png" title="静态噪声" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/07_slam_length_constraint.png" title="长度约束" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：静态位姿噪声分布；右：手臂长度约束下的径向漂移评估。</div>

> 技术栈：C++ · ORB-SLAM3 · RealSense D435i · Python · matplotlib
