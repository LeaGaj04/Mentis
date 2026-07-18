import Link from "next/link";
import FAQ from "../components/FAQ";
import { Brain, HeartHandshake, ShieldCheck, CalendarClock, Video, Sparkles, Smile, Users, UserRound, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8 max-w-7xl mx-auto">
            
            {/* Left Column: Main Hero Card */}
            <div className="w-full md:w-7/12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-14 shadow-2xl text-left">
              <span className="inline-block bg-white/80 backdrop-blur-sm text-olive-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
                Atención Psicológica 100% Online
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-olive-900 tracking-tight mb-6 leading-[1.1]">
                Un espacio seguro <br className="hidden md:block" />
                para tu <span className="text-olive-600 border-b-4 border-olive-400/50 pb-1">bienestar mental</span>, <br className="hidden md:block" />
                desde casa.
              </h1>
              <p className="text-lg text-slate-700 mb-10 max-w-lg leading-relaxed font-medium">
                Inicia tu proceso terapéutico con empatía, profesionalismo y total confidencialidad. Da el primer paso hacia la tranquilidad que buscas sin salir de tu hogar.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <Link
                  href="/agendar"
                  className="w-full sm:w-auto px-6 py-4 bg-olive-600/90 backdrop-blur-md text-white rounded-full font-bold shadow-lg hover:bg-olive-700 transition-colors flex items-center justify-center gap-2 border border-olive-500"
                >
                  Agendar Cita Online <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#sobre-mi"
                  className="w-full sm:w-auto px-6 py-4 bg-white/70 backdrop-blur-md text-olive-900 rounded-full font-bold hover:bg-white transition-colors border border-white/60 shadow-sm text-center"
                >
                  Conocer más
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-cream-100 border-2 border-white/80 flex items-center justify-center text-olive-600 shadow-sm">
                      <UserRound size={16} />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-700 leading-snug">
                  Únete a más de <span className="text-olive-900 font-bold">200 personas</span><br/>que mejoraron su vida.
                </p>
              </div>
            </div>

            {/* Right Column: Floating Badges */}
            <div className="w-full md:w-5/12 flex flex-col gap-6 items-center md:items-end">
              
              {/* Badge 1 */}
              <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-5 flex items-center gap-4 shadow-xl w-full max-w-[320px] transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck className="w-6 h-6 text-olive-600" />
                </div>
                <div>
                  <h3 className="font-bold text-olive-900 leading-tight">PSICÓLOGO<br/>CLÍNICO</h3>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1 font-semibold">Acreditación oficial</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-5 flex items-center gap-4 shadow-xl w-full max-w-[320px] md:-translate-x-12 transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <Users className="w-6 h-6 text-olive-600" />
                </div>
                <div>
                  <h3 className="font-black text-olive-900 text-2xl leading-none">+500</h3>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1 font-semibold">Pacientes atendidos</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col gap-3 shadow-xl w-full max-w-[320px] transform hover:-translate-y-1 transition-transform">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-bold text-olive-900 italic">"Excelente profesional"</h3>
                <p className="text-sm text-slate-600 font-medium">Me ayudó a encontrar mi paz.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="w-full py-24 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-olive-200 rounded-[3rem] rotate-3 transform origin-bottom-left -z-10" />
                <div className="w-64 h-80 md:w-80 md:h-[28rem] bg-cream-100 rounded-[3rem] shadow-xl overflow-hidden flex items-center justify-center border-4 border-white">
                  <span className="text-olive-500 text-center px-4 font-medium">
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
      <section className="w-full py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-olive-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-slate-600">Inicia tu terapia online en 3 simples pasos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-olive-600 rounded-2xl rotate-3 flex items-center justify-center mb-6 shadow-md">
                <CalendarClock className="w-8 h-8 text-cream-200" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-olive-900">1. Elige tu horario</h3>
              <p className="text-slate-600 text-sm">
                Utiliza nuestra agenda inteligente para encontrar el momento que mejor se adapte a tu rutina.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-olive-600 rounded-2xl -rotate-3 flex items-center justify-center mb-6 shadow-md">
                <Video className="w-8 h-8 text-cream-100" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-olive-900">2. Conéctate seguro</h3>
              <p className="text-slate-600 text-sm">
                Recibirás un enlace privado y encriptado para acceder a tu sesión online de manera confidencial.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-olive-600 rounded-2xl rotate-3 flex items-center justify-center mb-6 shadow-md">
                <Sparkles className="w-8 h-8 text-cream-100" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-olive-900">3. Sana y avanza</h3>
              <p className="text-slate-600 text-sm">
                Aprende herramientas prácticas y basadas en evidencia para superar tus desafíos emocionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section id="especialidades" className="w-full py-24 relative z-10">
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
              <div key={idx} className="bg-white/50 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-1 transition-all group">
                <esp.icon className="w-10 h-10 text-olive-600 mb-4 group-hover:scale-110 transition-transform drop-shadow-sm" />
                <h3 className="font-bold text-olive-900 mb-2">{esp.title}</h3>
                <p className="text-sm text-slate-500">{esp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full py-24 bg-cream-50 relative z-10">
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
      <section className="w-full py-24 bg-cream-50 relative z-10 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-xl border border-white/60 p-12 rounded-[3rem] shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-olive-900 mb-8">¿Listo/a para dar el primer paso?</h2>
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center px-8 py-4 bg-olive-700 text-white rounded-full font-bold shadow-md hover:bg-olive-800 transition-colors gap-2 group"
            >
              Agendar tu primera sesión
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
