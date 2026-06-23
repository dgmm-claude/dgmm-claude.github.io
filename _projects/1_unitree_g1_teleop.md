---
layout: page
title: 宇树 G1 上肢 IMU 遥操系统
description: 面向宇树 G1 上肢的可穿戴多 IMU 遥操 · 校准 + 解析逆运动学 + 构型感知安全约束
img: assets/img/projects/04_g1_robot.png
importance: 1
category: 研究主线
related_publications: false
---

面向宇树 G1 人形机器人上肢的可穿戴 IMU 遥操，沿「感知—估计—控制—安全」闭环推进。

- **研究问题**：可穿戴 IMU 遥操受安装不确定性、长期漂移、关节耦合与自碰撞风险困扰。
- **方法**：VQF 九轴融合 → 一次性侧平举校准 → 解析逆运动学 → Isaac Lab 贝叶斯优化整定 PD → 构型相关动态关节限位。
- **证据**：静态 RMS **3.83 mm**、**448 次**仿真试验、**2 项**发明专利交底书。

**版本演进**

- **v1（2025.12–2026.03）**：双 IMU 驱动右臂 4 自由度。
- **v2（2026.04–至今）**：五无线 IMU 驱动双臂 10 关节，含校准与安全约束。

> 这是我的主线研究项目。其**感知层**采用自研的 [ESP32-C3 + ICM-20948 无线 IMU 节点](/projects/6_wireless_imu/)（已替代 WT901C485 成品模块，硬件/固件/上位机全开源），其**精度评估**与 [ORB-SLAM3 末端位姿评估系统](/projects/2_orbslam3_pose/) 互为交叉验证。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/01_system_architecture.png" title="系统三层架构" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">传感器层 — 核心解算层 — 应用层的三层分层架构，数据从原始 IMU 到机器人关节角度经历 7 个处理阶段。</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video controls muted playsinline preload="metadata" class="img-fluid rounded z-depth-1" style="width:100%;">
            <source src="/assets/video/unitree_teleop_demo.mp4" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">G1 右臂实机遥操演示：操作者手臂姿态经 VQF 融合 + 逆运动学，实时映射为机器人关节角。</div>

## 关键技术

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

## 精度评估（四类测试）

| 测试项目 | 核心指标 | 结果 |
|---------|---------|------|
| 静态噪声 | σ_3D_RMS | **3.83 mm** |
| 手臂长度约束 | σ_radial | **0.40 mm** |
| 固定点重复性 | σ_RMS | 13.9 mm |
| 圆弧轨迹一致性 | 相对误差 | 33.3% |

该精度数据另由 [ORB-SLAM3 视觉惯性系统](/projects/2_orbslam3_pose/) 作为独立视觉惯性参考交叉验证，以量化纯 IMU 方案的误差边界。

## 控制参数整定：Isaac Lab 贝叶斯优化

实机遥操中，`shoulder_yaw` 关节动态跟踪误差明显偏大。我没有手工试凑 PD 参数，而是在 **NVIDIA Isaac Lab** 中搭建了一套**可复现的参数搜索流程**，用贝叶斯优化自动寻找 14 个上肢关节的 Kp/Kd 初值：

- **仿真环境**：Isaac Sim 5.1 + PhysX 隐式驱动，G1 29-DoF URDF 固定基座，腿/腰锁定，逐关节施加**阶跃 + 多频正弦扫频（0.2–2.0 Hz）**测试轨迹；
- **优化算法**：自研贝叶斯优化（高斯过程 + 期望改进 GP+EI），纯 numpy+scipy 实现，**28 维搜索空间**（14 关节 × {Kp, Kd}）；
- **规模**：每关节每轨迹 16 次迭代（5 随机 + 11 贝叶斯），**共 448 次仿真试验**，RTX 3060 约 30 分钟跑完。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/58_bo_convergence.png" title="贝叶斯优化收敛曲线" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/59_pd_before_after.png" title="默认 vs 优化 PD 参数" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：各关节 best-so-far 代价收敛曲线；右：右臂关键关节默认 PD 与优化 PD 的棒棒糖对比。</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video controls muted playsinline preload="metadata" class="img-fluid rounded z-depth-1" style="width:100%;">
            <source src="/assets/video/unitree_pybullet_sim.mp4" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">PyBullet 仿真环境中的右臂轨迹跟踪：贝叶斯优化得到的 PD 参数在此评估。</div>

**Sim-to-Real 结论**（诚实的说，sim2real gap依旧较大）：

1. **仿真内有效**：肩 pitch / 肘 / 腕关节仿真跟踪 RMSE 普遍降到 0.3°–0.7°；但 **shoulder_yaw 仍是瓶颈（1.5°–3.2°）**——它承受最大重力力矩且存在关节耦合。
2. **Sim-to-Real Gap 显著**：实机 RMSE 是仿真的 **5–10 倍**。
3. **速度前馈实机失效**：v3 优化加入的速度前馈项在实机上引发严重振荡，被弃用。
4. **最终参数来源**：最终上机电机的 PD 参数，是在仿真初值基础上经 **4 轮实机调试**确定——仿真负责**缩小搜索空间**，实机日志决定**最终取值**。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/61_sim_to_real_gap.png" title="仿真 vs 实机 RMSE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">各关节仿真 RMSE 与实机 RMSE 对比斜率图：可见两者量级差异与哪些关节迁移有效。</div>

## 运行安全：从"硬件保护"异常到动态限位

实机长时间遥操中，G1 右臂会偶发**硬件保护**——电机进入阻尼态、滑落回零、数秒后自恢复。我将其作为一个独立的工程诊断问题系统化解决：

- **异常识别**：用右臂总电机误差的峰值（峰值×0.3 为阈值、持续 >5 s）从遥操日志中自动标定异常时段；两段典型异常分别持续 **7.2 s / 8.2 s**，峰值误差 **2.01 rad / 1.56 rad**。
- **归因分析**：逐关节误差贡献分解，**肘部电机是主导贡献者（40%–61%）**，符合直觉。
- **根因定位**：结合 PyBullet 异常时段运动复现 + 机器人胸口刮痕物证，确认是**夹肘姿态下大臂已撞机械限位、但尚未触及软件限位**（软件限位取的是各姿态可达范围的并集），操作员继续夹肘即触发硬件保护。
- **修复方案**：设计**依赖其他关节角的动态软件限位函数**，对大臂 yaw 等操作者不易感知碰撞的危险关节按姿态动态收紧限位。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/60_anomaly_detection.png" title="异常时段检测" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">从总误差曲线自动标定的异常时段（红区），肘部电机贡献主导，与 PyBullet 复现的夹肘撞击吻合。</div>

> 详见技术笔记：[实机遥操中的"硬件保护"异常诊断](/blog/2026/unitree-g1-hardware-protection-anomaly/)、[人形机器人自碰撞避免论文阅读](/blog/2026/humanoid-self-collision-avoidance/)。

## 成果产出

- **发明专利交底书 ×2**（已提交）：
  - 《基于多节点无线 IMU 的机器人上肢遥操作解算方法及系统》——感知与解算主线；
  - 《基于多 IMU 遥操作的人形机器人上肢关节目标安全生成与动态限位控制方法及系统》——运行安全主线。

> 技术栈：Python · VQF · Isaac Lab / PyBullet · 贝叶斯优化(GP+EI) · OpenGL · WiFi/UDP ｜ 硬件：宇树 G1 + 2× 自研 [ESP32-C3 + ICM-20948 无线 IMU 节点](/projects/6_wireless_imu/)（已替代 WT901C485 成品模块）
