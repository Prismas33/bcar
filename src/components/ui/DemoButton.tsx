'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Monitor, Sparkles, ArrowRight } from 'lucide-react';

export function DemoButton() {
  const [isVisible, setIsVisible] = useState(true);

  // Animação de piscar
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/admin/login">
        <motion.div
          animate={pulseAnimation}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative group cursor-pointer"
        >
          {/* Efeito de brilho de fundo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold via-yellow-400 to-accent-gold rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          
          {/* Botão principal */}
          <div className="relative bg-accent-gold hover:bg-accent-gold/90 text-primary font-bold px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 group-hover:scale-105 flex items-center space-x-3 min-w-[200px]">
            <div className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <span className="text-sm font-bold">DEMO ADMIN</span>
            </div>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
          
          {/* Partículas brilhantes */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-6 w-6 text-yellow-300" />
          </motion.div>
          
          {/* Texto de chamada */}
          <motion.div
            animate={{
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary border border-accent-gold/30 rounded-lg px-3 py-1 shadow-lg whitespace-nowrap"
          >
            <span className="text-xs text-accent-gold font-medium">
              👆 Experimente o painel!
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
