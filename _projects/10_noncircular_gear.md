---
layout: page
title: "Hand-Crank Generator Efficiency via Non-Circular Gears"
description: "Manufacturing course project · data-driven · non-circular gear ratio narrows the efficiency spread by 73 percent"
img: assets/img/projects/65_gear_design.png
importance: 10
category: Coursework
related_publications: false
---

> **English summary:** A manufacturing-engineering course project optimizing a hand-crank generator with a non-circular gear whose transmission ratio varies continuously with crank angle, locking the operating point in the high-efficiency region instead of sweeping across high and low efficiency each revolution. Driven by measured torque-speed data from an 83KV motor (100 ms synchronous sampling), the instantaneous optimal ratio is inverted from CSV logs, the pitch curve is designed to mesh with a circular gear, and a parameterized DXF (ezdxf + shapely) is 3D-printed for validation. The efficiency spread narrows by about 73% and the minimum efficiency rises from 85.67% to 92.86% — raising the floor, not the peak.

工程制造课程项目。手摇发电机的痛点是：固定传动比下发电机工作点随曲柄角度漂移，无法始终停在高效区。本项目引入**非圆齿轮变传动比**，让传动比随角度连续变化，主动把工作点"锁"在高效区。基于实测扭矩-转速数据优化节曲线，自动生成可 3D 打印的 DXF，并完成样件上机验证。

### 核心成果（实测驱动）

| 指标 | 固定传动比（基准） | 非圆齿轮优化 | 改善 |
|------|------------------|-------------|------|
| 效率波动 | 9.72 pp（85.67%~95.39%） | 2.64 pp（92.86%~95.50%） | **缩小 ~73%** |
| 最低效率 | 85.67% | 92.86% | **+7.19 pp** |
| 平均效率 | 92.90% | 94.90% | +2.01 pp |

关键不是"拔高峰值"，而是**压缩波动、抬升下限**——让每一圈都在高效区，而非在高低效之间反复横跳。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/65_gear_design.png" title="非圆齿轮设计" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/ratio_analysis.png" title="传动比分析" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/66_gear_efficiency.png" title="效率对比" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：参数化生成的非圆齿轮（ezdxf + shapely）；中：基于实测数据的传动比曲线分析；右：优化前后效率对比。</div>

### 技术路线

- **数据驱动建模**：83KV 无刷电机，100 ms 同步采集扭矩 / 转速 / 转角，反解最优瞬时传动比
- **节曲线设计**：根据变传动比构造非圆齿轮节曲线，保证与圆齿轮正确啮合（模数 / 压力角匹配）
- **参数化 DXF**：Python（ezdxf + shapely）一键生成，齿数 / 模数 / 压力角 / 轴孔可定制
- **3D 打印闭环**：生成样件上机实测，验证效率提升

> 技术栈：Python · numpy/scipy · matplotlib · ezdxf · shapely · 3D 打印 ｜ 延伸阅读：[非圆齿轮效率优化](/engineering/noncircular-gear-efficiency/)、[节曲线制造工艺](/engineering/noncircular-gear-manufacturing/)
