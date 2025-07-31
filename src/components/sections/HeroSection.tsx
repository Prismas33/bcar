'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star, Award, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Excelência",
      subtitle: "Sem Compromissos",
      description: "Onde cada veículo conta uma história de luxo e performance incomparáveis",
      accent: "🏆"
    },
    {
      title: "Prestígio",
      subtitle: "Redefinido",
      description: "Uma curadoria exclusiva dos automóveis mais desejados do mundo",
      accent: "👑"
    },
    {
      title: "Elegância",
      subtitle: "em Movimento",
      description: "Descubra a perfeição em cada detalhe, em cada curva, em cada momento",
      accent: "✨"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-gradient-hero"
      >
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        
        {/* Floating Orbs */}
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-32 h-32 bg-accent-gold/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          className="absolute bottom-40 right-20 w-48 h-48 bg-accent-gold/5 rounded-full blur-2xl"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 glass-luxury px-6 py-3 mb-8"
            >
              <Star className="h-5 w-5 text-accent-gold" />
              <span className="text-accent-gold font-medium">Premium Collection</span>
              <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>
            </motion.div>

            {/* Animated Title */}
            <motion.div className="relative mb-6">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="hero-title leading-tight"
              >
                <span className="text-text-primary block">
                  {heroSlides[currentSlide].title}
                </span>
                <span className="text-gradient block">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </motion.h1>
              
              {/* Accent Icon */}
              <motion.div
                key={`accent-${currentSlide}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -top-8 -right-8 text-6xl opacity-20"
              >
                {heroSlides[currentSlide].accent}
              </motion.div>
            </motion.div>
            
            {/* Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-text-subtle mb-12 max-w-2xl leading-relaxed"
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury group"
                >
                  <span>Explorar Coleção</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>Experiência Imersiva</span>
              </motion.button>
            </motion.div>

            {/* Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex space-x-2 mt-12"
            >
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-12 h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-accent-gold shadow-glow' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Main Car Showcase */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotateY: [0, 5, 0],
                  rotateX: [0, -2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="card-showcase p-8 aspect-[4/3]"
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Car Icon with Glow Effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-accent-gold text-8xl relative z-10"
                  >
                    🏎️
                  </motion.div>
                  
                  {/* Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-gold/10 rounded-3xl"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-accent-gold/30 rounded-3xl"
                  />
                </div>
              </motion.div>
              
              {/* Floating Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -top-6 -left-6 glass-luxury p-4 rounded-xl animate-float"
              >
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent-gold" />
                  <span className="text-accent-gold font-semibold text-sm">Certificado</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-6 -right-6 glass-luxury p-4 rounded-xl animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-accent-gold" />
                  <span className="text-accent-gold font-semibold text-sm">Garantia</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-1/2 -right-8 glass-luxury p-4 rounded-xl animate-float"
                style={{ animationDelay: '4s' }}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-accent-gold" />
                  <span className="text-accent-gold font-semibold text-sm">Performance</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <div className="w-6 h-12 border-2 border-accent-gold/50 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-accent-gold rounded-full"
            />
          </div>
          <span className="text-accent-gold/70 text-xs font-medium tracking-wider">SCROLL</span>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-1 h-32 bg-gradient-to-b from-accent-gold to-transparent opacity-30"></div>
        <div className="absolute bottom-1/4 right-10 w-1 h-32 bg-gradient-to-t from-accent-gold to-transparent opacity-30"></div>
      </div>
    </section>
  );
}
