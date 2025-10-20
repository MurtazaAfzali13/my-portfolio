"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    <div className="min-h-screen py-10">
      {/* Hero Section */}
      <section className="text-center mb-16 fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Get In <span className="text-yellow-300">Touch</span>
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Ready to start your next project? Let's discuss how we can bring your ideas to life!
        </p>
      </section>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section className="slide-in-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send me a message</h2>
              
              {submitStatus === "success" && (
                <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-lg mb-6">
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all"
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all"
                    placeholder="What's this about?"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300 focus:bg-white/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>

          {/* Contact Information */}
          <section className="slide-in-right">
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📧</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <a 
                        href="mailto:murtaza@example.com" 
                        className="text-yellow-300 hover:text-yellow-200 transition-colors"
                      >
                        murtazaafzali13@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📱</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone</h3>
                      <a 
                        href="tel:+1234567890" 
                        className="text-yellow-300 hover:text-yellow-200 transition-colors"
                      >
                        +93783000247
                      </a>
                    </div>
                  </div>
                  
               <div className="flex items-center space-x-4">
  <div className="text-3xl">📍</div>
  <div>
    <h3 className="text-white font-semibold mb-1">Location</h3>
    <p className="text-white/80">Herat, Afghanistan</p>
  </div>
</div>

                  
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">💼</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Availability</h3>
                      <p className="text-white/80">Available for freelance projects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Follow Me</h2>
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
                      className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-2xl mr-3">{social.icon}</span>
                      <span className="text-white group-hover:text-yellow-300 transition-colors">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Response</h3>
                <p className="text-white/80 leading-relaxed">
                  I typically respond to all inquiries within 24 hours. For urgent projects, 
                  feel free to mention it in your message and I'll prioritize your request.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-3">What's your typical project timeline?</h3>
                <p className="text-white/80">
                  Project timelines vary based on complexity. Simple websites take 1-2 weeks, 
                  while complex applications can take 2-3 months. I'll provide a detailed timeline 
                  after discussing your requirements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-3">Do you work with international clients?</h3>
                <p className="text-white/80">
                  Absolutely! I work with clients worldwide. I'm comfortable with different time zones 
                  and can accommodate various communication preferences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-3">What's included in your services?</h3>
                <p className="text-white/80">
                  I provide full-stack development, UI/UX design, testing, deployment, and ongoing support. 
                  Each project includes source code, documentation, and training if needed.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-3">How do you handle project revisions?</h3>
                <p className="text-white/80">
                  I include reasonable revisions in my quotes. I believe in iterative development 
                  and regular feedback to ensure the final product meets your expectations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
  