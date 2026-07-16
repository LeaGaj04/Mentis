'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const availableDays = [
  { date: '2026-07-20', label: 'Lun, 20 Jul' },
  { date: '2026-07-21', label: 'Mar, 21 Jul' },
  { date: '2026-07-22', label: 'Mié, 22 Jul' },
];

const availableBlocks = ['10:00', '11:30', '15:00', '16:30'];

export default function AgendarPage() {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedBlock, setSelectedBlock] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', reason: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !selectedBlock) {
      alert('Por favor selecciona un día y una hora.');
      return;
    }
    
    setStatus('loading');
    
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: selectedDay, time: selectedBlock }),
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-cream-50 px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full text-center border border-olive-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-olive-900 mb-2">¡Hora Solicitada!</h2>
          <p className="text-slate-600 mb-6">
            Hemos recibido tu solicitud para el {selectedDay} a las {selectedBlock}. Te hemos enviado un correo con los pasos a seguir.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-olive-600 font-medium hover:underline"
          >
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-olive-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Panel Izquierdo: Selección de Hora */}
        <div className="w-full md:w-5/12 bg-olive-900 text-white p-8 md:p-10 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Selecciona tu hora</h2>
          <p className="text-olive-200 text-sm mb-8">Elige el momento que mejor se adapte a tu rutina para tu sesión online.</p>
          
          <div className="mb-6">
            <h3 className="flex items-center gap-2 font-medium mb-3 text-cream-100">
              <CalendarIcon className="w-4 h-4" /> Días Disponibles
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {availableDays.map(day => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(day.date)}
                  className={`py-3 px-4 rounded-xl text-left transition-colors border ${
                    selectedDay === day.date 
                      ? 'bg-olive-700 border-olive-500 shadow-inner' 
                      : 'bg-olive-800/50 border-transparent hover:bg-olive-800'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresenceWrapper isVisible={!!selectedDay}>
            <div>
              <h3 className="flex items-center gap-2 font-medium mb-3 text-cream-100">
                <Clock className="w-4 h-4" /> Horas Disponibles
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableBlocks.map(block => (
                  <button
                    key={block}
                    onClick={() => setSelectedBlock(block)}
                    className={`py-2 px-3 rounded-lg text-center transition-colors border ${
                      selectedBlock === block 
                        ? 'bg-cream-100 text-olive-900 font-bold border-cream-200' 
                        : 'bg-olive-800/50 text-olive-100 border-transparent hover:bg-olive-800'
                    }`}
                  >
                    {block}
                  </button>
                ))}
              </div>
            </div>
          </AnimatePresenceWrapper>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="w-full md:w-7/12 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-olive-900 mb-6">Tus Datos</h2>
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente o contáctame directamente.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1">Motivo de consulta (opcional)</label>
              <textarea
                id="reason"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow resize-none"
                value={formData.reason}
                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Cuéntame brevemente qué te trae por aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !selectedDay || !selectedBlock}
              className="w-full py-4 bg-olive-600 text-white rounded-xl font-bold shadow-sm hover:bg-olive-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Confirmar Cita'
              )}
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Al confirmar, aceptas que tus datos sean tratados de forma confidencial.
            </p>
          </form>
        </div>
        
      </div>
    </div>
  );
}

function AnimatePresenceWrapper({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? 'auto' : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
