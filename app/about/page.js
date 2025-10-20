export default function AboutPage() {
  return (
    <div className="min-h-screen py-10">
      {/* Hero Section */}
      <section className="text-center mb-16 fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          About <span className="text-yellow-300">Me</span>
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Passionate developer crafting digital experiences that make a difference
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Story Section */}
        <section className="mb-16 slide-in-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
            <div className="text-white/90 leading-relaxed space-y-4 text-lg">
              <p>
                Hello! I'm Murtaza Afzali, a passionate front-end developer with over 2 years of experience 
                in creating beautiful, responsive, and user-friendly web applications. My journey in web 
                development began with a curiosity about how websites work and has evolved into a deep 
                passion for crafting digital experiences.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, particularly React and Next.js, and I'm 
                always excited to learn new technologies and best practices. My goal is to create 
                applications that not only look great but also provide exceptional user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new design trends, contributing to open-source 
                projects, or sharing knowledge with the developer community. I believe in continuous learning 
                and staying up-to-date with the latest industry trends.
              </p>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="mb-16 slide-in-right">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
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
                    <div key={skill} className="flex items-center text-white/90">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
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
                    <div key={tool} className="flex items-center text-white/90">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></span>
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience Timeline</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-8">
                  2023 - Present
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Frontend Developer</h3>
                  <p className="text-white/80">Freelance & Personal Projects</p>
                  <p className="text-white/70 mt-2">
                    Working on various web applications, focusing on React and Next.js development. 
                    Building responsive, modern interfaces and optimizing user experiences.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-8">
                  2022 - 2023
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Web Development Learning</h3>
                  <p className="text-white/80">Self-Taught Journey</p>
                  <p className="text-white/70 mt-2">
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Beyond Code</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold text-white mb-2">Design</h3>
                <p className="text-white/70">Passionate about UI/UX design and creating visually appealing interfaces</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-white mb-2">Learning</h3>
                <p className="text-white/70">Always exploring new technologies and staying current with industry trends</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-white mb-2">Growth</h3>
                <p className="text-white/70">Committed to continuous improvement and helping others grow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center fade-in">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
            <p className="text-white/80 mb-6 text-lg">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can bring your ideas to life!
            </p>
            <a
              href="/contact"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover-lift text-lg font-semibold transition-all duration-300 inline-block"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
  