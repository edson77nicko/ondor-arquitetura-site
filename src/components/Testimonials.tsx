import { Star } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const googleReviews = [
  {
    author: "Lucinda Silvestre",
    text: "A Ondor tem profissionais muito capacitados. Realizou projetos muito bons para nossa empresa. Sempre nos deu a assessoria que precisamos."
  },
  {
    author: "Manuel Cruz",
    text: "A empresa Ondor é extremamente eficiente! Sem dúvidas a melhor solução no ramo de arquitetura e serviços da região de Sp. Recomendo de olhos fechados!! 👏👏"
  },
  {
    author: "Leandro Biral",
    text: "Fiz vários projetos com a equipe da Ondor. Sempre nos atendeu prontamente e com resultados excelentes. Obrigado Ondor"
  },
  {
    author: "Joana Militao",
    text: "Tivemos uma ótima experiência. Uma empresa que supriu a necessidade, nos passando uma tranquilidade no conhecimento da demanda, respeitando nossos prazos planejados ."
  },
  {
    author: "Morita",
    text: "O Melhor escritório de soluções!!! Sou cliente desde de 2020, com renovação automática até 2050. Agilidade, comprometimento, atendimento! Recomendo!"
  }
];

import React from "react";

const CARD_COUNT = googleReviews.length;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const Testimonials = () => {
  const [active, setActive] = React.useState(0);

  const next = () => setActive((prev) => mod(prev + 1, CARD_COUNT));
  const prev = () => setActive((prev) => mod(prev - 1, CARD_COUNT));

  // Sempre mostra 3 cards: central, anterior e próximo (mesmo se houver menos de 5 depoimentos)
  const getPosition = (index: number) => {
    if (CARD_COUNT < 3) {
      // Se só há 2 depoimentos, mostra ambos lado a lado, centralizados
      if (CARD_COUNT === 2) {
        if (index === active) return 0;
        return 1;
      }
      // Só 1 depoimento
      return 0;
    }
    if (index === active) return 0;
    if (mod(index, CARD_COUNT) === mod(active - 1, CARD_COUNT)) return -1;
    if (mod(index, CARD_COUNT) === mod(active + 1, CARD_COUNT)) return 1;
    return 99; // escondido
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-2xl font-bold text-gray-900 ml-2">5,0</span>
          </div>
          <div className="text-gray-700 text-lg font-medium">79 avaliações no Google</div>
        </div>
        {/* MOBILE: apenas 1 card centralizado */}
        <div className="relative flex items-center justify-center min-h-[340px] w-full md:hidden">
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-gray-200 text-ondor-primary hover:bg-ondor-special/20 rounded-full shadow-lg w-10 h-10 flex items-center justify-center transition-all"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col w-full max-w-xs shadow-2xl mx-auto"
            style={{ position: 'relative' }}
          >
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-800 text-base mb-6 flex-1">{googleReviews[active].text}</p>
            <div className="font-semibold text-ondor-primary text-lg mt-2">{googleReviews[active].author}</div>
          </motion.div>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-gray-200 text-ondor-primary hover:bg-ondor-special/20 rounded-full shadow-lg w-10 h-10 flex items-center justify-center transition-all"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        {/* DESKTOP: 3D/stacked */}
        <div className="relative items-center justify-center min-h-[340px] w-full hidden md:flex">
          {/* Seta esquerda */}
          <button
            onClick={prev}
            className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-gray-200 text-ondor-primary hover:bg-ondor-special/20 rounded-full shadow-lg w-10 h-10 flex items-center justify-center transition-all"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex justify-center items-center gap-0 md:gap-8 relative h-[320px] w-full">
            {[...Array(Math.min(3, CARD_COUNT))].map((_, i) => {
              let idx;
              if (CARD_COUNT === 1) {
                idx = 0;
              } else if (CARD_COUNT === 2) {
                idx = (active + i) % 2;
              } else {
                idx = mod(active - 1 + i, CARD_COUNT);
              }
              const pos = CARD_COUNT === 2 ? (i === 0 ? -0.5 : 0.5) : i - 1;
              const isCenter = pos === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85, rotate: isCenter ? 0 : pos * 8, zIndex: isCenter ? 3 : 2 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.7,
                    scale: isCenter ? 1 : 0.92,
                    rotate: isCenter ? 0 : pos * 8,
                    zIndex: isCenter ? 3 : 2,
                    boxShadow: isCenter ? "0 8px 32px 0 rgba(16,40,80,0.18)" : "0 4px 16px 0 rgba(16,40,80,0.10)"
                  }}
                  exit={{ opacity: 0, scale: 0.85, rotate: isCenter ? 0 : pos * 8, zIndex: isCenter ? 3 : 2 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={`bg-white rounded-2xl border border-gray-100 p-8 flex flex-col mx-[-16px] overflow-hidden ${isCenter ? 'h-[320px] w-[340px] md:w-[400px] shadow-2xl' : 'h-[320px] w-[300px] md:w-[340px] shadow-xl pointer-events-none'}`}
                  style={{ position: 'relative' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-800 text-base mb-6 flex-1">{googleReviews[idx].text}</p>
                  <div className="font-semibold text-ondor-primary text-lg mt-2">{googleReviews[idx].author}</div>
                </motion.div>
              );
            })}
          </div>
          {/* Seta direita */}
          <button
            onClick={next}
            className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-gray-200 text-ondor-primary hover:bg-ondor-special/20 rounded-full shadow-lg w-10 h-10 flex items-center justify-center transition-all"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {googleReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-3 h-3 rounded-full transition-all ${active === idx ? 'bg-ondor-primary scale-125' : 'bg-gray-300 hover:bg-ondor-primary/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
