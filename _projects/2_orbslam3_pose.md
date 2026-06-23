---
layout: page
title: ORB-SLAM3 末端位姿评估系统
description: 与遥操系统配套的交叉验证真值系统 · RealSense D435i + ORB-SLAM3 · 静态 0.37 mm
img: assets/img/projects/08_slam_trajectory.png
importance: 2
category: robotics
related_publications: false
---

将 Intel RealSense D435i 安装于操作者前臂，利用 ORB-SLAM3 的 **IMU_STEREO** 模式实时估计末端位姿，作为独立的外部真值参考，与 [宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/) 的双 IMU 正运动学方案进行**交叉精度对比**——用高精度视觉惯性参照，量化低成本纯 IMU 方案的误差边界。独立完成 ORB-SLAM3 编译标定、评估工具开发与五类量化评估。

- **传感器**：D435i 立体相机（双目 848×480 @ 30 fps）+ 板载 BMI055 IMU @ 200 Hz
- **算法**：ORB-SLAM3 IMU_STEREO 模式，视觉惯性联合优化，实时输出 SE3 位姿
- **评估工具**：自研 `eval_endeffector.py`，实时尾随 SLAM 输出的 CSV 位姿流，自动分割静止段、做球面/椭圆拟合与圆周统计

### 五类量化评估（独立设计）

| 测试项目 | 核心指标 | SLAM 实测 | 精度等级 |
|---------|---------|------|------|
| 静态噪声 | σ_3D_RMS | **0.373 mm** | 亚毫米级 |
| 长度约束一致性 | σ_radial | 23.5 mm（4.9%） | 厘米级 |
| 固定点重复性 | σ_RMS | 9.2 mm | 厘米级 |
| 轨迹一致性 | σ_residual | 21.9 mm（平面 RMS 6.48 mm） | 厘米级 |
| 姿态一致性 | σ_Roll/Pitch/Yaw | 1.20° / 0.25° / 0.97° | 度级 |

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/06_slam_static_noise.png" title="静态噪声" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/07_slam_length_constraint.png" title="长度约束" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/08_slam_trajectory.png" title="轨迹一致性" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：静态噪声三维分布（Z 轴略大，符合立体视觉深度精度低于横向的特点）；中：长度约束球面拟合（自动估计肩关节与臂长）；右：轨迹椭圆拟合（依角度覆盖率自动选 PCA / 代数拟合）。</div>

### 与双 IMU 正运动学方案的交叉对比（核心产出）

本项目最大的价值不是单方面精度，而是作为**独立真值**与低成本的纯 IMU 方案逐项对比，从而划清两种技术路线的适用边界：

| 指标 | ORB-SLAM3 | 双 IMU 正运动学 | 胜出 |
|------|-----------|----------------|------|
| 静态噪声 σ_3D_RMS | 0.373 mm | 3.83 mm | **SLAM ≈10×** |
| 长度约束 σ_radial | 23.5 mm | 0.40 mm | **IMU ≈59×**（结构性优势） |
| 固定点重复性 σ_RMS | 9.2 mm | 13.9 mm | **SLAM ≈1.5×** |
| 轨迹平面 RMS | 6.48 mm | 8.83 mm | SLAM 略优 |

**结论：两方案强互补**。SLAM 静态精度压倒（视觉特征锁定、无姿态漂移经臂长放大），IMU 方案几何一致性近乎完美（固定臂长参数带来的结构性优势，并非绝对定位更高）；SLAM 依赖环境纹理与 GPU 工作站，IMU 方案嵌入式友好、不依赖光照。理想架构是**视觉 SLAM 提供全局位置锚点 + IMU 保证高频低延迟的关节姿态**。

> 技术栈：C++ · ORB-SLAM3 · RealSense D435i · Python · matplotlib ｜ 关联：[宇树 G1 遥操系统](/projects/1_unitree_g1_teleop/)（被验证方）
