---
layout: page
title: "Affective Interactive Desk Lamp Control System"
description: "Automatic Control course project · Buck closed-loop control + multi-modal affective interaction"
img: assets/img/projects/12_lamp_hardware.png
importance: 5
category: Coursework
related_publications: false
---

> **English summary:** An Automatic Control course project (independent) in two parts. The base part covers synchronous Buck converter modeling and closed-loop control — PSIM simulation, STM32 digital PID with voltage/current dual loops, and Bode-plot frequency-domain stability analysis. The comprehensive part is an affective desk lamp: a Raspberry Pi CM5 with MediaPipe (gesture/expression) and iFlytek ASR perceives the user, an STM32F103 drives a 3-DoF mechanism via inverse kinematics to orient the head, and an affective-state model maps multi-modal input to expressive posture and lighting. Combines power-electronics control with embodied affective interaction.

自动控制原理课程综合项目（独立完成），含**基础项目**与**综合项目**两部分。

### 基础项目：同步 Buck 降压变换器闭环控制

- 同步 Buck 变换器建模与闭环控制分析（PSIM 仿真）
- STM32 数字控制实验：PID 闭环、电压电流双环
- Bode 图频域分析，验证稳定性与动态性能

### 综合项目：Apple Elegant 情感交互台灯

设计一款多模态感知 + 3-DOF IK 控制的情感交互台灯，能识别用户表情/语音/手势并作出有情感的姿态响应。

- **感知**：树莓派 CM5 + MediaPipe（手势/表情）+ OpenCV + 讯飞 ASR 语音识别 + Edge-TTS 语音合成
- **控制**：STM32F103 驱动 3 自由度机械结构，逆运动学控制台灯「头部」朝向
- **情感模型**：将多模态输入映射为情感状态空间，驱动姿态与灯光表达

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/39_buck_bode_plot.png" title="Bode 图" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">同步 Buck 变换器闭环系统 Bode 图频域分析。</div>

> 技术栈：树莓派 CM5 · STM32F103 · MediaPipe · OpenCV · 讯飞 ASR · Edge-TTS · PSIM · Python
