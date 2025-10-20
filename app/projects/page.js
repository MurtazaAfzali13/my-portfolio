import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
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
      title: "Weather Dashboard",
      desc: "A responsive weather application with location-based forecasts, interactive maps, weather alerts, and detailed analytics. Includes 7-day forecasts and historical data visualization.",
      tech: ["React", "Chart.js", "OpenWeather API", "Geolocation API"],
      image: "🌤️",
      liveUrl: "#",
      githubUrl: "#"
    },
{
  title: "Football Player Stats Tracker",
  desc: "An interactive web application that displays detailed statistics, achievements, and career insights of famous football players like Cristiano Ronaldo, Lionel Messi, and others. Users can explore player profiles, compare stats, and visualize performance trends over the years.",
  tech: ["React", "Noxt.js", "better-sqlite3", "Chart.js", "Tailwind CSS"],
  image: "/images/foodball.png",

  liveUrl: "https://foodball-player.vercel.app/",
  githubUrl: "https://github.com/MurtazaAfzali13/foodball-player"
},

    {
      title: "Learning Management System",
      desc: "An educational platform with course creation, video streaming, quizzes, progress tracking, and certificate generation. Includes instructor and student dashboards.",
      tech: ["React", "Node.js", "AWS S3", "MongoDB", "FFmpeg"],
      image: "🎓",
      liveUrl: "#",
      githubUrl: "#"
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

  return (
    <div className="min-h-screen py-10">
      {/* Hero Section */}
      <section className="text-center mb-16 fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          My <span className="text-yellow-300">Projects</span>
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          A collection of projects that showcase my skills and passion for creating 
          innovative web applications
        </p>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto">
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
      <section className="max-w-6xl mx-auto mt-20 mb-16 slide-in-left">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 md:p-12">
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
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  View Live Demo
                </a>
                <a
                  href="#"
                  className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View Code
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg h-64 flex items-center justify-center">
              <span className="text-8xl opacity-50">🛒</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="max-w-6xl mx-auto mb-16 slide-in-right">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
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
                className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-white text-sm font-medium">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center fade-in">
        <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Working Together?</h2>
          <p className="text-white/80 mb-6 text-lg">
            I'm always excited to take on new challenges and create amazing digital experiences. 
            Let's discuss your next project!
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover-lift text-lg font-semibold transition-all duration-300 inline-block"
          >
            Start a Project
          </a>
        </div>
      </section>
    </div>
  );
}
