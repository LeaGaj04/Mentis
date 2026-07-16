'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "¿Cuánto dura una sesión de terapia?",
    answer: "Las sesiones de terapia psicológica tienen una duración de 50 minutos. Este tiempo está diseñado para permitir un trabajo profundo y significativo, respetando tus tiempos y procesos emocionales."
  },
  {
    question: "¿Atienden por Fonasa o Isapre?",
    answer: "Actualmente entrego boleta para reembolso en Isapres y seguros complementarios de salud. No tengo convenio directo con Fonasa."
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer: "Puedes pagar tus sesiones mediante transferencia bancaria. El pago debe realizarse antes del inicio de cada sesión para confirmar la hora."
  },
  {
    question: "¿Qué pasa si no puedo asistir a una sesión agendada?",
    answer: "Entiendo que pueden surgir imprevistos. Te pido cancelar o reprogramar tu sesión con al menos 24 horas de anticipación. Las cancelaciones con menos aviso podrían estar sujetas a cobro."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-olive-200">
          <button
            onClick={() => toggleOpen(index)}
            className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
          >
            <span className="font-medium text-slate-800 text-lg">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-olive-600" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-slate-600">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
