'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Users, Clock } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      icon: Award,
      title: 'Excelência',
      description: 'Compromisso com a qualidade e perfeição em cada veículo.',
    },
    {
      icon: Shield,
      title: 'Confiança',
      description: 'Mais de 20 anos de experiência e transparência total.',
    },
    {
      icon: Users,
      title: 'Personalização',
      description: 'Atendimento personalizado para cada cliente único.',
    },
    {
      icon: Clock,
      title: 'Tradição',
      description: 'Décadas de tradição no mercado automóvel de luxo.',
    },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">
              Sobre a <span className="text-gradient">CarLuxury</span>
            </h2>
            
            <p className="text-xl text-text-subtle mb-8 leading-relaxed">
              Há mais de duas décadas, a CarLuxury tem sido sinónimo de excelência 
              no mercado automóvel de luxo em Portugal. Especializamo-nos em oferecer 
              veículos premium cuidadosamente selecionados, garantindo qualidade, 
              elegância e performance incomparáveis.
            </p>

            <p className="text-lg text-text-subtle mb-8 leading-relaxed">
              A nossa missão é proporcionar uma experiência única na aquisição do 
              seu veículo de sonho, com atendimento personalizado e total transparência 
              em todos os processos.
            </p>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-2">20+</div>
                <div className="text-text-subtle">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-2">1000+</div>
                <div className="text-text-subtle">Veículos Vendidos</div>
              </div>
            </div>

            <button className="btn-primary">
              Conheça a Nossa História
            </button>
          </motion.div>

          {/* Valores */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-morph p-6 text-center group hover:bg-accent-gold/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-gold/20 rounded-full mb-4 group-hover:bg-accent-gold/30 transition-colors">
                  <value.icon className="h-6 w-6 text-accent-gold" />
                </div>
                
                <h3 className="text-lg font-serif font-semibold text-text-primary mb-2">
                  {value.title}
                </h3>
                
                <p className="text-text-subtle text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-serif font-bold text-center text-text-primary mb-12">
            A Nossa <span className="text-gradient">Jornada</span>
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent-gold/30"></div>

            <div className="space-y-12">
              {[
                { year: '2000', event: 'Fundação da CarLuxury em Lisboa' },
                { year: '2010', event: 'Expansão para todo o território nacional' },
                { year: '2015', event: 'Certificação de excelência no atendimento' },
                { year: '2020', event: 'Lançamento da plataforma digital' },
                { year: '2024', event: 'Mais de 1000 clientes satisfeitos' },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="glass-morph p-4 inline-block">
                      <div className="text-accent-gold font-bold text-lg">{item.year}</div>
                      <div className="text-text-subtle">{item.event}</div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-gold rounded-full border-4 border-primary"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
