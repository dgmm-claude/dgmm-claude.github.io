/*!
 * i18n.js — lightweight bilingual (English / 中文) layer for the al-folio site.
 * -------------------------------------------------------------------------
 * Design notes (no React/Vue/i18next, no translation API, no client-side
 * Markdown fetch):
 *
 *  • Language resolution priority:
 *        ?lang=en|zh  >  localStorage('lang')  >  'en' (default).
 *    The inline script in _layouts/default.liquid already resolves this BEFORE
 *    first paint and stamps <html data-lang>. This file reuses the same rule so
 *    toggling stays consistent, and performs the DOM text swaps.
 *
 *  • localStorage is only written (a) on an explicit user toggle, and
 *    (b) when an explicit ?lang= URL param is present on entry — so a shared
 *    link sticks for the session. localStorage NEVER overrides an explicit
 *    ?lang= param, because resolveLang() reads the URL first.
 *
 *  • Text swap: any element carrying data-zh-text gets its textContent set to
 *    data-zh-text (Chinese mode) or data-en-text (English mode). The English
 *    text is what Liquid renders by default, so the page is fully readable with
 *    JS disabled.
 *
 *  • Block visibility + notices are handled purely by CSS keyed on
 *    <html data-lang> (see default.liquid); this file only flips that attribute.
 *
 *  • CV page: when present, [data-cv-pdf] retargets the meta-refresh redirect to
 *    the language-appropriate PDF.
 *
 * Toggling does not reload the page and preserves dark mode, search, anchors,
 * code blocks, math, forward/back history (we use history.replaceState only).
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'en';

  function isLang(x) {
    return x === 'en' || x === 'zh';
  }

  function urlLang() {
    try {
      var p = new URLSearchParams(window.location.search).get('lang');
      if (isLang(p)) return p;
    } catch (e) {}
    return null;
  }

  function storedLang() {
    try {
      var s = window.localStorage.getItem('lang');
      if (isLang(s)) return s;
    } catch (e) {}
    return null;
  }

  function resolveLang() {
    return urlLang() || storedLang() || DEFAULT_LANG;
  }

  function applyLang(lang) {
    var html = document.documentElement;
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    // 1) Swap text on every bilingual node.
    var nodes = document.querySelectorAll('[data-zh-text]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = lang === 'zh' ? el.getAttribute('data-zh-text') : el.getAttribute('data-en-text');
      if (val != null && val !== '') el.textContent = val;
    }

    // 2) Update <title> / meta description for the active language (SEO nicety).
    //    English is the static default baked in by metadata.liquid; these metas
    //    (emitted in _layouts/default.liquid) let us swap to Chinese in zh mode.
    var tEn = document.querySelector('meta[name="i18n-title-en"]');
    var tZh = document.querySelector('meta[name="i18n-title-zh"]');
    var site = document.querySelector('meta[name="i18n-sitename"]');
    var sitename = site ? site.getAttribute('content') : '';
    if (tEn && tZh) {
      var t = (lang === 'zh' ? tZh.getAttribute('content') : tEn.getAttribute('content'));
      if (t) document.title = sitename ? t + ' | ' + sitename : t;
    }
    var dEn = document.querySelector('meta[name="i18n-desc-en"]');
    var dZh = document.querySelector('meta[name="i18n-desc-zh"]');
    var desc = document.querySelector('meta[name="description"]');
    if (desc && dEn && dZh) {
      desc.setAttribute('content', lang === 'zh' ? dZh.getAttribute('content') : dEn.getAttribute('content'));
    }

    // 3) Reflect active state on the EN | 中文 switcher.
    var toggles = document.querySelectorAll('[data-lang-toggle]');
    for (var j = 0; j < toggles.length; j++) {
      toggles[j].setAttribute('aria-pressed', toggles[j].getAttribute('data-lang-toggle') === lang ? 'true' : 'false');
    }

    // 4) CV page: retarget the no-JS meta-refresh redirect to the right PDF.
    var cv = document.querySelector('[data-cv-pdf]');
    if (cv) {
      var target = lang === 'zh' ? cv.getAttribute('data-zh') : cv.getAttribute('data-en');
      var meta = document.querySelector('meta[http-equiv="refresh"]');
      if (meta && target) {
        var c = meta.getAttribute('content');
        meta.setAttribute('content', c.replace(/url=\S*/i, 'url=' + target));
      }
    }
  }

  function persist(lang) {
    try {
      window.localStorage.setItem('lang', lang);
    } catch (e) {}
    // Keep the URL shareable & re-entry consistent without a full reload.
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('lang', lang);
      window.history.replaceState({}, '', u.toString());
    } catch (e) {}
  }

  function init() {
    var lang = resolveLang();
    // If the user arrived via an explicit ?lang= link, make it sticky.
    var fromUrl = urlLang();
    if (fromUrl) {
      try {
        window.localStorage.setItem('lang', fromUrl);
      } catch (e) {}
    }
    applyLang(lang);

    var toggles = document.querySelectorAll('[data-lang-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function (ev) {
        var target = ev.currentTarget.getAttribute('data-lang-toggle');
        if (!isLang(target)) return;
        applyLang(target);
        persist(target);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
