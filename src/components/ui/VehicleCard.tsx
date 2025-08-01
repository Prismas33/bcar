'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Fuel, 
  Gauge, 
  ArrowRight, 
  Heart, 
  Eye, 
  Settings,
  Palette,
  Star,
  Crown,
  Zap
} from 'lucide-react';
import { formatPrice, getStatusColor, getStatusLabel, getFuelLabel } from '@/lib/utils/cn';
import { Vehicle } from '@/types';
import { Button } from './Button';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails?: (id: string) => void;
  onAddToFavorites?: (id: string) => void;
  isFavorite?: boolean;
  showStatus?: boolean;
}

export function VehicleCard({ 
  vehicle, 
  onViewDetails, 
  onAddToFavorites, 
  isFavorite = false,
  showStatus = true 
}: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        bounce: 0.3
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="card-showcase group cursor-pointer relative overflow-hidden"
    >
      {/* Premium Badge */}
      {vehicle.destaque && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-4 left-4 z-10 glass-luxury p-2 rounded-xl"
        >
          <Crown className="h-4 w-4 text-accent-gold" />
        </motion.div>
      )}

      {/* Vehicle Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
        {/* Main Image Container */}
        <motion.div 
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          {/* Vehicle Image */}
          <img
            src={vehicle.imagens[0]}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              // Fallback para emoji se a imagem não carregar
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          
          {/* Fallback Car Icon (hidden by default) */}
          <motion.div
            animate={{ 
              rotateY: isHovered ? [0, 15, 0] : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.8 }}
            className="hidden w-full h-full bg-gradient-to-br from-secondary-200 to-secondary-300 items-center justify-center text-accent-gold text-5xl relative z-10"
          >
            🚗
          </motion.div>
          
          {/* Glow Effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.8 : 0.3,
              scale: isHovered ? 1.5 : 1
            }}
            className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-gold/10 rounded-t-3xl"
          />
        </motion.div>
        
        {/* Status Badge */}
        {showStatus && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 z-10"
          >
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
              vehicle.status === 'disponivel' 
                ? 'bg-green-500/20 text-green-300 border-green-500/30 shadow-glow'
                : vehicle.status === 'reservado'
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                : vehicle.status === 'vendido'
                ? 'bg-red-500/20 text-red-300 border-red-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                vehicle.status === 'disponivel' ? 'bg-green-400' : 
                vehicle.status === 'reservado' ? 'bg-yellow-400' : 
                vehicle.status === 'vendido' ? 'bg-red-400' : 'bg-blue-400'
              }`} />
              {getStatusLabel(vehicle.status)}
            </span>
          </motion.div>
        )}

        {/* Favorite Button */}
        {onAddToFavorites && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavorites(vehicle.id);
            }}
            className="absolute bottom-4 left-4 z-10 w-10 h-10 glass-luxury backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-accent-gold/20 transition-all group"
          >
            <Heart 
              className={`h-5 w-5 transition-all ${
                isFavorite 
                  ? 'text-accent-gold fill-current scale-110' 
                  : 'text-white group-hover:text-accent-gold'
              }`} 
            />
          </motion.button>
        )}

        {/* Hover Overlay with Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-t-3xl"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="flex space-x-3"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails?.(vehicle.id);
                  }}
                  className="glass-luxury p-3 rounded-xl hover:bg-accent-gold/20 transition-all group"
                >
                  <Eye className="h-5 w-5 text-accent-gold group-hover:scale-110 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-luxury p-3 rounded-xl hover:bg-accent-gold/20 transition-all group"
                >
                  <Zap className="h-5 w-5 text-accent-gold group-hover:scale-110 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section - Responsive padding */}
      <div className="p-4 sm:p-6 relative">
        {/* Vehicle Title - Responsive sizing */}
        <motion.h3
          animate={{ color: isHovered ? '#b8860b' : '#ffffff' }}
          className="text-lg sm:text-xl md:text-2xl font-serif font-bold mb-2 transition-colors leading-tight"
        >
          {vehicle.marca} {vehicle.modelo}
        </motion.h3>
        
        {/* Price with Animation - Responsive sizing */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          className="text-xl sm:text-2xl md:text-3xl font-black text-gradient mb-4 sm:mb-6"
        >
          {formatPrice(vehicle.preco)}
        </motion.div>

        {/* Specifications Grid - Responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 glass-luxury p-2 sm:p-3 rounded-lg"
          >
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-text-subtle">Ano</div>
              <div className="text-text-primary font-semibold text-sm sm:text-base">{vehicle.ano}</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 glass-luxury p-2 sm:p-3 rounded-lg"
          >
            <Gauge className="h-3 w-3 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-text-subtle">KM</div>
              <div className="text-text-primary font-semibold text-sm sm:text-base">{(vehicle.quilometragem / 1000).toFixed(0)}k</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 glass-luxury p-2 sm:p-3 rounded-lg"
          >
            <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-text-subtle">Combustível</div>
              <div className="text-text-primary font-semibold text-sm sm:text-base truncate">{getFuelLabel(vehicle.combustivel)}</div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 glass-luxury p-2 sm:p-3 rounded-lg"
          >
            <Palette className="h-3 w-3 sm:h-4 sm:w-4 text-accent-gold flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-text-subtle">Cor</div>
              <div className="text-text-primary font-semibold text-sm sm:text-base truncate">{vehicle.cor}</div>
            </div>
          </motion.div>
        </div>

        {/* Rating Stars - Mobile optimized */}
        <div className="flex items-center space-x-1 mb-4 sm:mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-accent-gold fill-current" />
            </motion.div>
          ))}
          <span className="text-text-subtle text-xs sm:text-sm ml-1 sm:ml-2">Certificado Premium</span>
        </div>

        {/* Action Buttons - More mobile-friendly */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs sm:text-sm font-medium py-2 sm:py-3"
              onClick={(e) => {
                e.stopPropagation();
                // Quick info modal
              }}
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Especificações</span>
              <span className="sm:hidden">Specs</span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              variant="primary"
              size="sm"
              className="w-full text-xs sm:text-sm font-medium group py-2 sm:py-3"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(vehicle.id);
              }}
            >
              <span>Ver Detalhes</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Hover Glow Background */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 -z-10 bg-accent-gold/5 rounded-3xl blur-xl"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
