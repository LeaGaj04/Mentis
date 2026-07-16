import Link from "next/link";
import FAQ from "../components/FAQ";
import { Brain, HeartHandshake, ShieldCheck, CalendarClock, Video, Sparkles, Smile, Users, UserRound, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-olive-900 tracking-tight mb-6">
            Un espacio seguro para tu <br className="hidden md:block" />
            <span className="text-olive-600">bienestar mental</span>, desde casa.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Terapia online confidencial, empática y basada en evidencia. Inicia tu proceso de sanación a tu propio ritmo y en un entorno libre de juicios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/agendar"
              className="w-full sm:w-auto px-8 py-4 bg-olive-600 text-white rounded-full font-semibold shadow-lg hover:bg-olive-700 transition-transform hover:-translate-y-1"
            >
              Agendar Hora
            </Link>
            <Link
              href="#sobre-mi"
              className="w-full sm:w-auto px-8 py-4 bg-cream-100 text-olive-900 border border-olive-200 rounded-full font-semibold hover:bg-cream-200 transition-colors"
            >
              Conocer más
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-cream-300 border-2 border-white flex items-center justify-center text-olive-600">
                  <UserRound size={16} />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-500">
              Únete a más de <span className="text-olive-700 font-bold">200 personas</span> que mejoraron su vida.
            </p>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-olive-100 opacity-50 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cream-200 opacity-50 blur-3xl -z-10" />
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-olive-200 rounded-[3rem] rotate-3 transform origin-bottom-left -z-10" />
                <div className="w-64 h-80 md:w-80 md:h-[28rem] bg-cream-100 rounded-[3rem] shadow-xl overflow-hidden flex items-center justify-center border-4 border-white">
                  <span className="text-olive-300 text-center px-4">
                    [Tu Foto Aquí]
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-olive-900 mb-6">Hola, soy tu terapeuta.</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Mi enfoque en la psicoterapia se basa en crear un vínculo de confianza. Creo firmemente que cada persona tiene las herramientas internas para sanar; mi rol es acompañarte a descubrirlas.
                </p>
                <p>
                  Trabajo desde un marco basado en evidencia clínica, integrando la empatía y la escucha activa en un espacio completamente confidencial y 100% libre de juicios.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Psicóloga Clínica Acreditada",
                  "Especialista en Terapia Cognitivo Conductual",
                  "Atención a adultos y parejas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-olive-800 font-medium">
                    <ShieldCheck className="w-5 h-5 text-olive-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className="w-full py-24 bg-olive-900 text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-cream-50 mb-4">¿Cómo funciona?</h2>
            <p className="text-olive-200">Inicia tu terapia online en 3 simples pasos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-olive-800 p-8 rounded-2xl border border-olive-700 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-olive-700 rounded-full flex items-center justify-center mb-6">
                <CalendarClock className="w-8 h-8 text-cream-200" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Elige tu horario</h3>
              <p className="text-olive-200 text-sm">
                Utiliza nuestra agenda inteligente para encontrar el momento que mejor se adapte a tu rutina.
              </p>
            </div>
            <div className="bg-olive-800 p-8 rounded-2xl border border-olive-700 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-olive-700 rounded-full flex items-center justify-center mb-6">
                <Video className="w-8 h-8 text-cream-200" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Conéctate seguro</h3>
              <p className="text-olive-200 text-sm">
                Recibirás un enlace privado y encriptado para acceder a tu sesión online de manera confidencial.
              </p>
            </div>
            <div className="bg-olive-800 p-8 rounded-2xl border border-olive-700 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-olive-700 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-cream-200" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Sana y avanza</h3>
              <p className="text-olive-200 text-sm">
                Aprende herramientas prácticas y basadas en evidencia para superar tus desafíos emocionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section id="especialidades" className="w-full py-24 bg-cream-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-olive-900 mb-4">Especialidades</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Áreas principales de abordaje clínico para apoyarte en tu desarrollo y bienestar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Ansiedad y Estrés", icon: Brain, desc: "Aprende a gestionar el nerviosismo y la sobrecarga." },
              { title: "Depresión y Estado de Ánimo", icon: Smile, desc: "Recupera tu motivación y vitalidad día a día." },
              { title: "Autoestima", icon: HeartHandshake, desc: "Fortalece la relación contigo mismo y tus límites." },
              { title: "Terapia de Pareja", icon: Users, desc: "Mejora la comunicación y el vínculo afectivo." }
            ].map((esp, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-cream-200 hover:shadow-md transition-shadow group">
                <esp.icon className="w-10 h-10 text-olive-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-slate-800 mb-2">{esp.title}</h3>
                <p className="text-sm text-slate-500">{esp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-olive-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-slate-600">
              Resuelve tus dudas antes de comenzar tu proceso.
            </p>
          </div>
          <FAQ />
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="w-full py-20 bg-olive-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-olive-900 mb-8">¿Listo/a para dar el primer paso?</h2>
          <Link
            href="/agendar"
            className="inline-flex items-center justify-center px-8 py-4 bg-olive-700 text-white rounded-full font-bold shadow-md hover:bg-olive-800 transition-colors gap-2 group"
          >
            Agendar tu primera sesión
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
