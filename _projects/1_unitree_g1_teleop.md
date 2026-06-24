---
layout: page
title: "Wearable IMU Teleoperation for Unitree G1"
description: Calibrated multi-IMU motion mapping with analytical IK and configuration-aware safety constraints.
img: assets/img/projects/04_g1_robot.png
importance: 1
category: Featured Research
related_publications: false
---

A wearable-IMU teleoperation system for the Unitree G1 humanoid's upper limbs, developed as a full **perception–estimation–control–safety** loop.

- **Problem:** IMU-driven upper-limb teleoperation suffers from sensor mounting uncertainty, long-term drift, joint coupling, and self-collision risk.
- **Method:** VQF 9-axis fusion → calibration → analytical inverse kinematics → Isaac Lab Bayesian-optimized PD initialization → configuration-aware dynamic joint limits.
- **Evidence:** 3.83 mm stationary position RMS, 448 simulation trials, two patent disclosures.

**Version evolution**

- **v1 (2025.12 – 2026.03):** Two-IMU right-arm teleoperation, 4 DoF; one-shot **3-second lateral-arm calibration**.
- **v2 (2026.04 – present):** **Five wireless IMUs** driving both arms, 10 teleoperated DoF; **four-step calibration** (down / forward / lateral / roll-axis refinement).

> Main research project. Its **sensing layer** uses self-built [ESP32-C3 + ICM-20948 wireless IMU nodes](/projects/6_wireless_imu/) (replacing the WT901C485 off-the-shelf module; hardware/firmware/host open-sourced). Its accuracy is cross-characterized against the [ORB-SLAM3 end-effector evaluation system](/projects/2_orbslam3_pose/).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/01_system_architecture.png" title="Three-layer architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Sensor → core-solving → application layers; raw IMU data passes through 7 stages before becoming joint angles.</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video controls muted playsinline preload="metadata" class="img-fluid rounded z-depth-1" style="width:100%;">
            <source src="/assets/video/unitree_teleop_demo.mp4" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">Real-robot right-arm teleoperation demo: operator arm pose, after VQF fusion + IK, mapped to joint angles in real time.</div>

## Key Techniques

- **VQF 9-axis fusion:** replaces Madgwick/Mahony; decoupled inclination/heading estimation, adaptive accelerometer correction, online gyroscope-bias compensation, magnetic-disturbance rejection.
- **Calibration:** v1 completes heading, mounting-tilt and IK calibration in a single 3-second lateral-arm pose; v2 adds a roll-axis refinement step (down / forward / lateral / roll). Persisted as JSON.
- **Hybrid analytical-optimization IK:** YXZ-decomposed analytical solution (millisecond-level) + L-BFGS-B bounded optimization + multi-start search; 26–50% reduction in bounded-IK orientation residual for limit-violating targets.
- **Unified coordinate management:** 6 frames strictly defined; rotation-matrix Frobenius inner product avoids quaternion sign ambiguity; 7 unit tests cover full-chain consistency.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/05_imu_circle_eval.png" title="Circle-drawing diagnosis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Circle-drawing diagnosis: fitted radius R = 30.8 mm, in-plane RMS = 8.83 mm.</div>

## Accuracy (four tests)

| Test | Metric | Result |
|------|--------|--------|
| Stationary noise | 3D position RMS | **3.83 mm** |
| Arm-length constraint | radial residual RMS | **0.40 mm** |
| Fixed-point repeatability | repeatability RMS | 13.9 mm |
| Circle-trajectory consistency | relative error | 33.3% |

These are **stationary / short-horizon RMS figures** of the IMU-only kinematic chain (not absolute positioning against a metric ground truth). They are independently cross-characterized by the [ORB-SLAM3 vision-inertial system](/projects/2_orbslam3_pose/) to bound the error of the low-cost IMU-only approach.

## Control: Isaac Lab Bayesian Optimization

`shoulder_yaw` showed large dynamic tracking error. Rather than hand-tune PD gains, I built a reproducible parameter-search pipeline in **NVIDIA Isaac Lab**, using Bayesian optimization to initialize Kp/Kd for the 14 upper-limb joints.

