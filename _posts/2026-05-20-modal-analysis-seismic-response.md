---
layout: post
category: engineering
title: "Modal Analysis and Seismic Response of a Multi-DOF Structure"
date: 2026-05-20 10:00:00 +0800
description: "A numerical-analysis course project: a full static, modal, and seismic-response pipeline on a five-story shear-type building. Linear systems solved by SOR (optimal relaxation around 1.65 cuts iterations from 552 to 105); the fundamental frequency found by inverse iteration in 8 steps (1.334 Hz); the first mode carries 84.7% effective mass; seismic response integrated by RK4 with 0.13 mm displacement error. Links SOR convergence, eigenvalue methods, and RK4 integration on one physical system."
tags: 数值分析 模态分析 结构动力学 Runge-Kutta
categories: 课程项目
_styles: ".post-content img, #markdown-content img { max-width: 100%; height: auto; display: block; margin: 1.5em auto; border-radius: 0.375rem; } .post-content figure, #markdown-content figure { margin: 1.5em 0; text-align: center; }"
---

# 工程数值分析大作业报告

## 多自由度结构系统的模态分析与地震动力响应数值研究

---

## 摘要

本报告以五层剪切型建筑结构为研究对象，围绕"静力分析 → 模态分析 → 地震动力响应"这一完整结构动力学分析流程，综合运用课程所学的多种数值方法，对同一物理系统进行多层次的数值研究。

核心方法链路：线性方程组求解 → 广义特征值问题 → ODE初值问题数值积分，辅以三次样条插值、数值积分和误差分析。

**主要发现**：SOR最优松弛因子 ω≈1.65 使迭代次数从552次（Jacobi）降至105次；反幂法仅需8次迭代即可精确求得基频1.334 Hz；第一阶振型贡献了84.7%的有效质量；RK4法以0.13 mm的误差水平准确模拟了地震动力响应。

**关键词**：结构动力学；模态分析；特征值问题；地震响应；Runge-Kutta法

---

## 1 问题描述与建模

### 1.1 工程背景

在结构工程中，多层建筑在风荷载和地震作用下的动力响应分析是结构设计的核心内容。本作业将五层建筑简化为剪切型多自由度（MDOF）系统，通过数值方法完成完整的结构分析。

### 1.2 剪切型建筑模型

将每层楼板视为集中质量，柱/墙的抗侧刚度简化为层间弹簧，得到串联的多自由度系统：

```
           m₅ ─── k₅
           m₄ ─── k₄
           m₃ ─── k₃
           m₂ ─── k₂
           m₁ ─── k₁
          ─┴─ (地面)
```

### 1.3 运动方程

在地震地面加速度 $\ddot{x}_g(t)$ 作用下，各层相对地面的运动方程为：

$$M\ddot{x} + C\dot{x} + Kx = -Mr\ddot{x}_g(t)$$

其中：
- $M$：质量矩阵（对角矩阵），$M = \text{diag}(m_1, m_2, \ldots, m_5)$
- $K$：刚度矩阵（三对角矩阵），$K_{ii} = k_i + k_{i+1}$，$K_{i,i+1} = K_{i+1,i} = -k_{i+1}$
- $C$：阻尼矩阵（Rayleigh阻尼），$C = \alpha M + \beta K$
- $r = (1, 1, \ldots, 1)^T$：影响向量

### 1.4 结构参数

| 参数 | 数值 |
|------|------|
| 层数 | 5 |
| 层高 | 3.6 m |
| 各层质量 | 50,000 kg（50吨） |
| 层间刚度 | 50, 45, 40, 35, 30 MN/m（底层到顶层递减） |
| 阻尼比 | 5%（Rayleigh阻尼） |
| 总质量 | 250,000 kg |

刚度从底层到顶层递减，反映了实际结构中柱截面逐渐减小的特征。矩阵条件数 cond(K) = 4.26×10¹，问题良态。

### 1.5 地震激励

采用正弦脉冲模型：

