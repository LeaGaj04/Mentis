import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "psycho-logic | Terapia Psicológica Online",
  description: "Un espacio seguro para tu bienestar mental, desde casa. Terapia psicológica online confidencial y empática.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased relative bg-cream-50`}>
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-olive-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cream-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-olive-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        
        <Header />
        <main className="flex-grow z-10 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
