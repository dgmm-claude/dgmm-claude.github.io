---
layout: project
title: "Smart Bartender Robot (Generation 2 and 3)"
title_en: "Smart Bartender Robot (Generation 2 and 3)"
title_zh: "智能调酒机器人（二代与三代）"
description: "Team project · all software + PCB hardware · Gen 2 ran three months zero-failure"
description_en: "Team project · all software + PCB hardware · Gen 2 ran three months zero-failure"
description_zh: "团队项目 · 全部软件 + PCB 硬件 · 二代连续运行 3 个月零故障"
img: assets/img/projects/14_bartender_gen3_photo.jpg
importance: 7
category: Selected Engineering
related_publications: false
translation_key: bartender
body_lang: zh        # the Markdown body below is written in Chinese
has_zh_content: true
has_en_content: false
---

> **English summary:** A team smart-bartender robot; I owned all software and the PCB hardware. Two iterations (Generation 2 and 3) across ten functional modules and 2000+ lines of core code: recipe management, precise dosing (pump + flow meter), stirring, refrigeration/lighting, an LVGL touch UI, WiFi remote ordering, OTA updates, and fault self-checks, all scheduled by FreeRTOS. The Generation 2 prototype ran continuously for over three months with zero failures, validating the firmware architecture and hardware reliability — the main lesson being how to iterate a multi-actuator embedded product from first prototype to a robust long-running system.

团队项目，本人负责**全部软件系统 + PCB 硬件设计**。经历二代、三代两轮迭代，10 个功能模块，约 2000+ 行核心代码。二代样机连续运行超 **3 个月零故障**。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/14_bartender_gen3_photo.jpg" title="三代实物" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/15_bartender_pcb_3d.png" title="PCB 3D" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：三代调酒机实物；右：自研控制板 PCB 3D。</div>

### 功能模块（10 个）

- 配方管理、精准计量（泵控 + 流量计）、搅拌机构、制冷/灯光控制
- LVGL 触屏 UI、WiFi 远程点单、OTA 升级、故障自检
- FreeRTOS 多任务调度，保障实时性与稳定性

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/16_bartender_ui.png" title="LVGL UI" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/17_bartender_wiring.png" title="接线" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：LVGL 触屏交互界面；右：整机接线方案。</div>

> 技术栈：ESP32 · ESP-IDF · FreeRTOS · LVGL · C
