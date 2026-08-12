(function () {
  'use strict';

  function initResearchGalaxy() {
    var root = document.getElementById('research-galaxy-home');
    if (!root) return;

    document.body.classList.add('research-galaxy-index');
    var items = document.querySelectorAll('.rg-reveal');

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (item) { observer.observe(item); });
  }

  function boot() {
    document.body.classList.remove('research-galaxy-index');
    initResearchGalaxy();
  }

  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('pjax:complete', boot);
})();