$$\ddot{x}_g(t) = A_g \sin(\omega_g t) \cdot \sin\!\left(\frac{\pi t}{T_d}\right), \quad 0 \leq t \leq T_d$$

参数：$A_g = 3.0\,\text{m/s}^2$，$\omega_g = 15.0\,\text{rad/s}$，$T_d = 10\,\text{s}$。

---

## 2 静力分析

### 2.1 问题描述

在恒定侧向力（倒三角形分布模拟风荷载：50, 100, 150, 200, 250 kN）作用下，求解静力平衡方程：

$$Kx = F$$

分别使用直接法和迭代法求解，比较精度与效率。

### 2.2 直接法

| 方法 | 计算时间 |
|------|---------|
| LU分解法 | 0.054 ms |
| Cholesky分解法 | 0.063 ms |

两种直接法所得静位移完全一致，顶层最大位移 = 66.75 mm。由于K是对称正定矩阵，Cholesky分解在理论上计算量仅为LU的一半。

### 2.3 迭代法

| 方法 | 迭代次数 | 计算时间 |
|------|---------|---------|
| Jacobi | 552 | 1.91 ms |
| Gauss-Seidel | 247 | 1.34 ms |
| SOR (ω=1.65) | **105** | 1.05 ms |

![静力分析结果](/assets/img/posts/static_analysis.png)

**分析**：

1. **收敛速度**：GS比Jacobi快2.2倍（247 vs 552次），这是因为GS利用了最新迭代值。SOR通过最优松弛因子ω≈1.65进一步加速到105次，总加速比5.3倍。

2. **松弛因子优化**：右图显示SOR迭代次数随ω的变化呈U型曲线，ω≈1.65为最优值。当ω→2时，迭代次数急剧增加（可能发散）。

3. **结果一致性**：四种方法所得静位移完全一致（66.75 mm），验证了各方法的正确性。

---

## 3 模态分析

### 3.1 广义特征值问题

结构自由振动方程 $M\ddot{x} + Kx = 0$ 的解可通过广义特征值问题获得：

$$K\varphi = \omega^2 M\varphi$$

其中 $\omega_i$ 为第 $i$ 阶固有圆频率，$\varphi_i$ 为对应的振型向量。

### 3.2 特征值求解方法

#### 幂法求最高频率

对 $M^{-1}K$ 进行幂法迭代，收敛到最大特征值 $\omega_{\max}^2$。

**结果**：$\omega_{\max} = 54.678\,\text{rad/s}\,(8.702\,\text{Hz})$，41次迭代。

#### 反幂法求基频

对 $K^{-1}M$ 进行幂法迭代，收敛到最大特征值 $1/\omega_1^2$，即基频。

**结果**：$\omega_1 = 8.381\,\text{rad/s}\,(1.334\,\text{Hz},\,T_1=0.750\,\text{s})$，仅需**8次迭代**。

#### QR方法求全部频率

通过 Cholesky 分解 $M=LL^T$ 将广义特征值问题转化为标准特征值问题 $A\psi = \lambda\psi$（其中 $A=L^{-1}KL^{-T}$），再用QR算法求解。

### 3.3 固有频率与周期

| 阶数 | 圆频率 (rad/s) | 频率 (Hz) | 周期 (s) |
|------|---------------|-----------|----------|
| 1 | 8.381 | 1.334 | 0.750 |
| 2 | 22.930 | 3.649 | 0.274 |
| 3 | 35.886 | 5.711 | 0.175 |
| 4 | 46.114 | 7.339 | 0.136 |
| 5 | 54.678 | 8.702 | 0.115 |

频率范围从1.33 Hz到8.70 Hz，基频周期0.75秒，符合五层框架结构的典型范围。

### 3.4 振型与有效模态质量

![结构振型图](/assets/img/posts/mode_shapes.png)

| 阶数 | 参与系数 Γ | 有效质量 (kg) | 质量参与比 |
|------|-----------|-------------|-----------|
| 1 | 460.09 | 211,685 | **84.7%** |
| 2 | -160.57 | 25,783 | 10.3% |
| 3 | -88.30 | 7,797 | 3.1% |
| 4 | 55.14 | 3,040 | 1.2% |
| 5 | -41.17 | 1,695 | 0.7% |
| **合计** | | **250,000** | **100%** |

