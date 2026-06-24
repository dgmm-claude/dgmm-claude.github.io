---
layout: page
title: "Vision-Based Dual-Stage Guidance Flight System"
description: National-level Innovation Training Program (PI) · Excellent conclusion · dual-stage visual guidance (launch coarse-aim + onboard fine-guide)
img: assets/img/projects/40_guidance_vision_pcb.png
importance: 3
category: Featured Research
related_publications: false
---

The 19th **National Innovation Training Program** (*Vision-Based Guidance Flight System*, Chongqing University, 2026). I served as **PI** of a 4-person team (advisor: Wang Chengliang) and the project received an **Excellent** conclusion. I owned the vision host (software + PCB hardware), the dual-stage guidance scheme, and the experimental campaign.

> All figures and numbers below are taken directly from the project's defense deck — every datum is traceable to that source.

## Core idea: dual-stage (layered) visual guidance

A single-ended approach forces a trade-off: a ground launcher is powerful but cannot correct after release, while an onboard camera is agile but has a limited field of view. This project splits guidance into two cooperating vision loops:

- **Stage 1 — launcher coarse-aim.** A friction-wheel launcher with an industrial camera and a NUC host. The camera localizes the target; the NUC adjusts the launcher's yaw and the friction-wheel speed to deliver the aircraft near the target.
- **Stage 2 — onboard fine-guide.** The aircraft carries a micro camera (OpenMV) and a V-tail, missile-style airframe; in the terminal phase it senses the target and micro-adjusts. Two servos mix elevator (tail pitch) and aileron (roll) control.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/67_guidance_scheme.png" title="Overall scheme" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Overall scheme (from the defense deck): Stage-1 launcher coarse-aim (industrial camera + NUC + friction-wheel launcher) and Stage-2 onboard fine-guide (micro camera + V-tail airframe).</div>

## Aircraft iteration (4 generations)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/68_guidance_aircraft_iter.png" title="Aircraft iteration" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Aircraft iteration log (from the defense deck).</div>

- **n-1:** ducted airflow to boost control-surface effectiveness — simulation showed the duct did not help.
- **n-2:** removed the duct.
- **n-3:** replaced the airfoil wing with flat plates (airfoils were hard to fabricate, non-uniform, and gave limited benefit on this class of aircraft).
- **n-4:** secured the control surfaces with two mixed servos — one for tail elevator (pitch), one for aileron (roll).

## Experiment & results

Same conditions, **25 trials**, comparing the **dual-stage guided** aircraft against an **unguided** aircraft. Accuracy is scored on a dartboard ring count (10 = bullseye, 0 = miss).

| Metric | Dual-stage guided | Unguided |
|---|---|---|
| Mean ring count | **5.24** | 3.68 |
| Hit rate within 40 cm | **> 80%** | — |
| Impact variance | +33.7% (larger spread) | baseline |

- Mean ring count rises **+42.3%** (3.68 → 5.24): dual-stage guidance clearly lifts average accuracy over the unguided baseline.
- **Honest caveat:** impact spread also grows (+33.7%); the system is sensitive to disturbance and parameters, so consistency still needs work.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/69_guidance_results.png" title="Experiment results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Experiment results (from the defense deck): ring-count distribution over 25 trials, guided vs unguided.</div>

## Control & estimation

Kalman-filtered state estimation, cascaded PID, and attitude fusion (gyroscope / accelerometer / magnetometer) on the STM32H7 flight controller.

> Tech stack: NUC · industrial camera · OpenMV · STM32H7 · 9-axis IMU · friction-wheel launcher · V-tail airframe
