'use client';

import { useEffect, useRef } from 'react';
import styles from './ThreeDBackground.module.css';

const ThreeDBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const COLORS = [
      'rgba(34, 196, 112,',   // green primary
      'rgba(0, 240, 255,',    // cyan
      'rgba(168, 85, 247,',   // purple
      'rgba(94, 233, 161,',   // green light
    ];

    const particles = [];
    const particleCount = 160;

    class Particle {
      constructor() {
        this.reset(true);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial
          ? Math.random() * canvas.height
          : Math.random() * canvas.height;
        this.z = initial
          ? Math.random() * canvas.width
          : canvas.width;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.vz = -(Math.random() * 3 + 1);
        this.baseRadius = Math.random() * 1.5 + 0.5;
      }

      update() {
        // Subtle mouse parallax
        const mx = (mouseRef.current.x - canvas.width / 2) * 0.00005;
        const my = (mouseRef.current.y - canvas.height / 2) * 0.00005;

        this.x += this.vx + mx * this.z;
        this.y += this.vy + my * this.z;
        this.z += this.vz;

        if (this.z < 1) this.reset();
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }

      draw() {
        const scale = canvas.width / (this.z * 0.5 + canvas.width * 0.5);
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const r = Math.max(0.2, this.baseRadius * scale);
        const opacity = Math.min(1, (canvas.width - this.z) / canvas.width) * 0.85;

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
        gradient.addColorStop(0, `${this.color}${opacity})`);
        gradient.addColorStop(0.4, `${this.color}${opacity * 0.4})`);
        gradient.addColorStop(1, `${this.color}0)`);

        ctx.beginPath();
        ctx.arc(x, y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Solid core
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animId;
    const animate = () => {
      ctx.fillStyle = 'rgba(6, 6, 12, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default ThreeDBackground;
