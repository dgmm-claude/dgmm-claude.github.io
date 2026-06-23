---
layout: page
title: "Vision-Based Precision-Guided Flight System"
description: National-level Innovation Training Program (PI) · Excellent conclusion · Two-stage guidance, +42.3% hit accuracy
img: assets/img/projects/40_guidance_vision_pcb.png
importance: 3
category: 研究主线
related_publications: false
---

The 19th **National Innovation Training Program**; I served as PI and the project received an **Excellent** conclusion rating (project no. 202510611294). I was responsible for the vision host software and hardware (PCB), the two-stage guidance algorithm, experiments, and overall progress.

### Key outcomes

- 🎯 Two-stage visual guidance improved hit accuracy by **+42.3%** over a single-stage baseline.
- 🏆 National **Excellent** conclusion.
- 🔧 Independently designed and fabricated the vision host PCB.

### Two-stage guidance (core contribution)

The bottleneck of single-stage guidance: the host computer offers accurate global localization but high latency, while on-board vision responds fast but has a limited field of view. This project combines both via a **two-stage closed loop**:

- **Coarse stage (global localization):** NUC + industrial camera runs the vision-guidance algorithm, providing global target coordinates at long range and steering the aircraft into the terminal zone.
- **Fine stage (on-board terminal correction):** OpenMV identifies and tracks the target at close range, performing real-time terminal correction to compensate for coarse-stage delay and flight disturbance.
- **Flight control + actuation:** STM32H7 + 9-axis IMU real-time attitude estimation; friction-wheel launcher for precise payload delivery.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/57_guidance_dual_stage_embed.png" title="Two-stage pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/52_guidance_exp_chart_embed.png" title="Hit accuracy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Left: two-stage guidance pipeline (coarse global localization + fine terminal correction); right: hit-accuracy comparison, two-stage vs single-stage.</div>

### System & experiments

- Host: NUC + industrial camera; on-board: OpenMV; flight control: STM32H7 + 9-axis IMU; actuation: friction-wheel launcher.
- Iteratively tuned and validated through multiple field experiments.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/51_guidance_exp_scene_embed.png" title="Field experiment" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/48_guidance_hw_embed.png" title="Vision host hardware" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/41_guochuang_excellent_certificate.png" title="Excellent certificate" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Left: field experiment; middle: vision host hardware (self-fabricated PCB); right: National Excellent certificate.</div>

> Tech stack: NUC · industrial camera · OpenMV · STM32H7 · 9-axis IMU · friction-wheel launcher ｜ Related: [Unitree G1 teleoperation](/projects/1_unitree_g1_teleop/) (robotics)
