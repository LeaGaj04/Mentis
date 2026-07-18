'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import { format, parseISO, addMonths, startOfMonth, endOfMonth, isBefore, startOfDay, addMinutes, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const DEFAULT_BLOCKS = ['10:00', '11:30', '15:00', '16:30'];

function AgendarContent() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  const debugQs = searchParams.get('debug_qs');

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedBlock, setSelectedBlock] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', reason: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(urlError ? 'error' : 'idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [busySlots, setBusySlots] = useState<{start: string, end: string}[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));

  useEffect(() => {
    if (urlError) {
      const debugInfo = debugQs ? ` (Debug: ${debugQs})` : '';
      if (urlError === 'missing_checkout') setErrorMessage(`No se encontró el identificador del pago.${debugInfo}`);
      else if (urlError === 'ventipay_error') setErrorMessage(`Error al verificar el estado del pago con Ventipay.${debugInfo}`);
      else if (urlError === 'payment_not_completed') setErrorMessage(`El pago no fue completado exitosamente.${debugInfo}`);
      else if (urlError === 'missing_metadata') setErrorMessage(`Faltan los datos del paciente en el pago.${debugInfo}`);
      else if (urlError === 'server_error') setErrorMessage(`Ocurrió un error interno en el servidor.${debugInfo}`);
      else setErrorMessage(`Ocurrió un error desconocido.${debugInfo}`);
    }
  }, [urlError, debugQs]);

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoadingAvailability(true);
      try {
        const start = startOfMonth(currentMonth).toISOString();
        const end = endOfMonth(addMonths(currentMonth, 1)).toISOString();
        
        const res = await fetch(`/api/availability?start=${start}&end=${end}`);
        if (res.ok) {
          const data = await res.json();
          setBusySlots(data.busySlots || []);
        }
      } catch (error) {
        console.error("Error fetching availability", error);
      } finally {
        setIsLoadingAvailability(false);
      }
    };
    
    fetchAvailability();
  }, [currentMonth]);

  const availableBlocksForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    
    const today = startOfDay(new Date());
    if (isBefore(selectedDay, today)) return [];

    return DEFAULT_BLOCKS.map(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const blockStart = new Date(selectedDay);
      blockStart.setHours(hours, minutes, 0, 0);
      const blockEnd = addMinutes(blockStart, 50);

      const isBusy = busySlots.some(slot => {
        if (!slot.start || !slot.end) return false;
        const busyStart = parseISO(slot.start);
        const busyEnd = parseISO(slot.end);
        return blockStart < busyEnd && blockEnd > busyStart;
      });

      const isPast = blockStart < new Date();

      return {
        time,
        isAvailable: !isBusy && !isPast
      };
    });
  }, [selectedDay, busySlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay || !selectedBlock) {
      alert('Por favor selecciona un día y una hora.');
      return;
    }
    
    setStatus('loading');
    
    const formattedDate = format(selectedDay, 'yyyy-MM-dd');
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: formattedDate, time: selectedBlock }),
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          setStatus('error');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleDaySelect = (day: Date | undefined) => {
    if (day && !isWeekend(day) && !isBefore(day, startOfDay(new Date()))) {
      setSelectedDay(day);
      setSelectedBlock(''); // Reset block when day changes
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 relative z-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-white/60"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-olive-900 mb-2">¡Hora Solicitada!</h2>
          <p className="text-slate-600 mb-6">
            Hemos recibido tu solicitud para el {selectedDay ? format(selectedDay, 'dd/MM/yyyy') : ''} a las {selectedBlock}. Te hemos enviado un correo con los pasos a seguir.
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
    <div className="min-h-screen py-8 md:py-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto bg-white/60 backdrop-blur-2xl rounded-3xl md:rounded-[3rem] shadow-2xl border border-white/60 overflow-hidden flex flex-col md:flex-row">
        
        {/* Panel Izquierdo: Selección de Hora y Calendario */}
        <div className="w-full md:w-6/12 bg-olive-900/80 backdrop-blur-xl text-white p-6 md:p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/20">
          <h2 className="text-2xl font-bold mb-2 w-full text-left">Selecciona tu hora</h2>
          <p className="text-olive-200 text-sm mb-6 w-full text-left">Elige el momento que mejor se adapte a tu rutina.</p>
          
          <div className="bg-white/90 backdrop-blur-md text-slate-800 p-2 sm:p-4 rounded-2xl sm:rounded-3xl shadow-inner mb-6 w-full flex justify-center overflow-x-auto">
             <DayPicker
                mode="single"
                selected={selectedDay}
                onSelect={handleDaySelect}
                onMonthChange={setCurrentMonth}
                locale={es}
                disabled={[
                  { dayOfWeek: [0, 6] },
                  { before: startOfDay(new Date()) }
                ]}
                modifiersClassNames={{
                  selected: 'bg-olive-600 text-white font-bold',
                  today: 'text-olive-600 font-bold'
                }}
             />
          </div>

          <AnimatePresenceWrapper isVisible={!!selectedDay}>
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 font-medium text-cream-100">
                  <Clock className="w-4 h-4" /> 
                  Horas para el {selectedDay ? format(selectedDay, "d 'de' MMMM", { locale: es }) : ''}
                </h3>
                {isLoadingAvailability && <Loader2 className="w-4 h-4 animate-spin text-cream-100" />}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {availableBlocksForSelectedDay.map(block => {
                  if (!block.isAvailable) {
                    return (
                      <div key={block.time} className="relative group">
                         <button
                           disabled
                           className="w-full py-2 px-3 rounded-lg text-center transition-colors border bg-red-900/40 text-red-200/50 border-red-800/50 cursor-not-allowed line-through flex items-center justify-center gap-2"
                         >
                           <span className="w-2 h-2 rounded-full bg-red-500"></span>
                           {block.time}
                         </button>
                      </div>
                    )
                  }
                  
                  return (
                    <button
                      key={block.time}
                      onClick={() => setSelectedBlock(block.time)}
                      className={`py-2 px-3 rounded-lg text-center transition-colors border flex items-center justify-center gap-2 ${
                        selectedBlock === block.time 
                          ? 'bg-cream-100 text-olive-900 font-bold border-cream-200 shadow-md' 
                          : 'bg-olive-800/50 text-olive-100 border-transparent hover:bg-olive-800'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${selectedBlock === block.time ? 'bg-olive-600' : 'bg-green-400'}`}></span>
                      {block.time}
                    </button>
                  )
                })}
              </div>
              
              {availableBlocksForSelectedDay.length > 0 && availableBlocksForSelectedDay.every(b => !b.isAvailable) && (
                <p className="text-red-300 text-sm mt-3 text-center">
                  Todas las horas están ocupadas para este día.
                </p>
              )}
            </div>
          </AnimatePresenceWrapper>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="w-full md:w-6/12 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-olive-900 mb-6">Tus Datos</h2>
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{errorMessage || 'Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente o contáctame directamente.'}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-olive-800 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow"
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
                  className="w-full px-4 py-3 rounded-xl border border-olive-800 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow"
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
                  className="w-full px-4 py-3 rounded-xl border border-olive-800 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow"
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
                className="w-full px-4 py-3 rounded-xl border border-olive-800 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none transition-shadow resize-none"
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
                  Redirigiendo al pago...
                </>
              ) : (
                'Pagar y Agendar ($19.990)'
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

export default function AgendarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-olive-600" />
      </div>
    }>
      <AgendarContent />
    </Suspense>
  );
}
