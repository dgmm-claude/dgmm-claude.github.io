---
layout: page
title: "PCB Pad Thermal-Conduction Study"
description: "Math-physics methods course project · PDE modeling + custom FEM + ANSYS + measurement · thermal vias cut the time constant 5.5x"
img: assets/img/projects/09_pcb_via_3d.png
importance: 9
category: Selected Engineering
related_publications: false
---

数学物理方法课程综合项目（独立完成）。围绕**热孔（thermal via）对 PCB 焊盘升温速率的影响**展开，建立偏微分方程模型，自研有限元求解，并与 ANSYS 商业软件、实物实验三方交叉验证，产出 **7 章 3229 行**技术文档与 9 组实验数据。

### 核心结论

- **热孔显著加速升温**：实测有孔焊盘时间常数 **τ = 8.2 s**，无孔 **45.3 s**，**加速 5.5×**——量化了热孔对散热路径的改善幅度。
- **模型精度高**：双指数热模型拟合 **R² > 0.9999**、简化设计公式 **MAPE < 0.2%**；自研 FEM 与 ANSYS 对标实测，**绝对误差均 < 2%**。
- **实测不确定度**：STM32F103 + Pt100 + MAX31865 高精度温度采集，**±0.27 °C**。

### 研究方法（理论 → 仿真 → 实验闭环）

- **PDE 建模**：焊垫热传导方程，建模铜层 / FR4 / 热孔三维结构，50K 节点 3D 有限元
- **自研 Python FEM**：参数化扫描热孔数量 / 孔径 / 分布，输出瞬态升温曲线
- **ANSYS 交叉验证**：商业有限元 Fluent/Mechanical 对标自研求解器
- **实物实验**：STM32F103 + MAX31865 + Pt100 采集 9 组升温曲线，与仿真互证

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/09_pcb_via_3d.png" title="热孔 3D 模型" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/10_ansys_model.png" title="ANSYS 仿真" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：含热孔的 PCB 焊盘三维模型；右：ANSYS 稳态热仿真。</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/11_thermal_fitting.png" title="曲线拟合" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">实测升温曲线与一阶/二阶热模型拟合对比（双指数 R² > 0.9999）。</div>

### 三方交叉验证

| 方法 | 角色 | 与实测偏差 |
|------|------|------|
| 实物实验（Pt100 + 曲线拟合） | 基准（τ = 8.2 s 有孔 / 45.3 s 无孔） | — |
| 自研 Python FEM | 仿真预测 | < 2% |
| ANSYS Fluent/Mechanical | 商业对标 | < 2% |

> 技术栈：PDE 建模 · Python FEM · ANSYS · STM32F103 · Pt100 + MAX31865 ｜ 关联：[工程数值分析](/projects/12_numerical_analysis/)（数值方法同源）
