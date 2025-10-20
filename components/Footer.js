export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-20">
      <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Murtaza Afzali</h3>
            <p className="text-white/80 leading-relaxed">
              Passionate front-end developer creating beautiful, responsive, and user-friendly web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
            <div className="flex space-x-4">
              {[
                { name: "GitHub", icon: "🐙", url: "#" },
                { name: "LinkedIn", icon: "💼", url: "#" },
                { name: "Twitter", icon: "🐦", url: "#" },
                { name: "Email", icon: "📧", url: "mailto:murtaza@example.com" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-2xl hover:text-yellow-300 transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()} Murtaza Afzali. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Built with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
  