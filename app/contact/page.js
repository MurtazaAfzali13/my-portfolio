"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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
        { radius: 6, color: '#ffe66d', speed: 1, distance: 250, rings: false },  // زرد
        { radius: 10, color: '#ff9ff3', speed: 0.18, distance: 320, rings: true },  // صورتی
        { radius: 14, color: '#54a0ff', speed: 0.12, distance: 400, rings: false }, // آبی
        { radius: 13, color: '#5f27cd', speed: 0.22, distance: 480, rings: false },  // بنفش
        { radius: 11, color: '#00d2d3', speed: 0.16, distance: 550, rings: true },  // سبز آبی
        { radius: 7, color: '#ff9f43', speed: 0.1, distance: 620, rings: false },  // نارنجی
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get In <span className="text-yellow-300 typewriter glow-text">Touch</span>
            </h1>

            <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
              <span className="pulse-slow font-semibold drop-shadow-lg">Let&apos;s Create Something Amazing</span>
            </div>

            <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
              Ready to start your next project? Let&apos;s discuss how we can bring your ideas to life!
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <section className="slide-in-left">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Send Me a Message</h2>

                {submitStatus === "success" && (
                  <div className="bg-green-500/30 border border-green-500/50 text-green-300 p-4 rounded-lg mb-6 backdrop-blur-sm text-center">
                    Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/30 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 backdrop-blur-sm text-center">
                    There was an error sending your message. Please try again or contact me directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all backdrop-blur-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all backdrop-blur-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all backdrop-blur-sm"
                      placeholder="What&apos;s this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all resize-none backdrop-blur-sm"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 backdrop-blur-lg border border-white/20 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </section>

            {/* Contact Information */}
            <section className="slide-in-right">
              <div className="space-y-6">
                {/* Contact Details */}
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
                      <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">📧</div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:murtazaafzali13@gmail.com"
                          className="text-yellow-300 hover:text-yellow-200 transition-colors"
                        >
                          murtazaafzali13@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
                      <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">📱</div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Phone</h3>
                        <a
                          href="tel:+93783000247"
                          className="text-yellow-300 hover:text-yellow-200 transition-colors"
                        >
                          +93 783 000 247
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
                      <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">📍</div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Location</h3>
                        <p className="text-white/80">Herat, Afghanistan</p>
                      </div>
                    </div>

                    <div className="flex items-start group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
                      <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">💼</div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Availability</h3>
                        <p className="text-white/80">Available for freelance projects</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">Follow Me</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "GitHub", icon: "🐙", url: "https://github.com/MurtazaAfzali13/" },
                      { name: "LinkedIn", icon: "💼", url: "#" },
                      { name: "Twitter", icon: "🐦", url: "#" },
                      { name: "Dribbble", icon: "🏀", url: "#" }
                    ].map((social, index) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group hover-lift border border-white/10"
                      >
                        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                        <span className="text-white group-hover:text-yellow-300 transition-colors font-medium">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-r from-green-500/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Quick Response</h3>
                  <p className="text-white/80 leading-relaxed">
                    I typically respond to all inquiries within 24 hours. For urgent projects,
                    feel free to mention it in your message and I&apos;ll prioritize your request.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <section className="fade-in mb-16">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    What&apos;s your typical project timeline?
                  </h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    Project timelines vary based on complexity. Simple websites take 1-2 weeks,
                    while complex applications can take 2-3 months. I&apos;ll provide a detailed timeline
                    after discussing your requirements.
                  </p>
                </div>
                <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    Do you work with international clients?
                  </h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    Absolutely! I work with clients worldwide. I&apos;m comfortable with different time zones
                    and can accommodate various communication preferences.
                  </p>
                </div>
                <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    What&apos;s included in your services?
                  </h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    I provide full-stack development, UI/UX design, testing, deployment, and ongoing support.
                    Each project includes source code, documentation, and training if needed.
                  </p>
                </div>
                <div className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    How do you handle project revisions?
                  </h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                    I include reasonable revisions in my quotes. I believe in iterative development
                    and regular feedback to ensure the final product meets your expectations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center fade-in">
            <h3 className="text-2xl font-bold text-white mb-4 backdrop-blur-lg bg-black/40 p-4 rounded-2xl inline-block border border-white/20 shadow-2xl">
              Ready to start your project?
            </h3>
            <p className="text-white/80 mb-6 backdrop-blur-lg bg-black/40 p-3 rounded-xl inline-block border border-white/20">
              Let&apos;s create something amazing together!
            </p>
            <br />
            <a
              href="/projects"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              View My Projects
            </a>
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