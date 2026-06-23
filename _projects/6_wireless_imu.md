---
layout: page
title: ESP32 无线 IMU 姿态采集节点
description: 宇树 G1 遥操系统实际采用的感知节点（已替代成品模块）· 开源 · ESP32-C3 + ICM-20948 + VQF
img: assets/img/projects/实物图1.png
importance: 6
category: 工程实践
related_publications: false
---

基于 ESP32-C3 + ICM-20948 的无线九轴 IMU 姿态追踪节点，固件本地完成 VQF 融合后通过 WiFi 实时上传四元数。它是 [宇树 G1 上肢 IMU 遥操系统](/projects/1_unitree_g1_teleop/) **实际采用的感知层**——已替代原先的 WT901C485 成品 IMU 模块，独立完成并同时开源。**完整硬件设计、固件与上位机已开源。**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/实物图1.png" title="节点实物" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/实物图2.png" title="节点实物" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">两台无线 IMU 节点（含 3D 打印外壳），分别固定于操作者大臂 / 小臂，贴身穿戴、无线供电。</div>

### 为什么自研：替代 WT901C485 成品模块

| 维度 | 自研 ESP32-C3 + ICM-20948 | WT901C485 成品模块 |
|------|--------------------------|-------------------|
| 通信 | WiFi 无线（UDP 数据 + TCP 命令） | RS485 有线总线 |
| 供电 | 锂电池无线供电 + ADC 监测 | 需外接电源 / 线缆 |
| 部署 | 贴身穿戴、mDNS 即插即用 | 受线缆束缚 |
| 姿态解算 | 节点本地 VQF 实时（225 Hz） | 输出原始量、上位机解算 |
| 扩展 | 多节点同步、OTA、磁力计在线校准 | 单模块、闭源 |
| 开源 | 硬件 / 固件 / 上位机全开源 | 商业闭源 |

### 特性

- **九轴姿态**：ICM-20948（陀螺仪 + 加速度计 + AK09916 磁力计），225 Hz 采集，VQF 算法本地实时解算
- **无线传输**：WiFi STA 模式，UDP 二进制协议（Q15 紧凑格式，37 字节包 + CRC16-XMODEM 校验）+ TCP 命令通道；mDNS 广播 + UDP Beacon 自动发现
- **磁力计校准**：运行时椭球校准并持久化至 NVS，3D 点云 + 球面覆盖热力图 + 范数曲线实时可视化
- **工程化**：OTA 固件升级、锂电池电源管理 + 智能剩余时间预测、上位机 Dashboard 多设备管理

> 技术栈：ESP32-C3 · ESP-IDF · ICM-20948 · VQF · WiFi UDP/TCP · mDNS ｜ 3D 打印外壳（STEP）+ BOM ｜ 开源：GitHub [@dgmm-claude](https://github.com/dgmm-claude)