**关键发现**：第一阶振型贡献了84.7%的有效质量，意味着在地震响应中第一振型起主导作用。在实际工程中，通常要求前几阶振型的质量参与比之和超过90%，本结构前两阶即达到95%。

振型图中的光滑曲线由三次样条插值得到，红色散点为离散楼层数值解。

---

## 4 地震动力响应分析

### 4.1 数值积分方法

将二阶运动方程转化为状态空间形式：

$$\frac{d}{dt}\begin{pmatrix} x \\ \dot{x} \end{pmatrix} = \begin{pmatrix} \dot{x} \\ M^{-1}(-C\dot{x} - Kx - Mr\ddot{x}_g) \end{pmatrix}$$

然后使用多种ODE数值积分方法求解，分析时长20秒，步长Δt=0.01s。

#### 辛欧拉法（半隐式Euler）

先更新速度，再用新速度更新位移：$\dot{x}^{n+1} = \dot{x}^n + \Delta t \cdot \ddot{x}^n$，$x^{n+1} = x^n + \Delta t \cdot \dot{x}^{n+1}$

一阶精度，但对振动系统具有长期稳定性（辛结构）。

#### 改进欧拉法（Heun法）

二阶Runge-Kutta方法：先用Euler预测，再修正。二阶精度。

#### 经典四阶Runge-Kutta法（RK4）

四阶精度，最常用的显式ODE方法之一。每步需要4次函数求值。

#### Newmark-β法（隐式方法，参考解）

$\beta=0.25,\,\gamma=0.5$对应平均加速度法，具有二阶精度和无条件稳定性，作为参考解。

### 4.2 顶层位移时程

![动力响应分析](/assets/img/posts/dynamic_response.png)

| 方法 | 顶层最大位移 (mm) | 相对Newmark误差 (mm) | 计算时间 |
|------|------------------|---------------------|---------|
| 辛欧拉法 | 28.867 | 0.335 | 32.8 ms |
| 改进欧拉法 | 28.767 | 0.234 | 60.7 ms |
| **RK4法** | **28.683** | **0.130** | 123.0 ms |
| Newmark-β (参考) | 28.563 | — | 44.6 ms |

**分析**：

1. 四种方法得到的顶层最大位移在28.56~28.87 mm之间，差异小于1.1%
2. RK4法精度最高，误差仅0.13 mm
3. 辛欧拉法虽然只有一阶精度，但由于保持了辛结构，误差并未显著放大
4. 地震停止后（t>10s），结构做阻尼自由振动，位移逐渐衰减

### 4.3 各层位移与层间位移

各层位移时程显示高阶振型在底层更为显著。层间位移最大值出现在底层（第一层），这与结构底部剪力最大的物理规律一致。

### 4.4 能量分析

动能 $T = \frac{1}{2}\dot{x}^T M\dot{x}$ 和势能 $V = \frac{1}{2}x^T Kx$ 随时间的变化反映了能量在动能和势能之间的转换过程。由于阻尼的存在，地震结束后总能量单调衰减。

---

## 5 数值方法收敛性分析

### 5.1 时间步长收敛性

以Δt=0.001s的Newmark-β精细解为参考，研究各方法的收敛阶：

| Δt (s) | 辛欧拉误差 (mm) | Heun误差 (mm) | RK4误差 (mm) |
|--------|----------------|--------------|-------------|
| 0.0100 | 0.1579 | 0.0579 | 0.0266 |
| 0.0050 | 0.0574 | 0.0087 | 0.0124 |
| 0.0025 | 0.0313 | 0.0057 | 0.0006 |
| 0.0010 | 0.0126 | 0.0020 | 0.0012 |

![收敛性分析](/assets/img/posts/convergence_ode.png)

**分析**：

