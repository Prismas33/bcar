'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Star, Award, Shield, Zap, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Parallax effects
  const yTransform = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroSlides = [
    {
      title: "Qualidade",
      subtitle: "Sem Enganação",
      description: "Começamos este negócio com uma promessa: cada carro é inspecionado e apresentado como realmente está. Sem surpresas, só honestidade.",
      accent: "🔍",
      stats: { value: "100%", label: "Transparência Total" }
    },
    {
      title: "Variedade",
      subtitle: "para Todos",
      description: "Do primeiro carro ao upgrade dos sonhos. A nossa selecção cuidadosa oferece opções para todas as carteiras, sem abrir mão da qualidade.",
      accent: "�",
      stats: { value: "50+", label: "Modelos Disponíveis" }
    },
    {
      title: "Confiança",
      subtitle: "Total",
      description: "Transparência absoluta em cada negócio. Documentação em dia, histórico completo e garantia em que pode confiar.",
      accent: "✨",
      stats: { value: "100%", label: "Transparência" }
    }
  ];
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
    
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <motion.div 
        style={{ y: yTransform }}
        className="absolute inset-0 bg-gradient-hero"
      >
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        
        {/* Mouse-following glow */}
        <motion.div
          style={{
            x: mousePosition.x * 100 - 50,
            y: mousePosition.y * 100 - 50,
          }}
          className="absolute w-96 h-96 bg-accent-gold/8 rounded-full blur-3xl pointer-events-none"
        />
        
        {/* Enhanced Floating Orbs */}
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
        
        {/* Floating Geometric Shapes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity,
              delay: i * 1.5
            }}
            className={`absolute opacity-5 ${
              i % 2 === 0 ? 'w-3 h-3 bg-accent-gold rounded-full' : 
              'w-4 h-4 border border-accent-gold rotate-45'
            }`}
            style={{
              top: `${25 + (i * 20)}%`,
              left: `${15 + (i * 15)}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-20">
          
          {/* Text Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-3 glass-luxury px-6 py-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-5 w-5 text-accent-gold" fill="currentColor" />
              </motion.div>
              <span className="text-accent-gold font-semibold tracking-wide">Carros Seleccionados</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-accent-gold rounded-full"
              />
            </motion.div>

            {/* Enhanced Animated Title */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <motion.h1 className="hero-title leading-tight">
                    <span className="text-text-primary block mb-2">
                      {heroSlides[currentSlide].title}
                    </span>
                    <span className="text-gradient block">
                      {heroSlides[currentSlide].subtitle}
                    </span>
                  </motion.h1>
                  
                  {/* Accent with glow effect */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute -top-6 -right-6 text-4xl opacity-20"
                    style={{
                      filter: "drop-shadow(0 0 15px rgba(217, 119, 6, 0.4))"
                    }}
                  >
                    {heroSlides[currentSlide].accent}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Enhanced Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-text-subtle max-w-2xl leading-relaxed"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Stats Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-gold/80 rounded-full flex items-center justify-center shadow-glow">
                  <Trophy className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-gold">
                    {heroSlides[currentSlide].stats.value}
                  </div>
                  <div className="text-sm text-text-subtle">
                    {heroSlides[currentSlide].stats.label}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <Link href="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-luxury group"
                >
                  <span className="text-lg">Ver Disponíveis</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center group-hover:bg-accent-gold/30 transition-colors">
                    <Play className="h-5 w-5 text-accent-gold ml-1" fill="currentColor" />
                  </div>
                  <span className="text-lg">Simulação Online</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Enhanced Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-4 pt-8"
            >
              <div className="flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="group relative"
                  >
                    <div className={`w-16 h-2 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'bg-accent-gold shadow-glow' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`} />
                    {index === currentSlide && (
                      <motion.div
                        layoutId="activeSlide"
                        className="absolute inset-0 bg-accent-gold rounded-full shadow-glow"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-sm text-text-subtle">
                {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Content - 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            {/* Enhanced 3D Car Showcase */}
            <div className="relative perspective-1000">
              <motion.div
                style={{ x, y }}
                animate={{ 
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, -2, 0, 2, 0]
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="card-showcase p-8 aspect-square shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Main Car Display */}
                <div className="w-full h-full flex items-center justify-center relative">
                  <motion.div
                    animate={{ 
                      scale: isHovered ? 1.1 : 1,
                      rotateZ: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      scale: { duration: 0.3 },
                      rotateZ: { duration: 8, repeat: Infinity }
                    }}
                    className="text-[10rem] relative z-10"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(217, 119, 6, 0.3))"
                    }}
                  >
                    🏎️
                  </motion.div>
                  
                  {/* Enhanced Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-gold/10 rounded-3xl"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-2 border-accent-gold/30 rounded-3xl"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border border-accent-gold/20 rounded-3xl"
                  />
                </div>
              </motion.div>
              
              {/* Enhanced Floating Feature Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-6 -left-6 glass-luxury p-6 rounded-xl animate-float shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-gold to-accent-gold/80 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="text-accent-gold font-bold">Inspeccionado</div>
                    <div className="text-text-subtle text-sm">Qualidade</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 glass-luxury p-6 rounded-xl animate-float shadow-xl"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-emerald-400 font-bold">Garantia</div>
                    <div className="text-text-subtle text-sm">Incluída</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute top-1/2 -right-8 glass-luxury p-6 rounded-xl animate-float shadow-xl"
                style={{ animationDelay: '4s' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold">Fiabilidade</div>
                    <div className="text-text-subtle text-sm">Testada</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="w-8 h-16 border-2 border-accent-gold/50 rounded-full flex justify-center p-3 glass-luxury">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-4 bg-accent-gold rounded-full"
            />
          </div>
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-accent-gold/70 text-xs font-medium tracking-[0.2em] uppercase"
          >
            Descubra Mais
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            height: [100, 150, 100],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-1 bg-gradient-to-b from-accent-gold via-accent-gold/50 to-transparent"
        />
        <motion.div
          animate={{ 
            height: [120, 180, 120],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-10 w-1 bg-gradient-to-t from-accent-gold via-accent-gold/50 to-transparent"
        />
        
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-accent-gold/20"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-accent-gold/20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-accent-gold/20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-accent-gold/20"></div>
      </div>
    </section>
  );
}
