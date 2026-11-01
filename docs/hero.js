// Hero wall: Scrounger's grid, live. The newest Vancouver posts with photos, straight from Scrounger's own API;
// each card swaps in a fresh post every few seconds. Every string is a stranger's, so textContent only.
(function () {
  var wall = document.getElementById('lwall'); if (!wall) return;
  var w = innerWidth, cols = w <= 760 ? 2 : w <= 1100 ? 3 : 4, n = cols * (w <= 560 ? 4 : 3);
  var API = 'https://curbside-api.trommatic.workers.dev/api/search?city=vancouver&sort=date';
  var el = function (t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  var ago = function (t) { var m = Math.max(1, Math.round((Date.now() / 1000 - t) / 60)); return m < 60 ? m + 'm' : Math.round(m / 60) + 'h'; };
  fetch(API).then(function (r) { return r.json(); }).then(function (d) {
    var items = (d.items || []).filter(function (it) { return it.thumb && it.priceString && it.title; });
    if (items.length < n) return; // nothing to show beats a half-empty wall
    var k = 0, cards = [];
    function fill(c, fresh) {
      var it = items[k++ % items.length];
      c.img.src = it.thumb.replace('_300x300', '_600x450'); c.price.firstChild.textContent = it.priceString;
      c.title.textContent = it.title; c.sub.textContent = [it.location, ago(it.postedDate)].filter(Boolean).join(' · ');
      c.a.classList.toggle('new', !!fresh);
    }
    for (var i = 0; i < n; i++) {
      var a = el('div', 'lc'), m = el('div', 'lc-meta'), c = { a: a };
      a.appendChild(c.img = el('img')); c.img.alt = ''; c.img.decoding = 'async';
      c.price = el('span', 'lc-price', ' '); c.price.appendChild(el('span', 'lc-new', 'New'));
      m.appendChild(c.price); m.appendChild(c.title = el('span', 'lc-title')); m.appendChild(c.sub = el('span', 'lc-sub'));
      a.appendChild(m); fill(c); wall.appendChild(a); cards.push(c);
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cards.forEach(function (c, j) {
      (function loop() {
        setTimeout(function () {
          c.a.classList.add('out');
          setTimeout(function () { fill(c, true); c.a.classList.remove('out'); loop(); }, 380);
        }, 3800 + j * 600 + Math.random() * 3000);
      })();
    });
  }).catch(function () {});
})();

// Hero parallax: the wall drifts at 0.45, the copy lifts at 0.2 and fades. Off under reduced motion.
(function () {
  var bg = document.querySelector('.hero-bg'), copy = document.querySelector('.hero .inner');
  if (!bg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var t = 0;
  addEventListener('scroll', function () {
    if (t) return;
    t = requestAnimationFrame(function () {
      t = 0; var y = scrollY, h = innerHeight; if (y > h * 1.2) return;
      bg.style.setProperty('--py', (y * .45) + 'px');
      copy.style.transform = 'translate3d(0,' + (y * .2) + 'px,0)'; copy.style.opacity = Math.max(0, 1 - y / (h * .7));
    });
  }, { passive: true });
})();