- **Simulation:** Isaac Sim 5.1 + PhysX implicit; G1 29-DoF URDF, fixed base, legs/torso locked; per-joint step + multi-frequency sine sweep (0.2–2.0 Hz).
- **Algorithm:** custom BO (Gaussian Process + Expected Improvement), pure numpy+scipy; **28-D** search space (14 joints × {Kp, Kd}).
- **Scale:** 16 iterations per joint per trajectory (5 random + 11 Bayesian); **448 trials**, ~30 min on RTX 3060.

> **Why 14 tuned joints vs 10 teleoperated?** IK drives 5 DoF per arm (SP/SR/SY/EL/WR = 10 total). PD tuning additionally stabilizes wrist pitch / yaw (4 more), totaling 14 actuated upper-limb joints — the extra joints are controlled even when not driven by IK.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/58_bo_convergence.png" title="BO convergence" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/59_pd_before_after.png" title="Default vs optimized PD" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Left: best-so-far cost convergence per joint; right: default vs optimized PD for key right-arm joints.</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video controls muted playsinline preload="metadata" class="img-fluid rounded z-depth-1" style="width:100%;">
            <source src="/assets/video/unitree_pybullet_sim.mp4" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">Right-arm trajectory tracking in PyBullet: the Bayesian-optimized PD gains are evaluated here.</div>

**Honest sim-to-real findings:**

1. **Effective in simulation:** pitch / elbow / wrist RMSE drops to 0.3–0.7°; **shoulder_yaw remains the bottleneck (1.5–3.2°)** — highest gravitational torque + joint coupling.
2. **Significant sim-to-real gap:** real-robot RMSE is **5–10×** simulation.
3. **Velocity feedforward failed on real robot:** the v3 feedforward term caused severe oscillation and was dropped.
4. **Final parameters:** simulation initial values refined over **4 rounds of real-robot tuning** — simulation narrows the search space; real logs decide the final values.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/61_sim_to_real_gap.png" title="Sim vs real RMSE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Per-joint simulation RMSE vs real-robot RMSE: the order-of-magnitude gap and which joints transfer well.</div>

> See notes: [Hardware-protection anomaly diagnosis](/blog/2026/unitree-g1-hardware-protection-anomaly/), [Humanoid self-collision avoidance](/blog/2026/humanoid-self-collision-avoidance/).

## Runtime safety: from hardware-protection anomaly to dynamic limits

During long sessions the right arm occasionally entered **hardware protection** — motors turn damped, drop to zero, auto-recover after seconds. I treated it as a standalone diagnosis problem:

- **Detection:** auto-segment anomaly windows from total motor-error peaks (peak × 0.3 threshold, > 5 s); two typical events lasted **7.2 s / 8.2 s**, peak error **2.01 / 1.56 rad**.
- **Attribution:** per-joint error decomposition — **elbow dominates (40–61%)**.
- **Root cause:** PyBullet replay + chest-scratch physical evidence confirm the upper arm hits the **mechanical limit before the software limit** (the software limit was the union of all reachable ranges — too loose).
- **Fix:** a **configuration-dependent dynamic software-limit function** that tightens limits on dangerous joints (e.g. upper-arm yaw) as a function of the other joint angles.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/60_anomaly_detection.png" title="Anomaly detection" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">Auto-segmented anomaly windows; elbow dominates, matching the PyBullet-replayed elbow-clamp collision.</div>

## Outputs

- **Two invention disclosures** (drafted):
  - *Multi-node wireless-IMU upper-limb teleoperation solving method and system* — sensing & solving.
  - *Safe joint-target generation and dynamic limit control for humanoid upper limbs under multi-IMU teleoperation* — runtime safety.

> Tech stack: Python · VQF · Isaac Lab / PyBullet · Bayesian optimization (GP+EI) · OpenGL · WiFi/UDP ｜ Hardware: Unitree G1 + **5× self-built [ESP32-C3 + ICM-20948 wireless IMU nodes](/projects/6_wireless_imu/)** (v2; v1 used 2×)
