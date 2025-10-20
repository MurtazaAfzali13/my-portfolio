import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio built with Next.js and Tailwind",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body className="text-gray-900 relative">
        <div className="animated-bg"></div>
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <Header />
        <main className="min-h-screen container mx-auto p-4 relative z-10 pt-20">{children}</main>
        <Footer />
        {modal}
      </body>
    </html>
  );
}

