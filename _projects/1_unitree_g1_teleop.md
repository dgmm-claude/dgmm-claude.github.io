---
layout: page
title: 宇树 G1 上肢 IMU 遥操系统
description: 国家级重大项目（在申）· VQF 九轴姿态融合 + 逆运动学，静态精度 3.83 mm
img: assets/img/projects/04_g1_robot.png
importance: 1
category: robotics
related_publications: false
---

在人体大臂和小臂上各固定一个 WT901C485 九轴 IMU，通过 VQF 姿态融合获取四元数，经 3 秒侧平举校准后映射为宇树 G1 机器人右臂 4 个关节角度（shoulder_pitch / shoulder_roll / shoulder_yaw / elbow），实现实时遥操控制。约 **5000 行核心代码**，11 篇技术文档。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/01_system_architecture.png" title="系统三层架构" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">传感器层 — 核心解算层 — 应用层的三层分层架构，数据从原始 IMU 到机器人关节角度经历 7 个处理阶段。</div>

### 关键技术

- **VQF 九轴姿态融合**：替代传统 Madgwick/Mahony 滤波，倾斜与航向通道分离估计、自适应加速度计修正、陀螺仪零偏在线补偿、磁场异常自适应拒绝。
- **一次性侧平举校准**：3 秒同时完成航向校准、安装倾斜矫正、IK 解算标定三项补偿，数据持久化为 JSON。
- **混合解析-优化逆运动学**：YXZ 分解解析解（毫秒级）+ L-BFGS-B 带边界约束优化 + 多起点搜索 + 限位内最优拟合，超限时误差改善 26%~50%。
- **多坐标系统一管理**：6 个坐标系严格定义，基于旋转矩阵 Frobenius 内积回避四元数符号歧义，7 个单元测试覆盖全链路自洽性。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/05_imu_circle_eval.png" title="画圆测试诊断" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">画圆测试四项诊断：拟合圆 R=30.8 mm，平面 RMS=8.83 mm。</div>

### 精度评估（独立设计六类测试）

| 测试项目 | 核心指标 | 结果 |
|---------|---------|------|
| 静态噪声 | σ_3D_RMS | **3.83 mm** |
| 手臂长度约束 | σ_radial | **0.40 mm** |
| 固定点重复性 | σ_RMS | 13.9 mm |
| 圆弧轨迹一致性 | 相对误差 | 33.3% |

> 技术栈：Python · VQF · Modbus RTU · OpenGL · PyBullet · UDP ｜ 硬件：宇树 G1 + 2× WT901C485 九轴 IMU
