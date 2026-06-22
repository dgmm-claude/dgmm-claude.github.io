---
layout: page
title: 非圆齿轮手摇发电机效率优化
description: 工程制造课程项目 · 实测数据驱动的非圆齿轮节曲线优化 + DXF 生成
img: assets/img/projects/preview.png
importance: 10
category: research
related_publications: false
---

工程制造课程项目。针对手摇发电机效率问题，基于**实测扭矩-转速数据**优化非圆齿轮节曲线，并自动生成可直接 3D 打印的 DXF 文件，完成实验样件验证。

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/preview.png" title="非圆齿轮 DXF 预览" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/ratio_analysis.png" title="传动比分析" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">左：生成的非圆齿轮 DXF；右：基于实测数据的传动比曲线分析。</div>

### 技术路线

- **数据驱动建模**：从手摇发电机实测 CSV（扭矩/转速/转角）反解最优瞬时传动比
- **节曲线设计**：根据变传动比构造非圆齿轮节曲线，保证与后端圆齿轮正确啮合（模数/压力角匹配）
- **参数化 DXF 生成**：Python (ezdxf + shapely) 一键生成，支持齿数、模数、压力角、轴孔自定义
- **3D 打印验证**：生成样件上机实测，闭环验证效率提升

> 技术栈：Python · numpy/scipy · matplotlib · ezdxf · shapely · 3D 打印
