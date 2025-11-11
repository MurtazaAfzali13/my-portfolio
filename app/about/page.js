"use client";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const canvasRef = useRef(null);
  const moonImageRef = useRef(null);

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

    // ایجاد ستاره‌ها
    const createStars = () => {
      stars.length = 0;
      const starCount = Math.min(300, Math.floor(window.innerWidth * window.innerHeight / 3000));

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.3,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.01
        });
      }
    };

    // ایجاد سیاره‌ها
    const createPlanets = () => {
      planets.length = 0;

      // سیاره‌های مختلف با ویژگی‌های متفاوت
      const planetTypes = [
        { radius: 8, color: '#ff6b6b', speed: 0.3, distance: 120, rings: false },  // قرمز
        { radius: 12, color: '#4ecdc4', speed: 0.15, distance: 180, rings: false }, // فیروزه‌ای
        { radius: 6, color: '#ffe66d', speed: 0.25, distance: 250, rings: false },  // زرد
        { radius: 10, color: '#ff9ff3', speed: 0.18, distance: 320, rings: true },  // صورتی
        { radius: 14, color: '#54a0ff', speed: 0.12, distance: 400, rings: false }, // آبی
        { radius: 13, color: '#5f27cd', speed: 0.22, distance: 480, rings: false },  // بنفش
        { radius: 11, color: '#00d2d3', speed: 0.16, distance: 550, rings: true },  // سبز آبی
        { radius: 7, color: '#ff9f43', speed: 0.28, distance: 620, rings: false },  // نارنجی
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

    // رسم ستاره‌ها
    const drawStars = () => {
      const time = Date.now() / 1000;

      stars.forEach(star => {
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
              About <span className="text-yellow-300 typewriter glow-text">Me</span>
            </h1>

            <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
              <span className="pulse-slow font-semibold drop-shadow-lg">Passionate Developer Crafting Digital Experiences</span>
            </div>

            <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
              Passionate developer crafting digital experiences that make a difference
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Story Section */}
          <section className="mb-16 slide-in-left">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
              <div className="text-white/90 leading-relaxed space-y-4 text-lg">
                <p>
                  Hello! I am Murtaza Afzali, a passionate front-end developer with over 2 years of experience
                  in creating beautiful, responsive, and user-friendly web applications. My journey in web
                  development began with a curiosity about how websites work and has evolved into a deep
                  passion for crafting digital experiences.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, particularly React and Next.js, and I am
                  always excited to learn new technologies and best practices. My goal is to create
                  applications that not only look great but also provide exceptional user experiences.
                </p>
                <p>
                  When I am not coding, you can find me exploring new design trends, contributing to open-source
                  projects, or sharing knowledge with the developer community. I believe in continuous learning
                  and staying up-to-date with the latest industry trends.
                </p>
              </div>
            </div>
          </section>

          {/* Skills & Expertise */}
          <section className="mb-16 slide-in-right">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills & Expertise</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-300 mb-4">Frontend Development</h3>
                  <div className="space-y-3">
                    {[
                      "React & Next.js",
                      "JavaScript & TypeScript",
                      "HTML5 & CSS3",
                      "Tailwind CSS & Styled Components",
                      "Responsive Design",
                      "State Management (Redux, Zustand)"
                    ].map((skill, index) => (
                      <div key={skill} className="flex items-center text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-yellow-300 mb-4">Tools & Technologies</h3>
                  <div className="space-y-3">
                    {[
                      "Git & GitHub",
                      "VS Code & DevTools",
                      "Figma & Adobe XD",
                      "Node.js & npm",
                      "Webpack & Vite",
                      "Testing (Jest, React Testing Library)"
                    ].map((tool, index) => (
                      <div key={tool} className="flex items-center text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="mb-16 fade-in">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience Timeline</h2>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-8 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    2023 - Present
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">Frontend Developer</h3>
                    <p className="text-white/80">Freelance & Personal Projects</p>
                    <p className="text-white/70 mt-2 group-hover:text-white/90 transition-colors duration-300">
                      Working on various web applications, focusing on React and Next.js development.
                      Building responsive, modern interfaces and optimizing user experiences.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-8 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    2022 - 2023
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">Web Development Learning</h3>
                    <p className="text-white/80">Self-Taught Journey</p>
                    <p className="text-white/70 mt-2 group-hover:text-white/90 transition-colors duration-300">
                      Intensive learning of modern web development technologies, building projects,
                      and contributing to open-source communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Interests */}
          <section className="mb-16 slide-in-left">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Beyond Code</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center group hover:bg-white/10 p-6 rounded-xl transition-all duration-300">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">Design</h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">Passionate about UI/UX design and creating visually appealing interfaces</p>
                </div>
                <div className="text-center group hover:bg-white/10 p-6 rounded-xl transition-all duration-300">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">Learning</h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">Always exploring new technologies and staying current with industry trends</p>
                </div>
                <div className="text-center group hover:bg-white/10 p-6 rounded-xl transition-all duration-300">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌱</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">Growth</h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">Committed to continuous improvement and helping others grow</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center fade-in">
            <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Let us Work Together</h2>
              <p className="text-white/80 mb-6 text-lg">
                I am always interested in new opportunities and exciting projects.
                Let us discuss how we can bring your ideas to life!
              </p>
              <a
                href="/contact"
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
              >
                Get In Touch
              </a>
            </div>
          </section>
        </div>
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