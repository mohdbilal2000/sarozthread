/* Saroz Threadz — progressive enhancement only. The site works without JS. */
(function () {
  'use strict';

  /* Mobile drawer -------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) toggle.click();
    });
  }

  /* Sticky header hairline ---------------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* RFQ form → opens the visitor's mail client with a pre-filled message.
     No third-party form service, no data leaving the browser. Falls back to the
     plain mailto action if JS is off. ------------------------------------- */
  var rfq = document.getElementById('rfq');
  if (rfq) {
    rfq.addEventListener('submit', function (e) {
      var to = rfq.getAttribute('data-mailto');
      if (!to) return;
      e.preventDefault();
      var lines = [];
      Array.prototype.forEach.call(rfq.elements, function (el) {
        if (!el.name || !el.value) return;
        lines.push(el.name + ': ' + el.value);
      });
      lines.push('', '(Tech pack attached?)');
      var company = (rfq.elements['Company'] || {}).value || 'Manufacturing enquiry';
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Manufacturing enquiry — ' + company) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  /* Reveal on scroll ----------------------------------------------------- */
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.getAttribute('data-reveal'), 10) || 0;
      setTimeout(function () { el.classList.add('is-in'); }, delay);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });

  /* Safety net: nothing stays invisible because an observer never fired. */
  setTimeout(function () {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }, 3000);
})();
