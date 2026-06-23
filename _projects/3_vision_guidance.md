---
layout: page
title: 视觉精确制导飞行系统
description: 第十九届国家级大学生创新训练项目（主持）· 结题优秀 · 双级制导使命中精度提升 42.3%
img: assets/img/projects/40_guidance_vision_pcb.png
importance: 3
category: 研究主线
related_publications: false
---

第十九届**国家级大学生创新训练项目**，本人担任主持人，结题成绩**优秀**（项目编号 202510611294）。负责视觉上位机软件与硬件（PCB）制作、双级制导算法、实验测试与项目推进。

### 核心成果

- 🎯 双级视觉制导使命中精度相对单级方案**提升 42.3%**
- 🏆 国创结题评定**优秀**
- 🔧 独立完成视觉上位机 PCB 设计与制板

### 双级制导（核心创新）

单级制导的瓶颈在于：上位机全局定位精度高但延迟大，机载视觉响应快但视野有限。本项目用**两级闭环**取两者之长：

- **粗级（上位机全局定位）**：NUC + 工业相机运行视觉制导算法，远距离给出全局目标坐标，把飞行器导入末端区域；
- **精级（机载视觉末端修正）**：OpenMV 在近距识别并跟踪目标，做末端实时修正，补偿粗级延时与飞行扰动；
- **飞控 + 执行**：STM32H7 + 九轴 IMU 实时姿态解算，摩擦轮发射机构精确投放。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/57_guidance_dual_stage_embed.png" title="双级制导流程" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/52_guidance_exp_chart_embed.png" title="命中精度对比" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：双级制导系统流程（粗级全局定位 + 精级末端修正）；右：双级 vs 单级命中精度实验对比。</div>

### 系统构成与实验

- 上位机：NUC + 工业相机；机载：OpenMV；飞控：STM32H7 + 九轴 IMU；执行：摩擦轮发射
- 经多轮迭代调试与外场实验验证

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/51_guidance_exp_scene_embed.png" title="外场实验" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/48_guidance_hw_embed.png" title="视觉上位机硬件" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/41_guochuang_excellent_certificate.png" title="结题优秀证书" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：外场实验场景；中：视觉上位机硬件（独立制板）；右：国家级结题优秀证书。</div>

> 技术栈：NUC · 工业相机 · OpenMV · STM32H7 · 九轴 IMU · 摩擦轮发射 ｜ 关联：[宇树 G1 遥操系统](/projects/1_unitree_g1_teleop/)（同 robotics 类）
