'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Car, Users, Star, Award, Clock, Shield, Trophy, Diamond } from 'lucide-react';
import { useRef } from 'react';

// Counter Animation Hook
function useCounter(end: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return count;
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: Diamond,
      value: useCounter(50, 2000, isInView),
      suffix: '+',
      label: 'Carros Disponíveis',
      description: 'Seleção cuidadosa',
      color: 'from-accent-gold to-accent-gold-light',
    },
    {
      icon: Users,
      value: useCounter(100, 2500, isInView),
      suffix: '%',
      label: 'Transparência',
      description: 'Honestidade total',
      color: 'from-accent-platinum to-luxury-cream',
    },
    {
      icon: Trophy,
      value: useCounter(100, 1800, isInView),
      suffix: '%',
      label: 'Inspecionados',
      description: 'Qualidade garantida',
      color: 'from-accent-bronze to-accent-gold',
    },
    {
      icon: Award,
      value: useCounter(0, 1500, isInView),
      suffix: '',
      label: 'Enganação',
      description: 'Política transparente',
      color: 'from-accent-gold to-accent-rose',
    },
  ];

  const achievements = [
    {
      icon: Shield,
      title: 'Garantia Incluída',
      description: 'Todos os carros com garantia de funcionamento'
    },
    {
      icon: Clock,
      title: 'Apoio Completo',
      description: 'Suporte durante todo o processo de compra'
    },
    {
      icon: Star,
      title: 'Qualidade Testada',
      description: 'Cada carro é inspecionado antes da venda'
    },
  ];

  return (
    <section ref={ref} className="pt-0 pb-16 md:pb-32 relative overflow-hidden">
      {/* Luxury Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-secondary-200 to-luxury-charcoal">
          <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-5"></div>
          <motion.div
            animate={{ 
              background: [
                "radial-gradient(circle at 30% 40%, rgba(184,134,11,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 60%, rgba(184,134,11,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 40%, rgba(184,134,11,0.15) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center space-x-2 glass-luxury px-6 py-3 mb-8"
          >
            <Trophy className="h-5 w-5 text-accent-gold" />
            <span className="text-accent-gold font-semibold">Números de Excelência</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif text-text-primary mb-6 tracking-tight">
            Prestígio em
            <span className="block text-gradient">Números</span>
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="section-divider mx-auto mb-8"
          />
          
          <p className="text-lg md:text-xl lg:text-2xl text-text-subtle max-w-4xl mx-auto leading-relaxed">
            Um novo conceito definindo o padrão de 
            <span className="text-accent-gold font-semibold"> transparência automobilística</span> e 
            <span className="text-accent-gold font-semibold"> preços justos</span>.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                bounce: 0.3
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-showcase p-4 md:p-8 h-full">
                {/* Icon with Gradient Background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 md:mb-6 shadow-luxury`}
                >
                  <stat.icon className="h-6 w-6 md:h-10 md:w-10 text-luxury-black" />
                </motion.div>

                {/* Animated Value */}
                <motion.div
                  className="text-3xl md:text-5xl lg:text-6xl font-black text-gradient mb-2 md:mb-3"
                >
                  {stat.value}{stat.suffix}
                </motion.div>

                {/* Label */}
                <h3 className="text-sm md:text-xl font-serif font-bold text-text-primary mb-2 md:mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-text-subtle leading-relaxed text-xs md:text-base">
                  {stat.description}
                </p>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-accent-gold/10 rounded-3xl -z-10 blur-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-luxury p-4 md:p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-500"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-accent-gold/20 rounded-full mb-3 md:mb-4"
              >
                <achievement.icon className="h-6 w-6 md:h-8 md:w-8 text-accent-gold" />
              </motion.div>
              
              <h4 className="text-base md:text-lg font-serif font-bold text-text-primary mb-1 md:mb-2">
                {achievement.title}
              </h4>
              
              <p className="text-text-subtle text-sm">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-luxury p-6 md:p-12 lg:p-16 rounded-3xl text-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent rounded-3xl"></div>
            
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-8 right-8 w-16 h-16 border border-accent-gold/20 rounded-full"
            />

            <div className="relative z-10">
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-block text-4xl md:text-6xl text-accent-gold/30 mb-4 md:mb-6"
              >
                "
              </motion.div>

              <blockquote className="text-lg md:text-2xl lg:text-3xl font-serif italic text-text-primary mb-6 md:mb-8 max-w-4xl">
                "BCar é honestidade pura. Encontrei exatamente o que procurava, 
                sem surpresas, com transparência total e preço justo."
              </blockquote>
              
              <div className="flex items-center justify-center space-x-3 md:space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent-gold to-accent-gold-light rounded-full flex items-center justify-center shadow-luxury"
                >
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-luxury-black" />
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-text-primary text-base md:text-lg">Dr. António Mendes</div>
                  <div className="text-text-subtle text-sm">Cliente VIP desde 2018</div>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-accent-gold fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
