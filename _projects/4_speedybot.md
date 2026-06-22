---
layout: page
title: SpeedyBot 低成本自主扫地机器人
description: 微电路系统设计课程大作业（组长）· ESP32-S3 + ROS2 全栈，86 页技术报告
img: assets/img/projects/22_speedybot_prototype.jpeg
importance: 4
category: robotics
related_publications: false
---

3 人小组组长，主导完成一款低成本自主导航扫地机器人，覆盖 PCB 设计、嵌入式固件、ROS2 上位机、Web 控制界面全栈，产出 **86 页技术报告**。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/24_speedybot_slam_action.jpeg" title="建图与导航" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/25_speedybot_webui.png" title="Web 控制界面" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：Cartographer 实时建图与 Nav2 导航；右：自研 Web 控制界面。</div>

### 系统架构

- **主控**：ESP32-S3（FreeRTOS，PlatformIO 开发）
- **导航**：ROS2 Humble + Cartographer SLAM + Nav2 规划与避障
- **硬件**：自研 PCB（电机驱动 + 传感器接口 + 电源管理）
- **交互**：Web 控制界面，远程建图、定点清扫、状态监控

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/23_speedybot_pcb_3d.png" title="PCB 3D" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/20_speedybot_latency.png" title="延迟测试" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：自研 PCB 3D 渲染；右：端到端控制延迟测试。</div>

> 技术栈：ESP32-S3 · ROS2 Humble · Cartographer · Nav2 · FreeRTOS · PlatformIO
