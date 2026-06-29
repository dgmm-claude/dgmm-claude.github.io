---
translation_key: _documentation_only
lang: en
---

<!-- This file documents the bilingual FULL-TEXT storage mechanism. It is a
     collection doc with output:false, so it never generates a public page and is
     never matched by any real page (its translation_key is _documentation_only).
     Do not delete it; it is the in-repo reference for adding translations. -->

# Bilingual full-text storage (`_i18n_content/`)

This collection holds the **second-language FULL TEXT** of a project or note,
so the same detail-page URL can serve both languages without a duplicate public
page. The first-language body lives in the normal file
(`_projects/*.md` / `_posts/*.md`); the second-language body lives here.

The detail layouts (`_layouts/post.liquid`, `_layouts/project.liquid`) look up a
translation by matching **`translation_key`** + **`lang`**:

```
site.i18n_content | where: "translation_key", page.translation_key
                   | where: "lang", <other language> | first
```

`has_zh_content` / `has_en_content` (in the source file's front matter) tell the
layout whether to expect a second body and which notice (if any) to show.

## How to add a translation

1. The source file (e.g. `_posts/2026-06-20-dual-arm-imu-teleop-inverse-kinematics.md`)
   keeps its Chinese body and already has `translation_key: dual-arm-imu-teleop-inverse-kinematics`,
   `body_lang: zh`, `has_zh_content: true`, `has_en_content: false`.
2. Write the English full text into a new file here, e.g.
   `_i18n_content/dual-arm-imu-teleop-inverse-kinematics.en.md`, with front matter:

```yaml
---
translation_key: dual-arm-imu-teleop-inverse-kinematics
lang: en
---
```

   The body is ordinary Markdown — figures (`{% include figure.liquid ... %}`),
   math, code blocks, tables and internal links all work, exactly like a normal
   post/project body.
3. In the source file, flip `has_en_content: false` → `has_en_content: true`.

That is all. No URL changes, no duplicate page: English mode renders the
`_i18n_content` body, Chinese mode renders the in-file body, both gated by
`<html data-lang>` (see `_layouts/default.liquid`).

The reverse case (English body in-file, Chinese body here) uses
`body_lang: en` + a `.zh.md` file with `lang: zh`.
