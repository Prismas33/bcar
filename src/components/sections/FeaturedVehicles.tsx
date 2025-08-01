'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { Button } from '@/components/ui/Button';
import { formatPrice, getStatusLabel, getFuelLabel } from '@/lib/utils/cn';

export default function FeaturedVehicles() {
  const featuredVehicles = mockVehicles.filter(vehicle => vehicle.destaque);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring" as const,
        bounce: 0.3
      },
    },
  };

  const handleViewDetails = (id: string) => {
    window.location.href = `/vehicle/${id}`;
  };

  const nextVehicle = () => {
    setSelectedVehicle((prev) => (prev + 1) % featuredVehicles.length);
  };

  const prevVehicle = () => {
    setSelectedVehicle((prev) => (prev - 1 + featuredVehicles.length) % featuredVehicles.length);
  };

  return (
    <section className="pb-10 sm:pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-secondary-100 to-luxury-black">
        <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-5"></div>
        <motion.div
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 50%, rgba(184,134,11,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(184,134,11,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(184,134,11,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          {/* Premium Collection Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center space-x-2 glass-luxury px-6 py-3 mb-8"
          >
            <Star className="h-5 w-5 text-accent-gold" />
            <span className="text-accent-gold font-semibold">Seleção Especial</span>
            <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif text-text-primary mb-6 tracking-tight">
            Carros Selecionados
            <span className="block text-gradient">Para Si</span>
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="section-divider mx-auto mb-8"
          />
          
          <p className="text-lg md:text-xl lg:text-2xl text-text-subtle max-w-4xl mx-auto leading-relaxed">
            Cada veículo da nossa seleção é cuidadosamente inspecionado para garantir 
            <span className="text-accent-gold font-semibold"> qualidade, fiabilidade</span> e 
            <span className="text-accent-gold font-semibold"> valor justo</span>.
          </p>
        </motion.div>

        {/* Hero Vehicle Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-20"
        >
          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVehicle}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
                className="card-showcase p-2 sm:p-4 md:p-8 lg:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
                  {/* Vehicle Image */}
                  <div className="relative">
                    <div className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-accent-gold/30">
                      <motion.img
                        key={`image-${selectedVehicle}`}
                        src={featuredVehicles[selectedVehicle]?.imagens[0]}
                        alt={`${featuredVehicles[selectedVehicle]?.marca} ${featuredVehicles[selectedVehicle]?.modelo}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          // Fallback para emoji se a imagem não carregar
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback emoji (hidden by default) */}
                      <div className="hidden w-full h-full bg-gradient-to-br from-secondary-200 to-secondary-300 items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotateY: [0, 5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-accent-gold text-6xl sm:text-8xl"
                        >
                          🚗
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Floating Premium Badge */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-luxury p-2 sm:p-3 rounded-lg sm:rounded-xl"
                    >
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-accent-gold" />
                    </motion.div>

                    {/* Mobile Info Overlay */}
                    <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 rounded-b-xl sm:rounded-b-2xl">
                      <motion.h3
                        key={`mobile-title-${selectedVehicle}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg sm:text-xl font-serif font-bold text-white mb-1"
                      >
                        {featuredVehicles[selectedVehicle]?.marca} {featuredVehicles[selectedVehicle]?.modelo}
                      </motion.h3>
                      
                      <motion.div
                        key={`mobile-price-${selectedVehicle}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-base sm:text-lg font-bold text-accent-gold mb-2"
                      >
                        {formatPrice(featuredVehicles[selectedVehicle]?.preco || 0)}
                      </motion.div>

                      {/* Mobile specs */}
                      <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-white/80">
                        <div className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>{featuredVehicles[selectedVehicle]?.ano}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📊</span>
                          <span>{((featuredVehicles[selectedVehicle]?.quilometragem || 0) / 1000).toFixed(0)}k km</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>⛽</span>
                          <span>{getFuelLabel(featuredVehicles[selectedVehicle]?.combustivel || '')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info - Desktop Only */}
                  <div className="hidden lg:block space-y-6">
                    <div>
                      <motion.h3
                        key={`title-${selectedVehicle}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-serif font-bold text-text-primary mb-2"
                      >
                        {featuredVehicles[selectedVehicle]?.marca} {featuredVehicles[selectedVehicle]?.modelo}
                      </motion.h3>
                      
                      <motion.div
                        key={`price-${selectedVehicle}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-gradient mb-4"
                      >
                        {formatPrice(featuredVehicles[selectedVehicle]?.preco || 0)}
                      </motion.div>
                    </div>

                    <motion.p
                      key={`desc-${selectedVehicle}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-text-subtle leading-relaxed text-lg"
                    >
                      {featuredVehicles[selectedVehicle]?.descricao}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex space-x-4"
                    >
                      <Button
                        variant="primary"
                        onClick={() => handleViewDetails(featuredVehicles[selectedVehicle]?.id || '')}
                        className="group"
                      >
                        <Eye className="h-5 w-5 mr-2" />
                        <span>Ver Detalhes</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Mobile Action Button */}
                  <div className="lg:hidden mt-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        variant="primary"
                        onClick={() => handleViewDetails(featuredVehicles[selectedVehicle]?.id || '')}
                        className="w-full group py-3 text-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        <span>Ver Detalhes</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevVehicle}
              className="absolute left-1 sm:left-2 lg:left-4 top-1/3 sm:top-1/2 -translate-y-1/2 glass-luxury p-1.5 sm:p-2 lg:p-3 rounded-full hover:bg-accent-gold/20 transition-all duration-300 group z-10"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-accent-gold group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={nextVehicle}
              className="absolute right-1 sm:right-2 lg:right-4 top-1/3 sm:top-1/2 -translate-y-1/2 glass-luxury p-1.5 sm:p-2 lg:p-3 rounded-full hover:bg-accent-gold/20 transition-all duration-300 group z-10"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-accent-gold group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-4 sm:mt-8">
              {featuredVehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVehicle(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === selectedVehicle 
                      ? 'bg-accent-gold shadow-glow scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Vehicle Grid - Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-20"
        >
          {featuredVehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id} 
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(vehicle.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: hoveredCard === vehicle.id ? 1.05 : 1,
                  rotateY: hoveredCard === vehicle.id ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <VehicleCard
                  vehicle={vehicle}
                  onViewDetails={handleViewDetails}
                  showStatus={true}
                />
              </motion.div>
              
              {/* Hover Glow Effect */}
              <AnimatePresence>
                {hoveredCard === vehicle.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 -z-10 bg-accent-gold/20 rounded-2xl blur-xl"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Vehicle List - Mobile Only */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="md:hidden space-y-4 mb-12 md:mb-20"
        >
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleViewDetails(vehicle.id)}
              className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 hover:border-accent-gold/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex space-x-4">
                {/* Imagem pequena à esquerda */}
                <div className="w-20 h-16 flex-shrink-0 relative rounded-lg overflow-hidden">
                  <img
                    src={vehicle.imagens[0]}
                    alt={`${vehicle.marca} ${vehicle.modelo}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-secondary-200 to-secondary-300 items-center justify-center text-accent-gold text-xl">
                    🚗
                  </div>
                  
                  {/* Status badge overlay */}
                  {vehicle.status !== 'disponivel' && (
                    <div className="absolute top-0 right-0 w-3 h-3 rounded-full border border-white" 
                         style={{
                           backgroundColor: vehicle.status === 'reservado' ? '#fbbf24' : 
                                          vehicle.status === 'vendido' ? '#ef4444' : '#3b82f6'
                         }}>
                    </div>
                  )}
                </div>

                {/* Características à direita */}
                <div className="flex-1 min-w-0">
                  {/* Título e preço */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-text-primary truncate">
                        {vehicle.marca} {vehicle.modelo}
                      </h3>
                      <p className="text-lg font-black text-accent-gold">
                        {formatPrice(vehicle.preco)}
                      </p>
                    </div>
                    
                    {/* Premium badge */}
                    {vehicle.destaque && (
                      <div className="w-6 h-6 bg-accent-gold/20 rounded-full flex items-center justify-center ml-2">
                        <span className="text-accent-gold text-xs">★</span>
                      </div>
                    )}
                  </div>

                  {/* Especificações essenciais em linha */}
                  <div className="flex items-center space-x-4 text-xs text-text-subtle">
                    <div className="flex items-center space-x-1">
                      <span>📅</span>
                      <span>{vehicle.ano}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>📊</span>
                      <span>{(vehicle.quilometragem / 1000).toFixed(0)}k km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>⛽</span>
                      <span className="truncate max-w-[60px]">{getFuelLabel(vehicle.combustivel)}</span>
                    </div>
                  </div>

                  {/* Status text (se não for disponível) */}
                  {vehicle.status !== 'disponivel' && (
                    <div className="mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        vehicle.status === 'reservado' 
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : vehicle.status === 'vendido'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {getStatusLabel(vehicle.status)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Seta de ação */}
                <div className="flex items-center justify-center w-8">
                  <ArrowRight className="h-4 w-4 text-accent-gold/60" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-luxury p-6 sm:p-12 rounded-2xl sm:rounded-3xl max-w-md sm:max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-text-primary mb-4 sm:mb-6">
              Pronto para <span className="text-gradient">Encontrar o Seu Carro</span>?
            </h3>
            <p className="text-base sm:text-xl text-text-subtle mb-6 sm:mb-8 max-w-xs sm:max-w-2xl mx-auto">
              Explore toda a nossa seleção de carros usados de qualidade e encontre o veículo perfeito para o seu orçamento.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = '/catalog'}
                className="group text-base sm:text-lg px-6 sm:px-12 py-4 sm:py-6 w-full sm:w-auto"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
