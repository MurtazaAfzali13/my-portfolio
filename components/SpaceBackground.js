"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const moonImageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const stars = [];
    const planets = [];

    // تبدیل HEX به RGBA
    const hexToRgba = (hex, alpha = 1) => {
      if (hex.startsWith('rgba')) return hex;
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return `rgba(255,255,255,${alpha})`;
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const moonImg = new Image();
    moonImg.src = "/images/moonlight.png";
    moonImageRef.current = moonImg;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // ایجاد ستاره‌ها
    const createStars = () => {
      stars.length = 0;
      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.6 + 0.4,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // ایجاد سیاره‌ها در مدار متحدالمرکز
    const createPlanets = () => {
      planets.length = 0;

      const planetTypes = [
        { radius: 12, color: "#ff6b6b", speed: 0.5, distance: 120, rings: true },
        { radius: 14, color: "#4ecdc4", speed: 0.4, distance: 180, rings: true },
        { radius: 10, color: "#ffe66d", speed: 0.6, distance: 250, rings: true },
        { radius: 12, color: "#ff9ff3", speed: 0.3, distance: 320, rings: false },
      ];

      planetTypes.forEach((type) => {
        planets.push({
          x: 0,
          y: 0,
          radius: type.radius,
          color: type.color,
          speed: type.speed,
          distance: type.distance,
          angle: Math.random() * Math.PI * 2,
          hasRings: type.rings,
          ringColor: type.rings ? `rgba(255, 255, 255, 0.3)` : null,
          pulse: Math.random() * 0.5 + 0.5,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      });
    };

    // مهتاب جذاب
    const drawMoon = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const moonRadius = 80;

      // هاله گسترده
      const globalLight = ctx.createRadialGradient(cx, cy, 0, cx, cy, 600);
      globalLight.addColorStop(0, "rgba(200,200,255,0.3)");
      globalLight.addColorStop(0.5, "rgba(150,150,255,0.15)");
      globalLight.addColorStop(1, "rgba(50,50,120,0)");
      ctx.fillStyle = globalLight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // هاله آبی مرکزی
      const blueHalo = ctx.createRadialGradient(cx, cy, 50, cx, cy, 300);
      blueHalo.addColorStop(0, "rgba(100,150,255,0.5)");
      blueHalo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = blueHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, 300, 0, Math.PI * 2);
      ctx.fill();

      // خود مهتاب
      const moonGradient = ctx.createRadialGradient(cx - 20, cy - 20, 0, cx, cy, moonRadius);
      moonGradient.addColorStop(0, "#ffffff");
      moonGradient.addColorStop(0.6, "#ccccff");
      moonGradient.addColorStop(1, "#7d51b7ff");
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // عکس مهتاب
      if (moonImg.complete && moonImg.naturalHeight !== 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, moonRadius - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.globalAlpha = 0.15;
        const imgSize = moonRadius * 2.2;
        ctx.drawImage(moonImg, cx - imgSize / 2, cy - imgSize / 2, imgSize, imgSize);
        ctx.restore();
        ctx.globalAlpha = 1;
      }
    };

    const darkenColor = (color, factor) => {
      const hex = color.replace("#", "");
      const num = parseInt(hex, 16);
      const amt = Math.round(2.55 * factor * 100);
      const R = (num >> 16) - amt;
      const G = ((num >> 8) & 0x00ff) - amt;
      const B = (num & 0x0000ff) - amt;
      return `#${(0x1000000 + (R < 0 ? 0 : R) * 0x10000 + (G < 0 ? 0 : G) * 0x100 + (B < 0 ? 0 : B)).toString(16).slice(1)}`;
    };

    const drawPlanets = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const time = Date.now() / 1000;

      planets.forEach((planet) => {
        planet.angle += planet.speed * 0.01;
        planet.x = cx + Math.cos(planet.angle) * planet.distance;
        planet.y = cy + Math.sin(planet.angle) * planet.distance;

        planet.pulse = 0.7 + Math.sin(time * planet.pulseSpeed) * 0.3;
        const currentRadius = planet.radius * planet.pulse;

        if (planet.hasRings) {
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(planet.x, planet.y, currentRadius * 2, currentRadius * 0.8, planet.angle, 0, Math.PI * 2);
          ctx.stroke();
        }

        const gradient = ctx.createRadialGradient(
          planet.x - currentRadius * 0.3,
          planet.y - currentRadius * 0.3,
          0,
          planet.x,
          planet.y,
          currentRadius
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, darkenColor(planet.color, 0.3));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // مدار سیاره‌ها
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(cx, cy, planet.distance, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    const drawStars = () => {
      const time = Date.now() / 1000;
      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const pulse = Math.sin(time * star.pulseSpeed) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity * pulse})`;
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#040416");
      gradient.addColorStop(0.2, "#0a0a2a");
      gradient.addColorStop(0.5, "#1a1a40");
      gradient.addColorStop(0.8, "#2d1b69");
      gradient.addColorStop(1, "#3d2b8c");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawMoon();
      drawStars();
      drawPlanets();

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    createPlanets();
    if (moonImg.complete) animate();
    moonImg.onload = () => animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
      createPlanets();
    });

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}
