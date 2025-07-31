'use client';

import { motion } from 'framer-motion';
import { Award, Users, Shield, Clock, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2024', title: 'Início', description: 'BCar nasce com a missão de democratizar o acesso a carros de qualidade.' },
    { year: '2024', title: 'Primeiro Stock', description: 'Selecionamos cuidadosamente os primeiros 50 carros usados de qualidade.' },
    { year: '2024', title: 'Transparência Total', description: 'Implementamos política de 100% transparência na inspeção de veículos.' },
    { year: '2025', title: 'Crescimento', description: 'Expandimos a nossa seleção para atender todos os orçamentos.' },
    { year: '2025', title: 'Confiança', description: 'Construímos uma base sólida de clientes satisfeitos.' },
    { year: 'Futuro', title: 'Expansão', description: 'Planos para nos tornarmos a referência nacional em carros usados.' },
  ];

  const team = [
    {
      name: 'Carlos Silva',
      position: 'Fundador',
      experience: 'Novo no mercado',
      description: 'Empreendedor com paixão por carros e transparência nos negócios.',
    },
    {
      name: 'Ana Costa',
      position: 'Especialista em Vendas',
      experience: 'Atendimento focado',
      description: 'Dedicada a encontrar o carro perfeito para cada orçamento.',
    },
    {
      name: 'Miguel Santos',
      position: 'Inspetor Técnico',
      experience: 'Qualidade garantida',
      description: 'Responsável por garantir que cada carro atende aos nossos padrões.',
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Compromisso com a excelência em cada carro usado que oferecemos.',
    },
    {
      icon: Shield,
      title: 'Transparência',
      description: 'Honestidade total em todos os negócios, sem surpresas desagradáveis.',
    },
    {
      icon: Users,
      title: 'Acessibilidade',
      description: 'Carros para todos os orçamentos, mantendo sempre a qualidade.',
    },
    {
      icon: Clock,
      title: 'Confiança',
      description: 'Cada carro é testado e inspecionado antes de chegar até si.',
    },
  ];

  return (
    <div className="min-h-screen bg-primary pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-6">
              A Nossa <span className="text-gradient">História</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-subtle max-w-4xl mx-auto leading-relaxed">
              A BCar é um novo conceito no mercado automóvel português, 
              focado em democratizar o acesso a carros usados de qualidade 
              com total transparência e honestidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary mb-4">Missão</h3>
              <p className="text-text-subtle leading-relaxed">
                Tornar carros de qualidade acessíveis a todos os orçamentos, 
                mantendo sempre a transparência e honestidade em cada negócio.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary mb-4">Visão</h3>
              <p className="text-text-subtle leading-relaxed">
                Ser reconhecida como a referência em carros usados de confiança, 
                expandindo o acesso a veículos de qualidade por todo o país.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent-gold" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary mb-4">Valores</h3>
              <p className="text-text-subtle leading-relaxed">
                Integridade, excelência, inovação e compromisso com a satisfação 
                total dos nossos clientes em cada interação.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
              A Nossa <span className="text-gradient">Jornada</span>
            </h2>
            <p className="text-xl text-text-subtle max-w-3xl mx-auto">
              Acompanhe os momentos mais importantes da nossa jornada desde o início.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent-gold/30"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-primary rounded-xl p-6 border border-accent-gold/20 shadow-luxury">
                      <div className="text-2xl font-bold text-accent-gold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-serif font-bold text-text-primary mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-text-subtle leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent-gold rounded-full border-4 border-primary shadow-luxury"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
              A Nossa <span className="text-gradient">Equipa</span>
            </h2>
            <p className="text-xl text-text-subtle max-w-3xl mx-auto">
              Conheça os profissionais experientes que tornam a BCar uma referência no mercado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-luxury text-center group"
              >
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>

                <h3 className="text-xl font-serif font-bold text-text-primary mb-2">
                  {member.name}
                </h3>
                
                <div className="text-accent-gold font-medium mb-2">
                  {member.position}
                </div>
                
                <div className="text-text-subtle text-sm mb-4">
                  {member.experience}
                </div>
                
                <p className="text-text-subtle text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
              Os Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-xl text-text-subtle max-w-3xl mx-auto">
              Princípios fundamentais que orientam todas as nossas ações e decisões.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/30 transition-all duration-300"
                >
                  <value.icon className="h-8 w-8 text-accent-gold" />
                </motion.div>

                <h3 className="text-xl font-serif font-bold text-text-primary mb-4">
                  {value.title}
                </h3>
                
                <p className="text-text-subtle leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
              Certificações e <span className="text-gradient">Reconhecimentos</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Transparência Total', description: 'Política de Honestidade' },
              { title: 'Satisfação Cliente', description: '100% Carros Inspecionados' },
              { title: 'Preços Justos', description: 'Carros Usados de Qualidade' },
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-secondary-100 rounded-xl p-8 border border-accent-gold/20"
              >
                <CheckCircle className="h-12 w-12 text-accent-gold mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-text-primary mb-2">
                  {cert.title}
                </h3>
                <p className="text-text-subtle">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
