'use client';

import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExitoPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream-50 px-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-lg max-w-lg w-full text-center border border-olive-100"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-olive-900 mb-4">¡Pago Exitoso!</h2>
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Tu sesión ha sido agendada correctamente en el calendario y hemos recibido tu pago. 
          Te enviamos un correo electrónico de confirmación con todos los detalles.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="inline-block py-3 px-8 bg-olive-600 text-white font-medium rounded-xl hover:bg-olive-700 transition-colors"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}
