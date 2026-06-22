---
layout: page
title: PCB 焊垫热传导特性研究
description: 数学物理方法课程综合项目 · PDE 建模 + FEM + ANSYS + 实测 · 7 章 3229 行文档
img: assets/img/projects/09_pcb_via_3d.png
importance: 9
category: research
related_publications: false
---

数学物理方法课程综合项目（独立完成）。围绕**热孔（thermal via）对 PCB 焊垫升温速率的影响**展开，建立偏微分方程模型，数值仿真与实物实验相互验证，产出 7 章共 **3229 行 Markdown**、9 个实验数据文件。

### 研究方法

- **PDE 建模**：建立焊垫热传导方程，考虑铜层、FR4、热孔三维结构
- **Python FEM**：自研有限元数值求解，参数化扫描热孔数量/孔径/分布
- **ANSYS 仿真**：商业有限元交叉验证
- **实物实验**：STM32 + Pt100 + MAX31865 高精度温度采集，对比仿真结果

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/09_pcb_via_3d.png" title="热孔 3D 模型" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/10_ansys_model.png" title="ANSYS 仿真" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：含热孔的 PCB 焊垫三维模型；右：ANSYS 稳态热仿真。</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/11_thermal_fitting.png" title="曲线拟合" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">实测升温曲线与一阶/二阶热模型拟合对比。</div>

> 技术栈：PDE 建模 · Python FEM · ANSYS · STM32 · Pt100 + MAX31865
