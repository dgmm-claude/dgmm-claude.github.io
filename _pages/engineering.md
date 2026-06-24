---
layout: page
permalink: /engineering/
title: Engineering Archive
nav: true
nav_order: 4
description: Older engineering and coursework notes — non-circular gears, MOSFET debugging, modal analysis.
---

<div class="post">

<p>Earlier engineering and coursework notes, kept separate from the robotics <a href="/blog/">Technical Notes</a>.</p>

<ul class="post-list">
{% assign postlist = site.posts | where: "category", "engineering" %}
{% for post in postlist %}
{% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
<li>
  <h3>
    <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </h3>
  <p>{{ post.description }}</p>
  <p class="post-meta">
    {{ read_time }} min read &nbsp; · &nbsp; {{ post.date | date: "%B %d, %Y" }}
  </p>
</li>
{% endfor %}
</ul>

</div>
