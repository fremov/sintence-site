// Карусель скриншотов. Без этого файла карусель — лента со scroll-snap.
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.carousel').forEach(function (root) {
    var track = root.querySelector('.track');
    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) return;
    root.classList.add('js');
    var cur = 0, timer = null, hover = false, focus = false;

    function btn(cls, label, text) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = cls; b.setAttribute('aria-label', label); b.textContent = text;
      return b;
    }
    var prev = btn('nav-btn prev', root.dataset.prev || 'Previous', '←');
    var next = btn('nav-btn next', root.dataset.next || 'Next', '→');
    var dots = document.createElement('div');
    dots.className = 'dots';
    slides.forEach(function (s, i) {
      s.setAttribute('aria-roledescription', 'slide');
      s.setAttribute('aria-label', (i + 1) + ' / ' + slides.length);
      var d = btn('dot', (root.dataset.dot || 'Slide') + ' ' + (i + 1), '');
      d.addEventListener('click', function () { go(i); });
      dots.appendChild(d);
    });
    var bar = document.createElement('div');
    bar.className = 'controls';
    bar.appendChild(prev); bar.appendChild(dots); bar.appendChild(next);
    root.appendChild(bar);

    function mark(i) {
      cur = i;
      Array.prototype.forEach.call(dots.children, function (d, k) {
        if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function go(i) {
      i = (i + slides.length) % slides.length;
      var left = slides[i].offsetLeft - track.offsetLeft;
      track.scrollTo({ left: left, behavior: reduce && reduce.matches ? 'auto' : 'smooth' });
      mark(i);
      // Если плавная прокрутка не сработала (браузер её не анимирует) — перейти сразу.
      setTimeout(function () {
        if (cur === i && Math.abs(track.scrollLeft - left) > 2) track.scrollTo({ left: left, behavior: 'auto' });
      }, 900);
    }
    prev.addEventListener('click', function () { go(cur - 1); });
    next.addEventListener('click', function () { go(cur + 1); });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault(); }
    });
    // Свайп и прокрутка ленты — текущий слайд по ближайшему к левому краю.
    var t = null;
    track.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var x = track.scrollLeft, best = 0, bd = Infinity;
        slides.forEach(function (s, i) {
          var dd = Math.abs(s.offsetLeft - track.offsetLeft - x);
          if (dd < bd) { bd = dd; best = i; }
        });
        mark(best);
      }, 80);
    }, { passive: true });

    function tick() { if (!hover && !focus && !(reduce && reduce.matches) && !document.hidden) go(cur + 1); }
    function start() { stop(); timer = setInterval(tick, 5000); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    root.addEventListener('mouseenter', function () { hover = true; });
    root.addEventListener('mouseleave', function () { hover = false; });
    root.addEventListener('focusin', function () { focus = true; });
    root.addEventListener('focusout', function () { focus = false; });
    root.addEventListener('touchstart', function () { start(); }, { passive: true });
    mark(0);
    start();
  });
})();
