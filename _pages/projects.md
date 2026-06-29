---
layout: page
title: Projects
permalink: /projects/
nav: true
nav_order: 2
nav_title_zh: 项目
description: Robotics research, embedded systems, engineering projects and coursework.
description_zh: 机器人研究、嵌入式系统、工程项目与课程项目作品集。
display_categories: ["Featured Research", "Selected Engineering", "Coursework"]
horizontal: false
---

<!-- pages/projects.md -->
<style>
  /* 统一项目卡片封面图为 16:9，裁剪填充，避免源图宽高比不一致导致卡片高度参差 */
  .card .card-img-top,
  .projects .card-img-top {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background-color: #f2f2f2;
  }
</style>
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
