import Link from "next/link";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-olive-900 text-cream-50 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">psychologic.</h3>
          <p className="text-olive-200 max-w-sm">
            Un espacio seguro, confidencial y libre de juicios para trabajar en tu bienestar emocional, estés donde estés.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-cream-200">Navegación</h4>
          <ul className="space-y-2 text-sm text-olive-200">
            <li><Link href="/#sobre-mi" className="hover:text-white transition">Sobre Mí</Link></li>
            <li><Link href="/#especialidades" className="hover:text-white transition">Especialidades</Link></li>
            <li><Link href="/agendar" className="hover:text-white transition">Agendar Hora</Link></li>
            <li><Link href="/#faq" className="hover:text-white transition">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        <div className="bg-olive-800 p-6 rounded-xl border border-olive-700">
          <div className="flex items-center space-x-2 text-red-300 mb-3">
            <Phone className="w-5 h-5" />
            <h4 className="font-semibold">Atención en Crisis</h4>
          </div>
          <p className="text-sm text-olive-200 mb-2">
            Si te encuentras en una situación de emergencia o riesgo vital en Chile:
          </p>
          <p className="text-lg font-bold text-white mb-1">
            Llama al *4141
          </p>
          <p className="text-xs text-olive-300">Línea de prevención del suicidio (Minsal)</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-olive-800 text-sm text-olive-400 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} psychologic. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