- **辛欧拉法**：随Δt减小误差近似线性下降，体现一阶方法的特征
- **改进欧拉法**：误差下降速度约为辛欧拉的两倍，体现二阶精度
- **RK4法**：误差下降最快，Δt从0.01减半到0.005时误差下降约2倍（受限于参考解精度），在Δt=0.0025s时误差仅0.0006 mm

### 5.2 特征值求解收敛性

- 反幂法求基频：**8次迭代**即达到10⁻¹²精度
- 幂法求最高频率：41次迭代
- QR方法一次性求出全部5个特征值

反幂法的高效性源于 $K^{-1}M$ 的最大特征值（$1/\omega_1^2$）与其他特征值分离良好。

### 5.3 稳定性讨论

在试算中发现，显式Euler法（$x^{n+1}=x^n+\Delta t\cdot f(t^n, x^n)$）对振动系统**无条件不稳定**——无论Δt多小，数值解最终都会发散。这是因为显式Euler的稳定域不包含虚轴，而无阻尼振动系统的特征值恰在虚轴上。

这从数值分析的角度解释了为什么在结构动力学中，显式Euler法不被使用，而需要采用辛Euler、RK4或隐式方法（Newmark-β）。

---

## 6 结论

### 6.1 主要结论

1. **静力分析**：SOR方法通过优化松弛因子ω≈1.65，将迭代次数从Jacobi的552次降至105次（加速5.3倍），验证了超松弛迭代对三对角方程组的高效性。

2. **模态分析**：反幂法仅需8次迭代即精确求得基频1.334 Hz（周期0.75 s），远优于幂法求最高频率的41次迭代。QR方法一次性求解全部5阶频率，效率最高。第一阶振型贡献了84.7%的有效质量，主导了地震响应。

3. **动力响应**：四种数值积分方法均成功模拟了地震动力响应。RK4法以0.13 mm的误差最为精确，辛欧拉法虽然仅一阶精度但因保辛结构保持了良好的长期稳定性。

4. **稳定性**：分析证实了显式Euler法对振动系统的无条件不稳定性，从实践角度说明了稳定性理论的重要性。

### 6.2 课程知识综合应用

本报告综合运用了数值分析课程中的多种方法：LU分解与Cholesky分解用于静力平衡方程求解；Jacobi、Gauss-Seidel和SOR迭代法用于迭代求解；幂法、反幂法和QR算法用于求解广义特征值问题；三次样条插值用于振型光滑曲线绘制；数值积分用于系统能量计算。

### 6.3 扩展方向

- 引入更多自由度（如10层或20层模型），研究大规模特征值问题
- 使用实际地震记录（如El Centro波）替代正弦脉冲
- 加入调谐质量阻尼器（TMD），用非线性方程方法优化减震参数

---

## 参考文献

1. 李庆扬, 王能超, 易大义. 数值分析（第5版）[M]. 清华大学出版社, 2008.
2. Chopra A K. Dynamics of Structures: Theory and Applications to Earthquake Engineering (5th Edition)[M]. Pearson, 2017.
3. Bathe K J. Finite Element Procedures (2nd Edition)[M]. Prentice Hall, 2014.

---

## 附录：关键代码片段

以下摘录自 `src/structural_dynamics.py`，展示核心数值方法的实现。

### A.1 刚度矩阵组装

```python
def _build_stiffness_matrix(self):
    K = np.zeros((self.n, self.n))
    for i in range(self.n):
        if i == 0:
            K[i, i] = self.k[i] + (self.k[i+1] if i+1 < self.n else 0)
            if i+1 < self.n:
                K[i, i+1] = -self.k[i+1]
        elif i == self.n - 1:
            K[i, i] = self.k[i]
            K[i, i-1] = -self.k[i]
        else:
            K[i, i] = self.k[i] + self.k[i+1]
            K[i, i-1] = -self.k[i]
            K[i, i+1] = -self.k[i+1]
    return K
```

### A.2 SOR超松弛迭代法

