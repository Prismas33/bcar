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
  const springConfig = { damping: 30, stiffness: 120 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Parallax effects
  const yTransform = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
    
    mouseX.set((e.clientX - centerX) * 0.05);
    mouseY.set((e.clientY - centerY) * 0.05);
    
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
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
            x: mousePosition.x * 80 - 40,
            y: mousePosition.y * 80 - 40,
          }}
          transition={{
            type: "spring",
            damping: 40,
            stiffness: 100
          }}
          className="absolute w-96 h-96 bg-accent-gold/6 rounded-full blur-3xl pointer-events-none"
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
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center min-h-[100svh] py-6 sm:py-12 lg:py-20">
          
          {/* Text Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            {/* Premium Badge - Mobile optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 sm:space-x-3 glass-luxury px-3 py-1.5 sm:px-6 sm:py-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-accent-gold" fill="currentColor" />
              </motion.div>
              <span className="text-accent-gold font-semibold tracking-wide text-sm sm:text-base">
                <span className="hidden sm:inline">Carros Seleccionados</span>
                <span className="sm:hidden">Premium</span>
              </span>
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
                  <motion.h1 className="hero-title leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span className="text-text-primary block mb-1 sm:mb-2">
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
                    className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-2xl sm:text-4xl opacity-20"
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
                className="text-sm sm:text-base md:text-lg lg:text-xl text-text-subtle max-w-xl lg:max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* Stats Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center space-x-4 sm:space-x-8"
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-gold to-accent-gold/80 rounded-full flex items-center justify-center shadow-glow">
                  <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
                </div>
                <div>
                  <div className="text-xl sm:text-3xl font-bold text-accent-gold">
                    {heroSlides[currentSlide].stats.value}
                  </div>
                  <div className="text-xs sm:text-sm text-text-subtle">
                    {heroSlides[currentSlide].stats.label}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons - Mobile optimized */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-4"
            >
              <Link href="/catalog" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-luxury group w-full sm:w-auto text-center px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3 lg:py-5"
                >
                  <span className="text-sm sm:text-base lg:text-lg">Ver Disponíveis</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary group w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-accent-gold/20 rounded-full flex items-center justify-center group-hover:bg-accent-gold/30 transition-colors">
                    <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 text-accent-gold ml-0.5" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm lg:text-base">Ver Apresentação</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Enhanced Slide Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-3 sm:space-x-4 pt-4 sm:pt-8"
            >
              <div className="flex space-x-1 sm:space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="group relative"
                  >
                    <div className={`w-8 sm:w-16 h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
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
              <div className="text-xs sm:text-sm text-text-subtle">
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
            {/* Car Showcase with floating cards */}
            <div className="relative perspective-1000 min-h-[250px] sm:min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
              {/* Main Car Image with Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Elegant Frame/Border */}
                <div className="relative p-2 sm:p-4 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-secondary-100/40 via-secondary-100/20 to-secondary-100/40 backdrop-blur-sm border border-accent-gold/20 shadow-2xl overflow-visible">
                  {/* Inner glow frame */}
                  <div className="absolute inset-0.5 sm:inset-1 lg:inset-2 rounded-lg sm:rounded-xl lg:rounded-2xl border border-accent-gold/30 bg-gradient-to-br from-accent-gold/5 via-transparent to-accent-gold/10"></div>
                  
                  {/* Car image with overflow - Mobile optimized */}
                  <motion.img
                    src="/images/audi_hero.png"
                    alt="Audi Hero Car"
                    className="w-full max-w-[400px] sm:max-w-[600px] lg:max-w-[1000px] xl:max-w-[2000px] h-auto object-contain relative z-20 transform sm:-translate-x-4 lg:-translate-x-24 sm:translate-y-12 lg:translate-y-72 sm:scale-[1.15] lg:scale-[2.0]"
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3)) sm:drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5)) lg:drop-shadow(0 40px 80px rgba(0, 0, 0, 0.5))"
                    }}
                    initial={false}
                    animate={{
                      scale: isHovered ? 
                        (isMobile ? 1.18 : 2.08) : 
                        (isMobile ? 1.15 : 2.0),
                      y: isHovered ? 
                        (isMobile ? 10 : 70) : 
                        (isMobile ? 12 : 72),
                      x: isHovered ? 
                        (isMobile ? -2 : -22) : 
                        (isMobile ? -4 : -24),
                      rotateY: isHovered ? 1 : 0,
                      filter: isHovered ? 
                        "drop-shadow(0 30px 60px rgba(218, 165, 32, 0.15))" :
                        (isMobile ? 
                          "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))" :
                          "drop-shadow(0 40px 80px rgba(0, 0, 0, 0.5))")
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Frame corner accents */}
                  <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 lg:top-2 lg:left-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-l-2 border-t-2 border-accent-gold/60 rounded-tl-lg"></div>
                  <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 lg:top-2 lg:right-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-r-2 border-t-2 border-accent-gold/60 rounded-tr-lg"></div>
                  <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 lg:bottom-2 lg:left-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-l-2 border-b-2 border-accent-gold/60 rounded-bl-lg"></div>
                  <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 lg:bottom-2 lg:right-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 border-r-2 border-b-2 border-accent-gold/60 rounded-br-lg"></div>
                </div>
                
                {/* Enhanced glow effect behind frame */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/15 via-accent-gold/8 to-accent-gold/15 rounded-xl sm:rounded-2xl lg:rounded-3xl blur-lg sm:blur-xl lg:blur-2xl scale-110 -z-10" />
                
                {/* Rotating border animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-accent-gold/20 -z-5"
                />
              </motion.div>
              
              {/* Floating Feature Cards - Hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="hidden lg:block absolute -top-8 -left-8 glass-luxury p-4 rounded-xl animate-float shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-gold to-accent-gold/80 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="text-accent-gold font-bold text-sm">Inspeccionado</div>
                    <div className="text-text-subtle text-xs">Qualidade</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="hidden lg:block absolute -bottom-8 -right-8 glass-luxury p-4 rounded-xl animate-float shadow-xl"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-emerald-400 font-bold text-sm">Garantia</div>
                    <div className="text-text-subtle text-xs">Incluída</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="hidden lg:block absolute top-1/2 -right-12 glass-luxury p-4 rounded-xl animate-float shadow-xl"
                style={{ animationDelay: '4s' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold text-sm">Fiabilidade</div>
                    <div className="text-text-subtle text-xs">Testada</div>
                  </div>
                </div>
              </motion.div>

              {/* Additional floating elements for visual appeal */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
                className="absolute top-8 right-8 w-3 h-3 bg-accent-gold/30 rounded-full"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 0.8, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, delay: 1 }
                }}
                className="absolute bottom-12 left-12 w-2 h-2 bg-accent-gold/40 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Enhanced Scroll Indicator */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-8 z-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center justify-center space-y-2 sm:space-y-3"
          >
            <div className="w-6 h-12 sm:w-8 sm:h-16 border-2 border-accent-gold/50 rounded-full flex justify-center p-2 sm:p-3 glass-luxury">
              <motion.div
                animate={{ y: [0, 12, 0, 16, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 sm:w-1.5 sm:h-4 bg-accent-gold rounded-full"
              />
            </div>
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-accent-gold/70 text-xs font-medium tracking-[0.2em] uppercase hidden sm:block text-center whitespace-nowrap"
            >
              DESCUBRA MAIS
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

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
