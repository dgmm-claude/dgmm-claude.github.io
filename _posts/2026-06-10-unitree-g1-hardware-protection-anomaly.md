---
layout: post
featured: true
title: "实机遥操中的「硬件保护」异常诊断"
date: 2026-06-10 21:00:00 +0800
description: 宇树 G1 右臂偶发硬件保护——从总电机误差曲线自动标定异常、逐关节归因、PyBullet 复现定位根因，到动态限位修复。
tags: 机器人 宇树G1 遥操 异常检测 PyBullet
categories: 工程实践
_styles: ".post-content img, #markdown-content img { max-width: 100%; height: auto; display: block; margin: 1.5em auto; border-radius: 0.375rem; } .post-content figure, #markdown-content figure { margin: 1.5em 0; text-align: center; }"
---

> 这是 [宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/) 的一个工程诊断子问题：实机长时间遥操时右臂会偶发"硬件保护"，本文记录从**现象 → 数据 → 归因 → 复现 → 修复**的完整排查过程。

## Part 1 · 现象与异常识别

在做右臂抓取任务时，我发现右臂有时会进入**硬件保护**状态：电机呈现阻尼态、滑落回初始位置（像没上电一样），过几秒后自动恢复，期间不响应任何操作指令。和 GPT 讨论后，初步判断这与电机撞到限位、触发大电流保护有关。

既然保护期间机械臂不响应指令，**总电机误差**就应该能反映保护是否发生。我让程序打印右臂总误差随时间的变化，下面两张图都能明显看到异常——一个误差峰值，且维持了一段时间，符合"进入保护—持续—恢复"的特征。

![异常段总误差曲线 1](/assets/img/posts/unitree_anomaly_err_1.png){:width="100%"}

![异常段总误差曲线 2](/assets/img/posts/unitree_anomaly_err_2.png){:width="100%"}

**自动标定规则**：以总误差峰值乘以 0.3 作为异常起点、回落到峰值乘以 0.3 作为结束点；若整段持续时间大于 5 s，则判定为一次异常事件。

## Part 2 · 逐关节归因

对异常时段内**各电机对总误差的贡献**做分解，两段典型异常的指标如下。

**异常段 A**（`traj_log_20260610_115725`）——持续 **7.2 s**，峰值 **2.01 rad**：

| 指标 | 数值 |
|---|---|
| 异常时段 | 78.6 s ~ 85.8 s，持续 **7.2 秒** |
| 峰值误差 | **2.0079 rad**（81.8 s） |
| 高位持续 | 79.6 s ~ 84.8 s，误差 > 1.0 rad 持续 **5.2 秒** |
| 段内均值 | 1.4094 rad |

| 关节 | 异常段均值 | 正常时的倍数 | 贡献占比 |
| --- | ---: | ---: | ---: |
| 右肩偏航 `r_sy` | 0.347 rad | **10.4×** | 25% |
| 右肘 `r_el` | 0.560 rad | **8.9×** | **40%** ← 最大 |
| 右肩横滚 `r_sr` | 0.303 rad | **6.8×** | 21% |
| 右腕旋转 `r_wr` | 0.124 rad | 3.0× | 9% |
| 右肩俯仰 `r_sp` | 0.080 rad | 1.6× | 6% |

**异常段 B**（`traj_log_20260610_150653`）——持续 **8.2 s**，峰值 **1.56 rad**：

| 指标 | 数值 |
|---|---|
| 异常时段 | 101.9 s ~ 110.2 s，持续 **8.2 秒** |
| 峰值误差 | **1.5569 rad**（106.3 s） |
| 高位持续 | 误差 > 0.778 rad 持续 **7.3 秒** |
| 段内均值 | 1.2171 rad |

| 关节 | 异常段均值 | 正常时的倍数 | 贡献占比 |
| --- | ---: | ---: | ---: |
| 右肘 `r_el` | 0.743 rad | 6.4× | **61%** ← 绝对主导 |
| 右肩偏航 `r_sy` | 0.143 rad | 4.9× | 12% |
| 右肩俯仰 `r_sp` | 0.160 rad | 2.7× | 13% |
| 右腕旋转 `r_wr` | 0.089 rad | 3.7× | 7% |
| 右肩横滚 `r_sr` | 0.079 rad | 2.3× | 6% |

两段异常中**肘部电机都是误差的主导贡献者**，这符合直觉。

## Part 3 · PyBullet 复现定位根因

为验证异常识别正确，我在 PyBullet 中把异常发生前后 ±5 秒的右臂运动完整复现出来，可以清楚看到异常的全过程。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video controls muted playsinline preload="metadata" class="img-fluid rounded z-depth-1" style="width:100%;">
            <source src="/assets/video/unitree_anomaly_replay_1.mp4" type="video/mp4">
        </video>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <video controls muted playsinline preload="metadata" class="img-fluid rounded z-depth-1" style="width:100%;">
            <source src="/assets/video/unitree_anomaly_replay_2.mp4" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">左：异常段 A（115725）PyBullet 复现；右：异常段 B（150653）复现——均可见夹肘时大臂撞向胸口的过程。</div>

逐帧查看复现视频，发现两次异常发生时**机器人都呈现"夹肘"姿态（大臂撞到胸口）**；再用机器人自身的损伤痕迹交叉印证——胸口出现明显刮伤，正是大臂电机所伤。

由此初步确定进入保护的因果链：

> 在当前姿态下机器人夹肘、大臂**已经撞到机械限位**，但此时**尚未达到软件限位**（不同姿态下可运动角度范围不同，而我当时用的软件限位是所有姿态下可达范围的并集，偏宽松）。操作员继续夹肘，于是触发硬件保护——推测为过流保护（宇树未开放电机底层接口，无法直接记录电流，故暂无直接证据）。

## Part 4 · 修复方向：动态软件限位

根因明确后，修复思路是让软件限位**随姿态动态收紧**：对大臂 yaw 等"操作者不易感知碰撞"的危险关节，依据其他关节的当前角度计算其真实可达范围，在该范围内施加限位，从而在撞上机械限位之前就截断目标角。

这部分已凝练为一项发明专利交底书《基于多 IMU 遥操作的人形机器人上肢关节目标安全生成与动态限位控制方法及系统》，相关论文调研见 [人形机器人自碰撞避免论文阅读](/blog/2026/humanoid-self-collision-avoidance/)。
