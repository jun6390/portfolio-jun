"use client";

import { useEffect, useRef } from "react";

type MouseState = {
  x: number;
  y: number;
  radius: number;
};

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;

  constructor(width: number, height: number, dpr: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseVx = (Math.random() - 0.5) * 0.6 * dpr;
    this.baseVy = (Math.random() - 0.5) * 0.6 * dpr;
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    this.radius = (Math.random() * 1.5 + 0.5) * dpr;
    this.alpha = Math.random() * 0.5 + 0.15;
  }

  update(width: number, height: number, mouse: MouseState, dpr: number) {
    if (this.x < 0 || this.x > width) {
      this.baseVx *= -1;
      this.vx *= -1;
      this.x = Math.max(0, Math.min(this.x, width));
    }

    if (this.y < 0 || this.y > height) {
      this.baseVy *= -1;
      this.vy *= -1;
      this.y = Math.max(0, Math.min(this.y, height));
    }

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0 && distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;

      this.vx += -forceDirectionX * force * 3 * dpr;
      this.vy += -forceDirectionY * force * 3 * dpr;
    }

    this.vx += (this.baseVx - this.vx) * 0.04;
    this.vy += (this.baseVy - this.vy) * 0.04;

    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed = 4 * dpr;

    if (currentSpeed > maxSpeed) {
      this.vx = (this.vx / currentSpeed) * maxSpeed;
      this.vy = (this.vy / currentSpeed) * maxSpeed;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = isDark
      ? `rgba(255, 255, 255, ${this.alpha})`
      : `rgba(0, 0, 0, ${this.alpha})`;
    ctx.fill();
  }
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let animationFrameId: number;
    let particles: Particle[] = [];
    let cachedRect = canvas.getBoundingClientRect();
    let cachedDpr = window.devicePixelRatio || 1;
    let cachedIsDark = document.documentElement.classList.contains("dark");

    const themeObserver = new MutationObserver(() => {
      cachedIsDark = document.documentElement.classList.contains("dark");
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const initParticles = (
      logicalWidth: number,
      logicalHeight: number,
      dpr: number,
    ) => {
      particles = [];

      const canvasWidth = logicalWidth * dpr;
      const canvasHeight = logicalHeight * dpr;
      const logicalArea = logicalWidth * logicalHeight;

      let count = Math.floor(logicalArea / 12000);
      count = Math.max(20, Math.min(count, 150));

      for (let index = 0; index < count; index += 1) {
        particles.push(new Particle(canvasWidth, canvasHeight, dpr));
      }
    };

    const resizeCanvas = () => {
      cachedRect = canvas.getBoundingClientRect();
      cachedDpr = window.devicePixelRatio || 1;

      canvas.width = cachedRect.width * cachedDpr;
      canvas.height = cachedRect.height * cachedDpr;

      mouseRef.current.radius = 140 * cachedDpr;

      initParticles(cachedRect.width, cachedRect.height, cachedDpr);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      for (const particle of particles) {
        particle.update(canvas.width, canvas.height, mouse, cachedDpr);
        particle.draw(ctx, cachedIsDark);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX - cachedRect.left) * cachedDpr;
      mouseRef.current.y = (event.clientY - cachedRect.top) * cachedDpr;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
