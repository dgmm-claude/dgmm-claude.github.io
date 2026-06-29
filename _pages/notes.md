---
layout: page
title: Notes
permalink: /notes/
nav: true
nav_order: 3
nav_title_zh: 笔记
description: Research & engineering technical notes — robotics teleoperation, estimation, control, embedded hardware, and coursework.
description_zh: 机器人遥操、估计、控制与嵌入式硬件的技术笔记与工程/课程笔记。
---

<!-- pages/notes.md — merged Technical Notes + Engineering Archive -->
<div class="post">

  <div class="header-bar">
    <h2><span data-zh-text="全部笔记" data-en-text="All Notes">All Notes</span></h2>
    <p>
      <span data-zh-text="研究笔记 · 工程与课程笔记，原 Technical Notes 与 Engineering Archive 已合并于此。" data-en-text="Research notes · engineering & coursework notes. The former Technical Notes and Engineering Archive are merged here.">Research notes · engineering &amp; coursework notes. The former Technical Notes and Engineering Archive are merged here.</span>
    </p>
  </div>

  <p class="tag-category-list">
    <a href="#all-notes"><i class="fa-solid fa-list fa-sm"></i> <span data-zh-text="全部笔记" data-en-text="All Notes">All Notes</span></a> &nbsp;·&nbsp;
    <a href="#research-notes"><i class="fa-solid fa-microscope fa-sm"></i> <span data-zh-text="研究笔记" data-en-text="Research Notes">Research Notes</span></a> &nbsp;·&nbsp;
    <a href="#engineering-notes"><i class="fa-solid fa-gears fa-sm"></i> <span data-zh-text="工程笔记" data-en-text="Engineering Notes">Engineering Notes</span></a>
  </p>

  <a id="all-notes"></a>
  <h2 class="category"><span data-zh-text="全部笔记" data-en-text="All Notes">All Notes</span></h2>
  <ul class="post-list">
    {% assign all_notes = site.posts | sort: 'date' | reverse %}
    {% for note in all_notes %}
      {% include note_card.liquid %}
    {% endfor %}
  </ul>

  <a id="research-notes"></a>
  <h2 class="category"><span data-zh-text="研究笔记" data-en-text="Research Notes">Research Notes</span></h2>
  <ul class="post-list">
    {% assign research_notes = site.posts | where: 'category', 'research' | sort: 'date' | reverse %}
    {% for note in research_notes %}
      {% include note_card.liquid %}
    {% endfor %}
  </ul>

  <a id="engineering-notes"></a>
  <h2 class="category"><span data-zh-text="工程笔记" data-en-text="Engineering Notes">Engineering Notes</span></h2>
  <p>
    <span data-zh-text="较早期的工程与课程笔记（非圆齿轮、MOSFET 调试、模态分析等）。" data-en-text="Earlier engineering & coursework notes (non-circular gears, MOSFET debugging, modal analysis, …).">Earlier engineering &amp; coursework notes (non-circular gears, MOSFET debugging, modal analysis, …).</span>
  </p>
  <ul class="post-list">
    {% assign engineering_notes = site.posts | where: 'category', 'engineering' | sort: 'date' | reverse %}
    {% for note in engineering_notes %}
      {% include note_card.liquid %}
    {% endfor %}
  </ul>

</div>
