---
layout: page
title: "ORB-SLAM3 End-Effector Pose Evaluation"
description: Independent vision-inertial reference for cross-method characterization · RealSense D435i + ORB-SLAM3 · 0.373 mm stationary RMS
img: assets/img/projects/08_slam_trajectory.png
importance: 2
category: 研究主线
related_publications: false
---

An Intel RealSense D435i mounted on the operator's forearm runs ORB-SLAM3's **IMU_STEREO** mode to estimate end-effector pose in real time, serving as an **independent vision-inertial reference** against the [Unitree G1 IMU teleoperation system](/projects/1_unitree_g1_teleop/)'s dual-IMU forward-kinematics approach — characterizing each method's error profile rather than treating either as ground truth. I independently built the ORB-SLAM3 integration, calibration, evaluation tooling, and five quantitative tests.

- **Sensor:** D435i stereo camera (848×480 @ 30 fps) + on-board BMI055 IMU @ 200 Hz
- **Algorithm:** ORB-SLAM3 IMU_STEREO, visual-inertial joint optimization, real-time SE3 pose
- **Tooling:** custom `eval_endeffector.py` tails the SLAM CSV pose stream, auto-segments still segments, and performs sphere / ellipse fitting + circular statistics

> **On the "reference" framing:** ORB-SLAM3 + D435i is itself an estimation system — not a metric capture system (mocap / laser tracker). The figures below are **stationary / repeatability characterization** of this estimator, useful for cross-method comparison, not absolute positioning accuracy.

### Five quantitative tests

| Test | Metric | Result | Level |
|------|--------|--------|-------|
| Stationary noise | σ_3D_RMS | **0.373 mm** | sub-mm |
| Length constraint | σ_radial | 23.5 mm (4.9%) | cm |
| Fixed-point repeatability | σ_RMS | 9.2 mm | cm |
| Trajectory consistency | σ_residual | 21.9 mm (plane RMS 6.48 mm) | cm |
| Attitude consistency | σ_Roll/Pitch/Yaw | 1.20° / 0.25° / 0.97° | degree |

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/06_slam_static_noise.png" title="Static noise" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/07_slam_length_constraint.png" title="Length constraint" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/08_slam_trajectory.png" title="Trajectory" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Left: static noise distribution (Z slightly larger, consistent with stereo depth < lateral precision); middle: length-constraint sphere fit (auto-estimates shoulder & arm length); right: trajectory ellipse fit (PCA / algebraic, chosen by angular coverage).</div>

### Cross-method characterization vs dual-IMU forward kinematics

| Metric | ORB-SLAM3 | Dual-IMU FK | Better |
|------|-----------|-------------|--------|
| Stationary σ_3D_RMS | 0.373 mm | 3.83 mm | **SLAM ≈10×** |
| Length-constraint σ_radial | 23.5 mm | 0.40 mm | **IMU ≈59×** (structural) |
| Repeatability σ_RMS | 9.2 mm | 13.9 mm | **SLAM ≈1.5×** |
| Trajectory plane RMS | 6.48 mm | 8.83 mm | SLAM slightly |

This is **independent performance characterization and complementarity analysis, not strict cross-validation** — there is no shared metric ground truth. The two methods are complementary: SLAM wins on stationary precision (visual feature locking, no attitude-drift amplification); the IMU chain wins on geometric consistency — a *structural* advantage of fixed arm-length parameters, not higher absolute accuracy. SLAM depends on environmental texture and a GPU workstation; the IMU chain is embedded-friendly and lighting-independent. An ideal architecture would fuse the two — SLAM for global position anchoring, IMU for high-rate, low-latency joint attitude.

> Tech stack: C++ · ORB-SLAM3 · RealSense D435i · Python · matplotlib ｜ Related: [Unitree G1 teleoperation](/projects/1_unitree_g1_teleop/) (the characterized system)
