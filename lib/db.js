import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'projects.db');
const dbExists = fs.existsSync(dbPath);

const db = new Database(dbPath);

// ایجاد جدول پروژه‌ها اگر وجود نداشته باشد
db.prepare(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    tech TEXT NOT NULL,
    image TEXT,
    liveUrl TEXT,
    githubUrl TEXT
  )
`).run();

// داده‌های پیش‌فرض
if (!dbExists) {
  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard. Features include product catalog, shopping cart, order management, and real-time notifications.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      image: "🛒",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      desc: "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and progress tracking with beautiful charts and analytics.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
      image: "📋",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "AI Insights Dashboard",
      desc: "An interactive analytics dashboard that visualizes trends in artificial intelligence research, cloud computing, and neural networks. Includes dynamic charts, live data fetching, and customizable widgets for real-time insights.",
      tech: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS", "API Integration"],
      image: "🤖",
      liveUrl: "https://next-dashboard1-gules.vercel.app/",
      githubUrl: "https://github.com/MurtazaAfzali13/next-dashboard1"
    },
    {
      title: "Football Player Stats Tracker",
      desc: "An interactive web application that displays detailed statistics, achievements, and career insights of famous football players like Cristiano Ronaldo, Lionel Messi, and others. Users can explore player profiles, compare stats, and visualize performance trends over the years.",
      tech: ["React", "Next.js", "better-sqlite3", "Chart.js", "Tailwind CSS"],
      image: "/images/foodball.png",
      liveUrl: "https://foodball-player.vercel.app/",
      githubUrl: "https://github.com/MurtazaAfzali13/foodball-player"
    },
    {
      title: "Restaurant Management System",
      desc: "A modern restaurant platform for managing menus, online orders, reservations, and customer feedback. Includes admin and staff dashboards, real-time order tracking, and an elegant user interface for customers to explore dishes and book tables.",
      tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "better-sqlite"],
      image: "🍽️",
      liveUrl: "https://restaurant11.vercel.app/",
      githubUrl: "https://github.com/MurtazaAfzali13"
    },
    
    {
      title: "Portfolio Website",
      desc: "This responsive portfolio website showcasing my work and skills. Built with modern web technologies and featuring smooth animations, dark mode, and optimized performance.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      image: "💼",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const insert = db.prepare(`
    INSERT INTO projects (title, desc, tech, image, liveUrl, githubUrl)
    VALUES (@title, @desc, @tech, @image, @liveUrl, @githubUrl)
  `);

  projects.forEach(p => {
    insert.run({
      ...p,
      tech: JSON.stringify(p.tech)
    });
  });

  console.log("Default projects inserted into database!");
}

export default db;