```python
def sor_iteration(self, omega, max_iter=5000, tol=1e-10):
    x = np.zeros(self.n)
    D = np.diag(np.diag(self.K))
    L = np.tril(self.K, -1)
    U = np.triu(self.K, 1)

    for iteration in range(max_iter):
        x_new = x.copy()
        for i in range(self.n):
            x_gs = (self.F[i] - L[i, :] @ x_new - U[i, :] @ x) / D[i, i]
            x_new[i] = (1 - omega) * x[i] + omega * x_gs

        residual = np.linalg.norm(self.K @ x_new - self.F)
        if residual < tol:
            break
        x = x_new
    return x, iteration + 1, elapsed, residuals
```

### A.3 幂法与反幂法

```python
# 幂法：M^(-1)K 的最大特征值 → 最高频率
def power_method(self, max_iter=200, tol=1e-12):
    phi = np.random.rand(self.n)
    for iteration in range(max_iter):
        y = linalg.solve(self.M, self.K @ phi)
        norm = np.sqrt(y.T @ self.M @ y)
        y /= norm
        lam = y.T @ self.K @ y / (y.T @ self.M @ y)
        if iteration > 0 and abs(lam - lam_old) / abs(lam) < tol:
            break
        phi = y.copy()
        lam_old = lam
    return np.sqrt(abs(lam)), phi, iteration + 1, elapsed

# 反幂法：K^(-1)M 的最大特征值 → 1/ω₁² → 基频
def inverse_power_method(self, max_iter=200, tol=1e-12):
    phi = np.random.rand(self.n)
    for iteration in range(max_iter):
        y = linalg.solve(self.K, self.M @ phi)  # 注意：此处解 K·y = M·φ
        norm = np.sqrt(y.T @ self.M @ y)
        y /= norm
        lam = y.T @ self.K @ y / (y.T @ self.M @ y)
        if iteration > 0 and abs(lam - lam_old) / abs(lam) < tol:
            break
        phi = y.copy()
        lam_old = lam
    return np.sqrt(abs(lam)), phi, iteration + 1, elapsed
```

### A.4 QR方法求解广义特征值问题

```python
def qr_method(self):
    # Cholesky分解 M = L·Lᵀ
    L = linalg.cholesky(self.M, lower=True)
    L_inv = linalg.solve_triangular(L, np.eye(self.n), lower=True)
    # 转化为标准特征值问题: A·ψ = λ·ψ, A = L⁻¹·K·L⁻ᵀ
    A = L_inv @ self.K @ L_inv.T
    eigenvalues, eigenvectors_transformed = linalg.eigh(A)
    # 变换回原空间并 M-归一化
    eigenvectors = L_inv.T @ eigenvectors_transformed
    for i in range(self.n):
        norm = np.sqrt(eigenvectors[:, i].T @ self.M @ eigenvectors[:, i])
        eigenvectors[:, i] /= norm
    return np.sqrt(eigenvalues), eigenvectors
```

### A.5 经典四阶Runge-Kutta法

```python
def rk4_method(self, t_span, dt):
    t = np.arange(t_span[0], t_span[1] + dt, dt)
    y = np.zeros((2 * self.n, len(t)))
    for i in range(len(t) - 1):
        k1 = self.state_space_form(t[i], y[:, i])
        k2 = self.state_space_form(t[i] + dt/2, y[:, i] + dt*k1/2)
        k3 = self.state_space_form(t[i] + dt/2, y[:, i] + dt*k2/2)
        k4 = self.state_space_form(t[i] + dt, y[:, i] + dt*k3)
        y[:, i+1] = y[:, i] + dt * (k1 + 2*k2 + 2*k3 + k4) / 6
    return t, y[:self.n, :], y[self.n:, :]
```

### A.6 三次样条插值绘制振型

```python
def interpolate_mode(self, mode_shape, h_fine):
    h_nodes = self.floor_heights            # 离散楼层数值解
    mode_full = np.concatenate([[0], mode_shape])  # 加入地面固定端
    cs = CubicSpline(h_nodes, mode_full,
                     bc_type=((1, 0), (2, 0)))  # 底部固定边界条件
    return cs(h_fine)
```
