import TypewriterText from "@/components/TypeWriterText";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      {/* Hero Section */}
      <section className="fade-in mb-16">
      <div className="mb-8 flex flex-col items-center">
  {/* 👇 Profile Image Section */}
  <div className="w-60 h-60 mb-6 rounded-full overflow-hidden border-4 border-yellow-300 shadow-lg">
    <Link href="/image">
    <Image
      src="/images/user.png"  // ← Replace with your actual image path
      alt="Murtaza Afzali"
      className="w-full h-full object-cover"
      width={300}
      height={300}
    />
    </Link>
  </div>
  

  {/* 👇 Text Section */}
  <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center">
    Hi, I'm <span className="text-yellow-300 typewriter">
      <TypewriterText text="Murtaza Afzali" />
    </span>
  </h1>

  <div className="text-2xl md:text-3xl text-white/90 mb-4 slide-in-left text-center">
    <span className="pulse-slow">Front-End Developer</span>
  </div>

  <p className="text-xl text-white/80 max-w-2xl mx-auto slide-in-right text-center">
    Passionate about creating beautiful, responsive, and user-friendly web applications 
    using modern technologies like React, Next.js, and Tailwind CSS.
  </p>
</div>

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
          <a
            href="/projects"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover-lift text-lg font-semibold transition-all duration-300"
          >
            View My Projects
          </a>
          <a
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg font-semibold"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full max-w-6xl mx-auto mb-16 fade-in">
        <h2 className="text-3xl font-bold text-white mb-8">Technologies I Work With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "React", icon: "⚛️" },
            { name: "Next.js", icon: "▲" },
            { name: "JavaScript", icon: "🟨" },
            { name: "TypeScript", icon: "🔷" },
            { name: "Tailwind CSS", icon: "🎨" },
           
            { name: "Git", icon: "📦" },
            { name: "Figma", icon: "🎯" }
          ].map((tech, index) => (
            <div 
              key={tech.name}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-2">{tech.icon}</div>
              <div className="text-white font-semibold">{tech.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="w-full max-w-4xl mx-auto mb-16 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover-lift">
            <div className="text-4xl font-bold text-yellow-300 mb-2">2+</div>
            <div className="text-white">Years Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover-lift">
            <div className="text-4xl font-bold text-yellow-300 mb-2">15+</div>
            <div className="text-white">Projects Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover-lift">
            <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
            <div className="text-white">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center fade-in">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to work together?</h3>
        <p className="text-white/80 mb-6">Let's create something amazing!</p>
        <a
          href="/contact"
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover-lift text-lg font-semibold transition-all duration-300 inline-block"
        >
          Start a Project
        </a>
      </section>
    </div>
  );
}
