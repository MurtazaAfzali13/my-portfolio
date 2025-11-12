"use client";
import { useEffect, useState, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const canvasRef = useRef(null);
  const moonImageRef = useRef(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const stars = [];
    const planets = [];
    const shootingStars = [];

    // لود کردن عکس مهتاب - استفاده از constructor بومی
    const moonImg = new window.Image(); // استفاده از window.Image
    moonImg.src = '/images/picture.jpg'; // همان عکس پروفایل
    moonImageRef.current = moonImg;

    // تنظیم اندازه کانوا
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // ایجاد ستاره‌ها با حرکت چند جهتی
    const createStars = () => {
      stars.length = 0;
      const starCount = Math.min(400, Math.floor(window.innerWidth * window.innerHeight / 2500));

      for (let i = 0; i < starCount; i++) {
        // موقعیت اولیه تصادفی
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // انواع مختلف حرکت
        const movementType = Math.floor(Math.random() * 4); // 0, 1, 2, 3
        let speedX, speedY, orbitRadius, orbitSpeed, orbitCenterX, orbitCenterY;
        
        // 30% ستاره‌ها حرکت مداری حول مهتاب داشته باشند
        if (movementType === 0 && Math.random() < 0.3) {
          // حرکت مداری حول مهتاب
          orbitCenterX = canvas.width / 2;
          orbitCenterY = canvas.height / 2;
          orbitRadius = Math.random() * Math.min(canvas.width, canvas.height) * 0.4 + 100;
          orbitSpeed = (Math.random() - 0.5) * 0.02;
          speedX = 0;
          speedY = 0;
        } else {
          // حرکت خطی تصادفی با سرعت بیشتر
          speedX = (Math.random() - 0.5) * 0.8; // افزایش سرعت
          speedY = (Math.random() - 0.5) * 0.6;
          orbitRadius = 0;
          orbitSpeed = 0;
          orbitCenterX = 0;
          orbitCenterY = 0;
        }
        
        stars.push({
          x,
          y,
          radius: Math.random() * 1.5 + 0.2,
          speedX,
          speedY,
          opacity: Math.random() * 0.8 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          originalX: x,
          originalY: y,
          driftDistance: Math.random() * 30 + 10, // افزایش فاصله حرکت
          driftSpeed: Math.random() * 0.02 + 0.008, // افزایش سرعت حرکت
          driftAngle: Math.random() * Math.PI * 2,
          movementType,
          orbitRadius,
          orbitSpeed,
          orbitCenterX,
          orbitCenterY,
          orbitAngle: Math.random() * Math.PI * 2, // زاویه اولیه برای مدار
          waveAmplitude: Math.random() * 15 + 5, // دامنه حرکت موجی
          waveSpeed: Math.random() * 0.03 + 0.01,
          wavePhase: Math.random() * Math.PI * 2
        });
      }
    };

    // ایجاد سیاره‌ها
    const createPlanets = () => {
      planets.length = 0;

     // سیاره‌های مختلف با ویژگی‌های متفاوت
      const planetTypes = [
        { radius: 8, color: '#ff6b6b', speed: 0.1, distance: 120, rings: false },  // قرمز
        { radius: 12, color: '#4ecdc4', speed: 0.1, distance: 180, rings: false }, // فیروزه‌ای
        { radius: 6, color: '#ffe66d', speed: 0.5, distance: 250, rings: false },  // زرد
        { radius: 10, color: '#ff9ff3', speed: 0.8, distance: 320, rings: true },  // صورتی
        { radius: 14, color: '#54a0ff', speed: 0.3, distance: 400, rings: false }, // آبی
        { radius: 13, color: '#5f27cd', speed: 0.2, distance: 480, rings: false },  // بنفش
        { radius: 11, color: '#00d2d3', speed: 0.6, distance: 550, rings: true },  // سبز آبی
        { radius: 7, color: '#ff9f43', speed: 0.2, distance: 620, rings: false },  // نارنجی
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
          pulseSpeed: Math.random() * 0.02 + 0.01
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
          decay: Math.random() * 0.015 + 0.005
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
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height) * 0.9
      );
      globalLight.addColorStop(0, 'rgba(120, 120, 220, 0.2)');
      globalLight.addColorStop(0.2, 'rgba(100, 100, 200, 0.15)');
      globalLight.addColorStop(0.5, 'rgba(80, 60, 180, 0.08)');
      globalLight.addColorStop(1, 'rgba(40, 20, 120, 0)');

      ctx.fillStyle = globalLight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // لایه دوم - هاله بنفش-آبی
      const purpleHalo = ctx.createRadialGradient(
        centerX, centerY, 100,
        centerX, centerY, 500
      );
      purpleHalo.addColorStop(0, 'rgba(147, 112, 219, 0.4)'); // بنفش روشن
      purpleHalo.addColorStop(0.6, 'rgba(75, 0, 130, 0.2)'); // نیلی
      purpleHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = purpleHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 500, 0, Math.PI * 2);
      ctx.fill();

      // لایه سوم - هاله آبی
      const blueHalo = ctx.createRadialGradient(
        centerX, centerY, 80,
        centerX, centerY, 300
      );
      blueHalo.addColorStop(0, 'rgba(65, 105, 225, 0.5)'); // آبی سیر
      blueHalo.addColorStop(0.8, 'rgba(30, 144, 255, 0.2)'); // آبی داجر
      blueHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = blueHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 300, 0, Math.PI * 2);
      ctx.fill();

      // لایه چهارم - هاله سفید (مهتاب اصلی)
      const moonHalo = ctx.createRadialGradient(
        centerX, centerY, 50,
        centerX, centerY, 180
      );
      moonHalo.addColorStop(0, 'rgba(255, 255, 255, 0.34)');
      moonHalo.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
      moonHalo.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = moonHalo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fill();

      // خود مهتاب - پایه سفید
      const moonGradient = ctx.createRadialGradient(
        centerX - 20, centerY - 20, 0,
        centerX, centerY, moonRadius
      );
      moonGradient.addColorStop(0, '#749f08ff');
      moonGradient.addColorStop(0.6, '#12ee8bff');
      moonGradient.addColorStop(1, '#7d51b7ff');

      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // رسم عکس در مهتاب (با opacity بسیار کم)
      if (moonImg.complete && moonImg.naturalHeight !== 0) {
        ctx.save();

        // ایجاد کلیپ دایره‌ای برای عکس
        ctx.beginPath();
        ctx.arc(centerX, centerY, moonRadius - 5, 0, Math.PI * 2);
        ctx.clip();

        // تنظیم opacity بسیار کم برای عکس
        ctx.globalAlpha = 0.15; // فقط 15% opacity - بسیار کم‌رنگ

        // محاسبه اندازه و موقعیت عکس
        const imgSize = moonRadius * 2.2;
        const imgX = centerX - imgSize / 2;
        const imgY = centerY - imgSize / 2;

        // رسم عکس
        ctx.drawImage(moonImg, imgX, imgY, imgSize, imgSize);

        ctx.restore();
        ctx.globalAlpha = 1; // بازگشت به opacity معمولی
      }

      // جزئیات روی مهتاب (برای حفظ ظاهر ماه)
      ctx.fillStyle = 'rgba(210, 210, 230, 0.4)';
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

    // رسم سیاره‌ها
    const drawPlanets = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() / 1000;

      planets.forEach(planet => {
        // حرکت سیاره به دور مهتاب
        planet.angle += planet.speed * 0.01;

        // محاسبه موقعیت جدید سیاره
        planet.x = centerX + Math.cos(planet.angle) * planet.distance;
        planet.y = centerY + Math.sin(planet.angle) * planet.distance;

        // اثر پالس برای سیاره
        planet.pulse = 0.7 + Math.sin(time * planet.pulseSpeed) * 0.3;
        const currentRadius = planet.radius * planet.pulse;

        // رسم حلقه سیاره (اگر دارد)
        if (planet.hasRings) {
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(planet.x, planet.y, currentRadius * 2, currentRadius * 0.8, planet.angle, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = planet.ringColor.replace('0.3', '0.2');
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(planet.x, planet.y, currentRadius * 2.5, currentRadius * 1, planet.angle, 0, Math.PI * 2);
          ctx.stroke();
        }

        // رسم خود سیاره
        const planetGradient = ctx.createRadialGradient(
          planet.x - currentRadius * 0.3, planet.y - currentRadius * 0.3, 0,
          planet.x, planet.y, currentRadius
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, darkenColor(planet.color, 0.3));

        ctx.fillStyle = planetGradient;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // درخشش سیاره
        const glow = ctx.createRadialGradient(
          planet.x, planet.y, 0,
          planet.x, planet.y, currentRadius * 2
        );
        glow.addColorStop(0, `${planet.color}40`);
        glow.addColorStop(1, `${planet.color}00`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, currentRadius * 2, 0, Math.PI * 2);
        ctx.fill();

        // مدار سیاره (خطوط کم‌رنگ)
        ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    // تابع برای تیره کردن رنگ
    const darkenColor = (color, factor) => {
      const hex = color.replace('#', '');
      const num = parseInt(hex, 16);
      const amt = Math.round(2.55 * factor * 100);
      const R = (num >> 16) - amt;
      const G = (num >> 8 & 0x00FF) - amt;
      const B = (num & 0x0000FF) - amt;
      return `#${(
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
      ).toString(16).slice(1)}`;
    };

    // رسم ستاره‌ها با حرکت چند جهتی
    const drawStars = () => {
      const time = Date.now() / 1000;
      
      stars.forEach(star => {
        let newX = star.x;
        let newY = star.y;
        
        // انواع مختلف حرکت
        switch (star.movementType) {
          case 0: // حرکت مداری حول مهتاب
            star.orbitAngle += star.orbitSpeed;
            newX = star.orbitCenterX + Math.cos(star.orbitAngle) * star.orbitRadius;
            newY = star.orbitCenterY + Math.sin(star.orbitAngle) * star.orbitRadius;
            
            // اضافه کردن حرکت موجی به مدار
            const waveOffset = Math.sin(time * star.waveSpeed + star.wavePhase) * star.waveAmplitude;
            newX += Math.cos(star.orbitAngle + Math.PI / 2) * waveOffset;
            newY += Math.sin(star.orbitAngle + Math.PI / 2) * waveOffset;
            break;
            
          case 1: // حرکت خطی با نوسان
            star.driftAngle += star.driftSpeed;
            newX = star.originalX + Math.cos(star.driftAngle) * star.driftDistance;
            newY = star.originalY + Math.sin(star.driftAngle) * star.driftDistance;
            
            // حرکت خطی اضافی
            newX += star.speedX * time * 10;
            newY += star.speedY * time * 10;
            break;
            
          case 2: // حرکت تصادفی پیشرفته
            star.driftAngle += star.driftSpeed;
            const randomMoveX = Math.cos(star.driftAngle) * star.driftDistance;
            const randomMoveY = Math.sin(star.driftAngle) * star.driftDistance;
            
            newX = star.originalX + randomMoveX + Math.sin(time * star.waveSpeed) * star.waveAmplitude;
            newY = star.originalY + randomMoveY + Math.cos(time * star.waveSpeed * 0.7) * star.waveAmplitude;
            break;
        }
        
        // حرکت خطی پایه برای همه ستاره‌ها
        newX += star.speedX;
        newY += star.speedY;
        
        // به روز رسانی موقعیت
        star.x = newX;
        star.y = newY;
        
        // اگر ستاره از صفحه خارج شد، به موقعیت اولیه برگرد
        if (star.x < -100 || star.x > canvas.width + 100 || 
            star.y < -100 || star.y > canvas.height + 100) {
          star.x = star.originalX;
          star.y = star.originalY;
        }
        
        // چشمک زدن ستاره‌ها
        const pulse = Math.sin(time * star.pulseSpeed) * 0.4 + 0.6;
        const currentOpacity = star.opacity * pulse;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // ایجاد درخشش برای ستاره‌های بزرگتر
        if (star.radius > 1.2) {
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 4
          );
          glow.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
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

        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(i, 1);
        }
      }
    };

    // انیمیشن
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // بک‌گراند گرادیانت آسمان شب عمیق
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#040416');
      gradient.addColorStop(0.2, '#0a0a2a');
      gradient.addColorStop(0.5, '#1a1a40');
      gradient.addColorStop(0.8, '#2d1b69');
      gradient.addColorStop(1, '#3d2b8c');
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

    // صبر برای لود عکس قبل از شروع انیمیشن
    moonImg.onload = () => {
      animate();
    };

    // اگر عکس قبلاً لود شده
    if (moonImg.complete) {
      animate();
    } else {
      // اگر عکس لود نشد، انیمیشن را بدون عکس شروع کن
      animate();
    }

    // مدیریت تغییر اندازه پنجره
    window.addEventListener('resize', () => {
      resizeCanvas();
      createStars();
      createPlanets();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* کانوا برای بک‌گراند متحرک */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      {/* محتوای اصلی */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="fade-in mb-16 px-4">
          <div className="mb-8 flex flex-col items-center">
            {/* 👇 Text Section */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
              My <span className="text-yellow-300 glow-text">Projects</span>
            </h1>

            <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
              <span className="pulse-slow font-semibold drop-shadow-lg">Innovative Web Applications</span>
            </div>

            <p className="text-xl text-white/85 max-w-3xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
              A collection of projects that showcase my skills and passion for creating
              innovative web applications
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard
                  title={project.title}
                  desc={project.desc}
                  tech={project.tech}
                  image={project.image}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Project Section */}
        <section className="max-w-6xl mx-auto px-4 mb-16 slide-in-left">
          <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Featured Project</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">E-Commerce Platform</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  This comprehensive e-commerce solution represents my most ambitious project to date.
                  It includes a complete shopping experience with secure payments, inventory management,
                  and a sophisticated admin panel. The platform handles thousands of products and
                  processes transactions securely.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "Node.js", "MongoDB", "Stripe", "JWT", "AWS"].map((tech, index) => (
                    <span
                      key={index}
                      className="bg-yellow-300/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 backdrop-blur-lg border border-white/20 shadow-2xl hover-lift"
                  >
                    View Live Demo
                  </a>
                  <a
                    href="#"
                    className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-lg hover-lift"
                  >
                    View Code
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl h-64 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                <span className="text-8xl opacity-50">🛒</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Showcase */}
        <section className="max-w-6xl mx-auto px-4 mb-16 slide-in-right">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: "React", icon: "⚛️" },
                { name: "Next.js", icon: "▲" },
                { name: "TypeScript", icon: "🔷" },
                { name: "AWS", icon: "☁️" },
                { name: "Docker", icon: "🐳" },
                { name: "Redis", icon: "🔴" },
                { name: "GraphQL", icon: "🔺" },
                { name: "Jest", icon: "🧪" },
                { name: "Cypress", icon: "🌲" }
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group hover-lift border border-white/10"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                  <div className="text-white text-sm font-medium group-hover:text-yellow-300 transition-colors duration-300">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center fade-in px-4">
          <div className="bg-gradient-to-r from-green-500/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Interested in Working Together?</h2>
            <p className="text-white/80 mb-6 text-lg">
              I&apos;m always excited to take on new challenges and create amazing digital experiences.
              Let&apos;s discuss your next project!
            </p>
            <a
              href="/contact"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              Start a Project
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 0, 0.5),
                       0 0 20px rgba(255, 255, 0, 0.3),
                       0 0 30px rgba(255, 255, 0, 0.2);
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        .slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}