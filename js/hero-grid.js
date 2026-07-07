(function () {
  function init() {
    var hero = document.getElementById('hero');
    var canvas = document.getElementById('texture-canvas');
    if (!hero || !canvas) return;

    var ctx = canvas.getContext('2d');
    var W, H, points, edges;
    var mouse = { x: -9999, y: -9999 };
    var target = { x: -9999, y: -9999 };
    var ease = 0.04;
    var glowRadius = 160;
    var spacing = 56;

    function dist(x1, y1, x2, y2) {
      var dx = x1 - x2, dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function buildGrid() {
      var rect = hero.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W; canvas.height = H;

      var cols = Math.ceil(W / spacing) + 1;
      var rows = Math.ceil(H / spacing) + 1;
      var grid = [];
      points = [];

      for (var r = 0; r < rows; r++) {
        grid.push([]);
        for (var c = 0; c < cols; c++) {
          var p = { x: c * spacing, y: r * spacing };
          points.push(p);
          grid[r].push(points.length - 1);
        }
      }

      edges = [];
      for (var r2 = 0; r2 < rows; r2++) {
        for (var c2 = 0; c2 < cols; c2++) {
          var idx = grid[r2][c2];
          if (c2 < cols - 1) edges.push([idx, grid[r2][c2 + 1]]);
          if (r2 < rows - 1) edges.push([idx, grid[r2 + 1][c2]]);
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);

      edges.forEach(function (e) {
        var p1 = points[e[0]], p2 = points[e[1]];
        var midx = (p1.x + p2.x) / 2, midy = (p1.y + p2.y) / 2;
        var d = dist(mouse.x, mouse.y, midx, midy);
        var t = Math.max(0, 1 - d / glowRadius);

        ctx.save();
        if (t > 0) {
          ctx.shadowBlur = 8 * t;
          ctx.shadowColor = 'rgba(70,150,230,' + (0.9 * t).toFixed(2) + ')';
        }
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.05 + t * 0.4).toFixed(2) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      });

      points.forEach(function (p) {
        var d = dist(mouse.x, mouse.y, p.x, p.y);
        var t = Math.max(0, 1 - d / glowRadius);

        ctx.save();
        if (t > 0) {
          ctx.shadowBlur = 14 * t;
          ctx.shadowColor = 'rgba(70,150,230,' + (0.95 * t).toFixed(2) + ')';
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + t * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (0.2 + t * 0.7).toFixed(2) + ')';
        ctx.fill();
        ctx.restore();
      });
    }

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', function () {
      target.x = -9999; target.y = -9999;
    });

    function loop() {
      mouse.x += (target.x - mouse.x) * ease;
      mouse.y += (target.y - mouse.y) * ease;
      render();
      requestAnimationFrame(loop);
    }

    buildGrid();
    loop();
    window.addEventListener('resize', function () { buildGrid(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();