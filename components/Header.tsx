import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/40 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="w-6 h-6 text-olive-600" />
          <span className="text-xl font-bold tracking-tight text-olive-900">
            psychologic.
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-700">
          <Link href="/#sobre-mi" className="hover:text-olive-600 transition-colors">
            Sobre Mí
          </Link>
          <Link href="/#especialidades" className="hover:text-olive-600 transition-colors">
            Especialidades
          </Link>
          <Link href="/#faq" className="hover:text-olive-600 transition-colors">
            Preguntas Frecuentes
          </Link>
        </nav>
        <Link
          href="/agendar"
          className="inline-flex h-9 items-center justify-center rounded-md bg-olive-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-olive-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive-700"
        >
          Agendar Hora
        </Link>
      </div>
    </header>
  );
}
