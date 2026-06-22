---
layout: page
title: 视觉精确制导飞行系统
description: 第十九届国家级大学生创新训练项目（主持）· 结题优秀 · 命中精度提升 42.3%
img: assets/img/projects/40_guidance_vision_pcb.png
importance: 3
category: robotics
related_publications: false
---

第十九届**国家级大学生创新训练项目**，本人担任主持人，结题成绩**优秀**。研究基于视觉的精确制导飞行系统，负责视觉上位机软件、视觉上位机硬件（PCB）制作、实验测试与项目进度推进。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/52_guidance_exp_chart_embed.png" title="实验结果" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/41_guochuang_excellent_certificate.png" title="结题优秀证书" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：双级制导实验命中精度对比；右：国家级结题优秀证书。</div>

### 系统构成

- **上位机**：NUC + 工业相机，运行视觉制导算法
- **机载视觉**：OpenMV 进行目标识别与跟踪
- **飞控**：STM32H7 + 九轴 IMU 实时姿态解算与控制
- **执行机构**：摩擦轮发射机构实现精确投放
- **双级制导**：粗级（上位机全局定位）+ 精级（机载视觉末端修正）两级闭环

### 核心成果

- 🎯 命中精度相对单级方案**提升 42.3%**
- 🏆 国创结题评定**优秀**（项目编号 202510611294）
- 🔧 独立完成视觉上位机 PCB 设计与制板

> 技术栈：NUC · 工业相机 · OpenMV · STM32H7 · 九轴 IMU · 摩擦轮发射
