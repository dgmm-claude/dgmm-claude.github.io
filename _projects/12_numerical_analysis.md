---
layout: page
title: "Numerical Analysis: Root-Finding and Structural Modes"
description: "Numerical analysis course · nonlinear root-finding (bisection/Newton/GA/PSO) + multi-DOF modal and seismic response (SOR/inverse-power/RK4)"
img: assets/img/projects/62_numerical_convergence.png
importance: 12
category: Coursework
related_publications: false
---

> **English summary:** A numerical-analysis course project with two assignments on one physical system. (1) Nonlinear root-finding — comparing bisection, Newton, and meta-heuristics (GA, PSO) for convergence and global search. (2) A full static-modes-seismic pipeline on a five-story shear-type building: linear systems by SOR (optimal ω≈1.65 cuts iterations from 552 to 105), the fundamental frequency by inverse power iteration in 8 steps (1.334 Hz), the first mode carrying 84.7% effective mass, and seismic response by RK4 with 0.13 mm displacement error. Links SOR convergence, eigenvalue methods, and RK4 integration on one model.

工程数值分析课程的两个大作业，覆盖**非线性方程求根**与**结构动力学模态分析 + 地震响应**两条主线，综合运用迭代法、特征值方法与 ODE 数值积分，对同一物理系统做多层数值研究。

### 大作业一：非线性方程求根

对比二分法、牛顿法、遗传算法（GA）、粒子群（PSO）等的收敛性与全局寻优能力：遗传 / 粒子群提供全局搜索以规避牛顿法的局部收敛；SOR 类迭代经松弛因子调优后收敛速度显著优于 Jacobi。

### 大作业二：多自由度结构模态 + 地震响应

以五层剪切型建筑为对象，完成「静力分析 → 模态分析 → 地震动力响应」完整分析链：

| 环节 | 方法 | 结果 |
|------|------|------|
| 线性方程组 | SOR（ω ≈ 1.65） | Jacobi **552 次 → SOR 105 次**（加速 5.3×） |
| 基频特征值 | 反幂法 | **8 次迭代**得基频 **1.334 Hz** |
| 振型质量 | 广义特征值 | 第一阶贡献 **84.7% 有效质量** |
| 地震响应 | RK4 | 位移误差 **0.13 mm** |

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/62_numerical_convergence.png" title="SOR 收敛" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/63_numerical_ga_pso.png" title="GA/PSO 求根" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：SOR 迭代次数随松弛因子 ω 的 U 型曲线，最优 ω ≈ 1.65；右：遗传算法与粒子群求根对比。</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/64_numerical_ode.png" title="地震响应 RK4" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">RK4 积分五自由度剪切型结构的地震动力响应。</div>

> 技术栈：Python · numpy/scipy · matplotlib · SOR · 反幂法 · Runge-Kutta ｜ 关联：[PCB 焊垫热传导研究](/projects/9_pcb_thermal/)（数值方法同源）｜ 详解：[多自由度结构模态分析与地震响应](/blog/2026/modal-analysis-seismic-response/)
