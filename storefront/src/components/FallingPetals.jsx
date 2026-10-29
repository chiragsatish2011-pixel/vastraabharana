import React, { useEffect, useRef } from 'react';

export const FallingPetals = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Realistic festive Indian petals: Marigold gold/saffron, lotus rose, jasmine cream
    const petalColors = [
      { r: 245, g: 158, b: 11, a: 0.85 },  // Warm Saffron Marigold
      { r: 234, g: 88,  b: 12, a: 0.80 },  // Deep Orange
      { r: 251, g: 191, b: 36, a: 0.85 },  // Golden Yellow
      { r: 251, g: 113, b: 133, a: 0.75 }, // Soft Rose/Lotus Pink
      { r: 244, g: 63,  b: 94, a: 0.70 },  // Festive Carmine Pink
      { r: 254, g: 243, b: 199, a: 0.90 }  // Ivory Jasmine
    ];

    const petalCount = 18;
    const petals = [];
    let isVisible = true;

    // Pause animation when scrolled offscreen to conserve CPU/RAM on low-end machines
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    class Petal {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        // Spawn from upper-right area
        this.x = initial ? Math.random() * width : width * (0.65 + Math.random() * 0.45);
        this.y = initial ? Math.random() * height : -20 - Math.random() * 40;

        // Size: delicate and realistic (8px to 14px)
        this.size = 8 + Math.random() * 6;
        this.aspect = 0.55 + Math.random() * 0.35;

        // Slow, gentle, realistic descent: ALWAYS downward (vy strictly positive)
        this.vy = 0.38 + Math.random() * 0.45; // Slow downward fall
        this.vx = -(0.45 + Math.random() * 0.65); // Gentle leftward drift

        // Gentle oscillation (purely horizontal sway, no sudden upward jerk)
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.015 + Math.random() * 0.02;
        this.swayAmp = 0.35 + Math.random() * 0.45;

        // Flutter rotation
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.02;

        this.pitch = Math.random() * Math.PI;
        this.vPitch = 0.015 + Math.random() * 0.025;

        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.opacity = 0.6 + Math.random() * 0.35;
      }

      update() {
        this.pitch += this.vPitch;
        this.angle += this.vAngle;
        this.sway += this.swaySpeed;

        // Smooth horizontal drift with gentle sway
        this.x += this.vx + Math.sin(this.sway) * this.swayAmp;
        
        // Strict downward fall: NEVER moves up
        this.y += this.vy;

        // Re-spawn smoothly once past bottom or left edge
        if (this.y > height + 20 || this.x < -30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // 3D tilt scaling
        const scaleX = Math.cos(this.pitch);
        const scaleY = 1;
        ctx.scale(scaleX, scaleY);

        // Draw organic teardrop / almond petal
        ctx.beginPath();
        const w = this.size * this.aspect;
        const h = this.size;

        ctx.moveTo(0, -h);
        ctx.bezierCurveTo(w, -h * 0.5, w * 1.2, h * 0.5, 0, h);
        ctx.bezierCurveTo(-w * 1.2, h * 0.5, -w, -h * 0.5, 0, -h);

        const { r, g, b, a } = this.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * this.opacity})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
        ctx.shadowBlur = 3;
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize petals
    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal(true));
    }

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[25]"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
