// Footer band: Scrounger's own things in a row (a price tag, a house, a box, a car, search, the grid), cut like a line engraving in plain 2D canvas. Faint rules
// run across the band; inside the glyphs they thicken, and thicken again on the edge facing away from the light, so the
// glyphs look cut into the page. Drawn once per size and theme. Same engine as the Hermes landing; only the glyphs differ.
(function () {
  var band = document.querySelector('.word-band'), canvas = band && band.querySelector('canvas');
  if (!canvas) return;

  // Each glyph is drawn white on a 100 unit square.
  var GLYPHS = [
    function (c) { // a price tag
      c.save(); c.translate(50, 50); c.rotate(-Math.PI / 4);
      c.beginPath(); c.moveTo(-34, -16); c.lineTo(20, -16); c.lineTo(38, 0); c.lineTo(20, 16); c.lineTo(-34, 16); c.closePath(); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.arc(20, 0, 5, 0, 7); c.fill(); c.restore();
    },
    function (c) { // a place for rent
      c.beginPath(); c.moveTo(50, 14); c.lineTo(88, 46); c.lineTo(78, 46); c.lineTo(78, 86); c.lineTo(22, 86); c.lineTo(22, 46); c.lineTo(12, 46); c.closePath(); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.fillRect(42, 60, 16, 26);
    },
    function (c) { // a box from the curb
      c.beginPath(); c.moveTo(50, 14); c.lineTo(86, 30); c.lineTo(86, 72); c.lineTo(50, 88); c.lineTo(14, 72); c.lineTo(14, 30); c.closePath(); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.lineWidth = 4; c.beginPath(); c.moveTo(14, 30); c.lineTo(50, 46); c.lineTo(86, 30); c.moveTo(50, 46); c.lineTo(50, 88); c.stroke();
    },
    function (c) { // a car
      c.beginPath(); c.moveTo(12, 64); c.lineTo(12, 48); c.lineTo(28, 46); c.lineTo(38, 30); c.lineTo(66, 30); c.lineTo(78, 46); c.lineTo(88, 50); c.lineTo(88, 64); c.closePath(); c.fill();
      c.beginPath(); c.arc(30, 66, 10, 0, 7); c.arc(72, 66, 10, 0, 7); c.fill();
    },
    function (c) { // search
      c.lineWidth = 10; c.beginPath(); c.arc(42, 42, 24, 0, 7); c.stroke(); c.lineCap = 'round'; c.beginPath(); c.moveTo(60, 60); c.lineTo(84, 84); c.stroke();
    },
    function (c) { // the grid of listings
      for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) { c.beginPath(); c.roundRect(14 + i * 25, 14 + j * 25, 21, 21, 3); c.fill(); }
    }
  ];
  // Lays the glyphs out evenly across a w by h 2D context, in the given colour: one row, or two on a narrow band.
  function grid(w, h) {
    var n = GLYPHS.length, rows = w < h * 3 ? 2 : 1, per = Math.ceil(n / rows);
    return { rows: rows, per: per, cell: Math.min(h / rows * 0.86, w / per) };
  }
  function paint(c, w, h, colour) {
    var g = grid(w, h), gap = (w - g.cell * g.per) / g.per, rowH = h / g.rows;
    GLYPHS.forEach(function (draw, i) {
      var col = i % g.per, row = Math.floor(i / g.per);
      c.save(); c.translate(gap / 2 + col * (g.cell + gap), row * rowH + (rowH - g.cell) / 2 + rowH * 0.04); c.scale(g.cell / 100, g.cell / 100);
      c.fillStyle = c.strokeStyle = colour; draw(c); c.restore();
    });
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  function layer(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  // Horizontal rules `t` px thick, one every `pitch` px, kept only where `mask` is drawn (everywhere when null).
  function rules(w, h, pitch, t, colour, mask) {
    var c = layer(w, h), x = c.getContext('2d');
    x.fillStyle = colour;
    for (var y = 0; y < h; y += pitch) x.fillRect(0, Math.round(y + (pitch - t) / 2), w, Math.max(1, Math.round(t)));
    if (mask) { x.globalCompositeOperation = 'destination-in'; x.drawImage(mask, 0, 0); }
    return c;
  }
  var drawnW = 0;
  function draw() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    drawnW = w; canvas.width = w; canvas.height = h;
    var colour = getComputedStyle(band).color, pitch = Math.min(5 * dpr, Math.max(3 * dpr, grid(w, h).cell / 22)), s = Math.max(2, h * 0.014);
    var glyphs = layer(w, h); paint(glyphs.getContext('2d'), w, h, '#fff');
    // the shadow side: glyph pixels whose neighbour down and right is outside the glyph (light from the top left)
    var shade = layer(w, h), sc = shade.getContext('2d');
    sc.drawImage(glyphs, 0, 0); sc.globalCompositeOperation = 'destination-out'; sc.drawImage(glyphs, -s, -s);
    ctx.globalAlpha = 0.28; ctx.drawImage(rules(w, h, pitch, dpr * 0.75, colour, null), 0, 0);
    ctx.globalAlpha = 1; ctx.drawImage(rules(w, h, pitch, pitch * 0.32, colour, glyphs), 0, 0);
    ctx.drawImage(rules(w, h, pitch, pitch * 0.6, colour, shade), 0, 0);
    // fade out toward the legal line
    var g = ctx.createLinearGradient(0, h * 0.88, 0, h);
    g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-in'; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
  }
  band.classList.add('live');
  draw();
  // iOS fires resize as the toolbar slides; only a width change needs a redraw
  window.addEventListener('resize', function () { if (Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)) !== drawnW) draw(); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
})();
