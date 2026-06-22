---
layout: page
title: ESP32 无线 IMU 姿态采集节点
description: 项目一的嵌入式子系统（独立完成）· 开源 · ESP32-C3 + ICM-20948 + VQF
img: assets/img/projects/实物图1.png
importance: 6
category: embedded
related_publications: false
---

基于 ESP32-C3 + ICM-20948 的无线九轴 IMU 姿态追踪节点，固件通过 WiFi 将 VQF 融合后的四元数实时传输至上位机，是项目一遥操系统的嵌入式子系统，独立完成。**完整硬件设计、固件与上位机已开源。**

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/实物图1.png" title="实物图" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/实物图2.png" title="实物图" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">无线 IMU 节点实物（含 3D 打印外壳）。</div>

### 特性

- **九轴姿态解算**：ICM-20948（陀螺仪 + 加速度计 + AK09916 磁力计），225 Hz 采集，VQF 算法本地实时解算
- **无线传输**：WiFi STA 模式，UDP 二进制协议（Q15 紧凑格式，37 字节包 + CRC16-XMODEM 校验）+ TCP 命令通道
- **自动设备发现**：mDNS 服务广播 + UDP Beacon，即插即用
- **多设备管理**：上位机 Dashboard 同时连接管理多台 IMU
- **磁力计校准**：运行时椭球校准，数据持久化至 NVS；3D 点云 + 球面覆盖热力图 + 范数曲线实时可视化
- **OTA 固件升级**：通过 WiFi HTTP 推送，无需数据线
- **电源管理**：锂电池供电，ADC 电压监测，智能剩余时间预测，低电量自动关机

> 技术栈：ESP32-C3 · ESP-IDF · ICM-20948 · VQF · WiFi UDP/TCP · mDNS ｜ 3D 打印外壳（STEP）+ BOM
