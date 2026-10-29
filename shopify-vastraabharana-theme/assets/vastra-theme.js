// Vastra Abharana - Zero-Lag Shopify Theme Runtime
(function() {
  'use strict';

  // Cart Drawer Controls
  window.openVastraCart = function() {
    const drawer = document.getElementById('vastra-cart-drawer');
    if (drawer) {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeVastraCart = function() {
    const drawer = document.getElementById('vastra-cart-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // Shopify AJAX Add to Cart
  window.vastraAddToCart = function(variantId, quantity = 1) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: quantity })
    })
    .then(res => res.json())
    .then(data => {
      // Refresh cart count
      fetch('/cart.js')
        .then(res => res.json())
        .then(cart => {
          const countEl = document.getElementById('header-cart-count');
          if (countEl) countEl.textContent = cart.item_count;
          window.openVastraCart();
        });
    })
    .catch(err => {
      console.error('Cart error:', err);
      window.location.href = '/cart';
    });
  };

  // Zero-Lag Hero Parallax on GPU
  const textLayer = document.getElementById('hero-text-layer');
  const modelLayer = document.getElementById('hero-model-layer');

  if (textLayer || modelLayer) {
    let rafId;
    window.addEventListener('mousemove', function(e) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function() {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        if (textLayer) textLayer.style.transform = 'translate3d(' + (x * -8) + 'px, ' + (y * -5) + 'px, 0)';
        if (modelLayer) modelLayer.style.transform = 'translate3d(' + (x * 6) + 'px, ' + (y * 4) + 'px, 0)';
      });
    }, { passive: true });
  }

  // Lightweight Falling Petals Canvas (18 petals, pauses when offscreen)
  const canvas = document.getElementById('hero-petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    window.addEventListener('resize', function() {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    const colors = [
      { r: 245, g: 158, b: 11, a: 0.85 },
      { r: 234, g: 88,  b: 12, a: 0.80 },
      { r: 251, g: 191, b: 36, a: 0.85 },
      { r: 251, g: 113, b: 133, a: 0.75 },
      { r: 254, g: 243, b: 199, a: 0.90 }
    ];

    const petals = [];
    for (let i = 0; i < 18; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 6,
        vy: 0.4 + Math.random() * 0.4,
        vx: -(0.3 + Math.random() * 0.5),
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let isVisible = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        isVisible = entries[0].isIntersecting;
        if (isVisible) render();
      }, { threshold: 0.1 });
      observer.observe(canvas);
    }

    function render() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * 0.4;
        p.y += p.vy;

        if (p.y > height + 20 || p.x < -20) {
          p.x = width * (0.6 + Math.random() * 0.5);
          p.y = -20;
        }

        ctx.fillStyle = 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + p.color.a + ')';
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size * 0.6, p.size, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    }

    render();
  }

})();
