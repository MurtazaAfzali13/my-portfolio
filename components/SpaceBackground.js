// app/components/SpaceBackground.jsx
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
    const shootingStars = [];

    // تابع کمکی برای تبدیل رنگ hex به rgba
    const hexToRgba = (hex, alpha = 1) => {
      // اگر رنگ از قبل rgba بود، آن را برگردان
      if (hex.startsWith('rgba')) return hex;
      
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return `rgba(255, 255, 255, ${alpha})`;
      
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // لود کردن عکس مهتاب
    const moonImg = new Image();
    moonImg.src = "/images/picture.jpg";
    moonImageRef.current = moonImg;

    // تنظیم اندازه کانوا
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // ایجاد ستاره‌ها با حرکت چند جهتی
    const createStars = () => {
      stars.length = 0;
      const starCount = Math.min(
        400,
        Math.floor((window.innerWidth * window.innerHeight) / 2500)
      );

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const movementType = Math.floor(Math.random() * 4);

        let speedX, speedY, orbitRadius, orbitSpeed, orbitCenterX, orbitCenterY;

        if (movementType === 0 && Math.random() < 0.25) {
          orbitCenterX = canvas.width / 2;
          orbitCenterY = canvas.height / 2;
          orbitRadius =
            Math.random() * Math.min(canvas.width, canvas.height) * 0.3 + 150;
          orbitSpeed = (Math.random() - 0.5) * 0.03;
          speedX = 0;
          speedY = 0;
        } else {
          speedX = (Math.random() - 0.5) * 0.6;
          speedY = (Math.random() - 0.5) * 0.4;
          orbitRadius = 0;
          orbitSpeed = 0;
          orbitCenterX = 0;
          orbitCenterY = 0;
        }

        stars.push({
          x,
          y,
          radius: Math.random() * 1.8 + 0.3,
          speedX,
          speedY,
          opacity: Math.random() * 0.8 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          originalX: x,
          originalY: y,
          driftDistance: Math.random() * 25 + 8,
          driftSpeed: Math.random() * 0.015 + 0.005,
          driftAngle: Math.random() * Math.PI * 2,
          movementType,
          orbitRadius,
          orbitSpeed,
          orbitCenterX,
          orbitCenterY,
          orbitAngle: Math.random() * Math.PI * 2,
          waveAmplitude: Math.random() * 12 + 3,
          waveSpeed: Math.random() * 0.02 + 0.005,
          wavePhase: Math.random() * Math.PI * 2,
          spiralRadius: Math.random() * 50 + 20,
          spiralSpeed: Math.random() * 0.01 + 0.005,
          spiralAngle: Math.random() * Math.PI * 2,
        });
      }
    };

    // ایجاد سیاره‌ها
    const createPlanets = () => {
      planets.length = 0;

      const planetTypes = [
        { radius: 12, color: "#ff6b6b", speed: 0.5, distance: 120, rings: true },
        {
          radius: 14,
          color: "#4ecdc4",
          speed: 0.5,
          distance: 180,
          rings: true,
        },
        {
          radius: 10,
          color: "#ffe66d",
          speed: 0.5,
          distance: 250,
          rings: true,
        },
        { radius: 12, color: "#ff9ff3", speed: 0.8, distance: 320, rings: false },
        {
          radius: 14,
          color: "#54a0ff",
          speed: 0.2,
          distance: 400,
          rings: true,
        },
        {
          radius: 14,
          color: "#27b4cdff",
          speed: 0.3,
          distance: 480,
          rings: true,
        },
        {
          radius: 11,
          color: "#00d2d3",
          speed: 0.6,
          distance: 550,
          rings: true,
        },
        {
          radius: 12,
          color: "#ff9f43",
          speed: 0.8,
          distance: 620,
          rings: true,
        },
      ];

      planetTypes.forEach((type, index) => {
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

    // ایجاد شهاب‌سنگ‌ها
    const createShootingStar = () => {
      if (Math.random() < 0.02 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 60 + 40,
          speed: Math.random() * 12 + 8,
          opacity: 1,
          decay: Math.random() * 0.015 + 0.005,
        });
      }
    };

    // رسم مهتاب با عکس
    const drawMoon = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const moonRadius = 80;

      // لایه اول - نور گسترده در کل صفحه
      const globalLight = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height) * 0.9
      );
      globalLight.addColorStop(0, "rgba(120, 120, 220, 0.2)");
      globalLight.addColorStop(0.2, "rgba(100, 100, 200, 0.15)");
      globalLight.addColorStop(0.5, "rgba(80, 60, 180, 0.08)");
      globalLight.addColorStop(1, "rgba(40, 20, 120, 0)");

      ctx.fillStyle = globalLight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // لایه دوم - هاله بنفش-آبی
      const purpleHalo = ctx.createRadialGradient(
        centerX,
        centerY,
        100,
        centerX,
        centerY,
        500
      );
      purpleHalo.addColorStop(0, "rgba(147, 112, 219, 0.4)");
      purpleHalo.addColorStop(0.6, "rgba(75, 0, 130, 0.2)");
      purpleHalo.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = purpleHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 500, 0, Math.PI * 2);
      ctx.fill();

      // لایه سوم - هاله آبی
      const blueHalo = ctx.createRadialGradient(
        centerX,
        centerY,
        80,
        centerX,
        centerY,
        300
      );
      blueHalo.addColorStop(0, "rgba(65, 105, 225, 0.5)");
      blueHalo.addColorStop(0.8, "rgba(30, 144, 255, 0.2)");
      blueHalo.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = blueHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 300, 0, Math.PI * 2);
      ctx.fill();

      // لایه چهارم - هاله سفید (مهتاب اصلی)
      const moonHalo = ctx.createRadialGradient(
        centerX,
        centerY,
        50,
        centerX,
        centerY,
        180
      );
      moonHalo.addColorStop(0, "rgba(255, 255, 255, 0.34)");
      moonHalo.addColorStop(0.7, "rgba(255, 255, 255, 0.4)");
      moonHalo.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = moonHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fill();

      // خود مهتاب - پایه سفید
      const moonGradient = ctx.createRadialGradient(
        centerX - 20,
        centerY - 20,
        0,
        centerX,
        centerY,
        moonRadius
      );
      moonGradient.addColorStop(0, "#749f08ff");
      moonGradient.addColorStop(0.6, "#12ee8bff");
      moonGradient.addColorStop(1, "#7d51b7ff");

      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // رسم عکس در مهتاب
      if (moonImg.complete && moonImg.naturalHeight !== 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, moonRadius - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.globalAlpha = 0.15;
        const imgSize = moonRadius * 2.2;
        const imgX = centerX - imgSize / 2;
        const imgY = centerY - imgSize / 2;
        ctx.drawImage(moonImg, imgX, imgY, imgSize, imgSize);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      // جزئیات روی مهتاب
      ctx.fillStyle = "rgba(210, 210, 230, 0.4)";
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY - 20, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 30, centerY + 25, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX + 15, centerY - 30, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    // تابع برای تیره کردن رنگ
    const darkenColor = (color, factor) => {
      const hex = color.replace("#", "");
      const num = parseInt(hex, 16);
      const amt = Math.round(2.55 * factor * 100);
      const R = (num >> 16) - amt;
      const G = ((num >> 8) & 0x00ff) - amt;
      const B = (num & 0x0000ff) - amt;
      return `#${(
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)}`;
    };

    // رسم سیاره‌ها
    const drawPlanets = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() / 1000;

      planets.forEach((planet) => {
        planet.angle += planet.speed * 0.01;
        planet.x = centerX + Math.cos(planet.angle) * planet.distance;
        planet.y = centerY + Math.sin(planet.angle) * planet.distance;

        planet.pulse = 0.7 + Math.sin(time * planet.pulseSpeed) * 0.3;
        const currentRadius = planet.radius * planet.pulse;

        if (planet.hasRings) {
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(
            planet.x,
            planet.y,
            currentRadius * 2,
            currentRadius * 0.8,
            planet.angle,
            0,
            Math.PI * 2
          );
          ctx.stroke();

          ctx.strokeStyle = planet.ringColor.replace("0.3", "0.2");
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(
            planet.x,
            planet.y,
            currentRadius * 2.5,
            currentRadius * 1,
            planet.angle,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        const planetGradient = ctx.createRadialGradient(
          planet.x - currentRadius * 0.3,
          planet.y - currentRadius * 0.3,
          0,
          planet.x,
          planet.y,
          currentRadius
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, darkenColor(planet.color, 0.3));

        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // حل مشکل اینجا - استفاده از hexToRgba برای تبدیل صحیح رنگ
        const glow = ctx.createRadialGradient(
          planet.x,
          planet.y,
          0,
          planet.x,
          planet.y,
          currentRadius * 2
        );
        glow.addColorStop(0, hexToRgba(planet.color, 0.25)); // 0.25 = 25% opacity
        glow.addColorStop(1, hexToRgba(planet.color, 0));   // 0 = کاملا شفاف

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, currentRadius * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    // رسم ستاره‌ها با حرکت چند جهتی
    const drawStars = () => {
      const time = Date.now() / 1000;

      stars.forEach((star) => {
        let newX = star.x;
        let newY = star.y;

        switch (star.movementType) {
          case 0:
            star.orbitAngle += star.orbitSpeed;
            newX =
              star.orbitCenterX + Math.cos(star.orbitAngle) * star.orbitRadius;
            newY =
              star.orbitCenterY + Math.sin(star.orbitAngle) * star.orbitRadius;

            const waveOffset =
              Math.sin(time * star.waveSpeed + star.wavePhase) *
              star.waveAmplitude;
            newX += Math.cos(star.orbitAngle + Math.PI / 2) * waveOffset;
            newY += Math.sin(star.orbitAngle + Math.PI / 2) * waveOffset;
            break;

          case 1:
            star.spiralAngle += star.spiralSpeed;
            newX =
              star.originalX + Math.cos(star.spiralAngle) * star.spiralRadius;
            newY =
              star.originalY + Math.sin(star.spiralAngle) * star.spiralRadius;
            star.spiralRadius += Math.sin(time * 0.001) * 0.1;
            break;

          case 2:
            star.driftAngle += star.driftSpeed;
            const randomMoveX = Math.cos(star.driftAngle) * star.driftDistance;
            const randomMoveY = Math.sin(star.driftAngle) * star.driftDistance;

            newX =
              star.originalX +
              randomMoveX +
              Math.sin(time * star.waveSpeed) * star.waveAmplitude;
            newY =
              star.originalY +
              randomMoveY +
              Math.cos(time * star.waveSpeed * 0.7) * star.waveAmplitude;
            break;

          case 3:
            const waveX =
              Math.sin(time * star.waveSpeed + star.wavePhase) *
              star.waveAmplitude;
            const waveY =
              Math.cos(time * star.waveSpeed * 1.3 + star.wavePhase) *
              star.waveAmplitude *
              0.7;
            newX = star.originalX + waveX;
            newY = star.originalY + waveY;
            break;
        }

        newX += star.speedX;
        newY += star.speedY;

        star.x = newX;
        star.y = newY;

        if (
          star.x < -100 ||
          star.x > canvas.width + 100 ||
          star.y < -100 ||
          star.y > canvas.height + 100
        ) {
          star.x = star.originalX;
          star.y = star.originalY;
        }

        const pulse = Math.sin(time * star.pulseSpeed) * 0.4 + 0.6;
        const currentOpacity = star.opacity * pulse;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (star.radius > 1.2) {
          const glow = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 3
          );
          glow.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          glow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glow;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        }

        ctx.fill();
      });
    };

    // رسم شهاب‌سنگ‌ها
    const drawShootingStars = () => {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length);
        ctx.stroke();

        star.x += star.speed;
        star.y += star.speed;
        star.opacity -= star.decay;

        if (
          star.opacity <= 0 ||
          star.x > canvas.width ||
          star.y > canvas.height
        ) {
          shootingStars.splice(i, 1);
        }
      }
    };

    // انیمیشن
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
      createShootingStar();
      drawShootingStars();

      requestAnimationFrame(animate);
    };

    // راه‌اندازی
    resizeCanvas();
    createStars();
    createPlanets();

    moonImg.onload = () => {
      animate();
    };

    if (moonImg.complete) {
      animate();
    } else {
      animate();
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
      createPlanets();
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}