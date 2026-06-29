---
layout: about
title: About
permalink: /
nav: false
nav_order: 1
subtitle: <a href="https://eie.cqu.edu.cn/">National Excellent Engineer College, Chongqing University</a> · Robotics Engineering · Junior

profile:
  align: right
  image: prof_haowen.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Robotics Engineering · Junior</p>
    <p>GPA 3.697 / Rank 5 (Top 10%)</p>
    <p>CET-6 570</p>

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<!-- pages/about.md — bilingual (EN default / 中文). Section visibility is gated by
     <html data-lang> via CSS (see _layouts/default.liquid). Selected Projects are
     pulled in by the featured_projects.liquid include, between the intro and the
     longer skills/awards sections. -->

<div class="lead" markdown="1">

**Haowen Zheng** <span data-lang="zh">（郑皓文）</span>

</div>

<div data-lang="en" markdown="1">

Junior undergraduate in **Robotics Engineering** at the National Excellent Engineer College, Chongqing University. Ranked 5th in the major (top 10%), GPA 3.697, CET-6 570.

I work across two threads — **robot system integration** and **embedded system development** — and have led or contributed to a number of end-to-end engineering projects spanning mathematical modeling, algorithm design, embedded firmware, PCB hardware, and system-level integration & testing.

My core strength is **system-level engineering**: closing the loop from physical modeling through software/hardware implementation to quantitative evaluation. My research interests center on the robot **perception–estimation–control–safety** loop, with emphasis on multi-source sensor fusion, state estimation, motion control, and physical human–robot interaction. I am working toward **embodied perception–estimation–control** research through a concrete humanoid teleoperation project.

**Representative work:** a **Unitree G1 upper-limb IMU teleoperation system** built as a full perception–estimation–control–safety loop — VQF fusion, analytical inverse kinematics, Isaac Lab Bayesian-optimized PD initialization, and configuration-aware joint limits; **3.83 mm stationary position RMS**, 448 simulation trials, two invention disclosures drafted. An **ORB-SLAM3 end-effector pose evaluation system** serving as an independent vision-inertial reference for cross-method characterization. And a **vision-based precision-guided flight system** (national-level project, +42.3% hit accuracy).

> 📄 Full CV: [English PDF](/assets/pdf/CV_Zheng_Haowen_AcademicCV_EN.pdf) ｜ [中文 PDF](/assets/pdf/CV_Zheng_Haowen_CN.pdf)

</div>

<div data-lang="zh" markdown="1">

**郑皓文** — 重庆大学国家卓越工程师学院**机器人工程**专业大三本科生，专业排名第 5（前 10%），GPA 3.697，CET-6 570。

围绕**机器人系统集成**与**嵌入式系统开发**两条主线，独立完成或深度参与多项端到端工程项目，覆盖数学建模、算法设计、嵌入式固件、PCB 硬件到系统集成测试的全链路。

核心优势是**系统级工程能力**：从物理建模、软硬件实现到定量评测的完整闭环。科研兴趣聚焦机器人「感知—估计—控制—安全」闭环，重点关注多源传感器融合、状态估计、运动控制与物理人机交互，正通过宇树 G1 上肢遥操项目向具身感知—估计—控制方向深入。

**代表作：** 宇树 G1 上肢 IMU 遥操系统——感知—估计—控制—安全完整闭环（VQF 融合、解析逆运动学、Isaac Lab 贝叶斯优化 PD 初始化、构型相关关节限位；静态位置 RMS 3.83 mm；448 次仿真试验；2 项专利交底书）；ORB-SLAM3 末端位姿评估系统（独立视觉惯性参考）；视觉精确制导飞行系统（国家级大创，命中精度 +42.3%）。

> 📄 简历：[中文 PDF](/assets/pdf/CV_Zheng_Haowen_CN.pdf) ｜ [English PDF](/assets/pdf/CV_Zheng_Haowen_AcademicCV_EN.pdf)

</div>

---

{% comment %} Selected Projects index — auto-filtered from featured_on_about: true, ordered by `importance`. Placed after the intro/research interests and before the long skills/awards lists. {% endcomment %}
{% include featured_projects.liquid limit=3 %}

---

<div data-lang="en" markdown="1">

### 🔧 Technical Skills

- **Programming**: Python · C/C++ · MATLAB · Verilog · JavaScript
- **Robotics & Algorithms**: VQF attitude fusion · ORB-SLAM3 · inverse kinematics · Kalman filter · Isaac Lab · Bayesian optimization · OpenGL/PyBullet
- **Embedded & Hardware**: ESP32 / STM32 (ESP-IDF, HAL) · ICM-20948 / WT901 IMU · PCB design (EasyEDA) · signal integrity
- **Engineering & Simulation**: SolidWorks · ANSYS · MuJoCo · Git · Linux · Docker

### 🏆 Selected Awards

- 🥇 National Innovation Training Program *Vision-Based Precision-Guided Flight System* — **Excellent** conclusion (national, 2025)
- 🥇 RoboMaster 2025 National Finals — 3rd prize (national, 2025)
- 🥈 RoboMaster 2025 Central Regional — 2nd prize (provincial, 2025)
- 🥇 NUEDC Chongqing University — 1st prize (university, 2025)
- 🥉 China UEEC university bronze (university, 2024)

Full portfolio at [**Projects**](/projects/), technical notes at [**Notes**](/notes/).

</div>

<div data-lang="zh" markdown="1">

### 🔧 技术技能

- **编程语言**：Python · C/C++ · MATLAB · Verilog · JavaScript
- **机器人与算法**：VQF 姿态融合 · ORB-SLAM3 · 逆运动学 · 卡尔曼滤波 · Isaac Lab · 贝叶斯优化 · OpenGL/PyBullet
- **嵌入式与硬件**：ESP32 / STM32（ESP-IDF、HAL）· ICM-20948 / WT901 IMU · PCB 设计（立创 EDA）· 信号完整性
- **工程与仿真**：SolidWorks · ANSYS · MuJoCo · Git · Linux · Docker

### 🏆 代表性荣誉

- 🥇 国家级大学生创新创业训练计划「基于视觉的双阶段精确制导飞行系统」—— **优秀** 结题（国家级，2025）
- 🥇 RoboMaster 2025 全国赛—— 三等奖（国家级，2025）
- 🥈 RoboMaster 2025 中部赛区—— 二等奖（省级，2025）
- 🥇 全国大学生电子设计竞赛（重庆大学校赛）—— 一等奖（校级，2025）
- 🥉 全国卓越工程师学院联赛校赛铜奖（校级，2024）

完整作品集见 [**项目**](/projects/)，技术笔记见 [**笔记**](/notes/)。

</div>
