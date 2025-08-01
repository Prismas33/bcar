'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Fuel, 
  Gauge, 
  Settings,
  Palette,
  CheckCircle,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Users
} from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/cn';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  // Resolve os params no Next.js 15
  const { id } = await params;
  
  // Buscar veículo pelos dados mock
  const vehicle = mockVehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-primary pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-serif text-text-primary mb-4">
            Veículo não encontrado
          </h2>
          <Link href="/catalog">
            <Button variant="secondary">Voltar ao Catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <VehicleDetailClient vehicle={vehicle} />;
}

// Componente client separado para toda a lógica de estado
function VehicleDetailClient({ vehicle }: { vehicle: Vehicle }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(false);
    alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header com navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <Link 
            href="/catalog"
            className="flex items-center space-x-2 text-text-subtle hover:text-accent-gold transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar ao Catálogo</span>
          </Link>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'bg-accent-gold text-primary border-accent-gold' 
                  : 'bg-secondary-100 text-text-subtle border-accent-gold/20 hover:border-accent-gold'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-lg bg-secondary-100 text-text-subtle border border-accent-gold/20 hover:border-accent-gold transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Galeria de Imagens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Imagem Principal */}
            <div className="aspect-[4/3] bg-gradient-subtle rounded-xl overflow-hidden mb-4 border border-accent-gold/20">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-accent-gold text-8xl">🚗</div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gradient-subtle rounded-lg border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-accent-gold' 
                      : 'border-accent-gold/20 hover:border-accent-gold/50'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-accent-gold text-2xl">🚗</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Informações do Veículo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                vehicle.status === 'disponivel' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : vehicle.status === 'reservado'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                <CheckCircle className="h-4 w-4 mr-1" />
                {vehicle.status === 'disponivel' ? 'Disponível' : 
                 vehicle.status === 'reservado' ? 'Reservado' : 'Em Negociação'}
              </span>
            </div>

            {/* Título e Preço */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-primary mb-2">
              {vehicle.marca} {vehicle.modelo}
            </h1>
            
            <div className="text-4xl font-bold text-gradient mb-6">
              {formatPrice(vehicle.preco)}
            </div>

            {/* Especificações Principais */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-3 bg-secondary-100 rounded-lg border border-accent-gold/20">
                <Calendar className="h-5 w-5 text-accent-gold" />
                <div>
                  <p className="text-sm text-text-subtle">Ano</p>
                  <p className="font-semibold text-text-primary">{vehicle.ano}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-secondary-100 rounded-lg border border-accent-gold/20">
                <Gauge className="h-5 w-5 text-accent-gold" />
                <div>
                  <p className="text-sm text-text-subtle">Quilometragem</p>
                  <p className="font-semibold text-text-primary">{vehicle.quilometragem.toLocaleString()} km</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-secondary-100 rounded-lg border border-accent-gold/20">
                <Fuel className="h-5 w-5 text-accent-gold" />
                <div>
                  <p className="text-sm text-text-subtle">Combustível</p>
                  <p className="font-semibold text-text-primary capitalize">{vehicle.combustivel}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-secondary-100 rounded-lg border border-accent-gold/20">
                <Settings className="h-5 w-5 text-accent-gold" />
                <div>
                  <p className="text-sm text-text-subtle">Transmissão</p>
                  <p className="font-semibold text-text-primary capitalize">{vehicle.transmissao}</p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-text-primary mb-3">
                Descrição
              </h3>
              <p className="text-text-subtle leading-relaxed">
                {vehicle.descricao}
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                className="flex-1 flex items-center justify-center space-x-2"
                onClick={() => setShowContactModal(true)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Solicitar Informações</span>
              </Button>
              
              <Button
                variant="secondary"
                className="flex items-center justify-center space-x-2"
                onClick={() => window.open('tel:+351234567890')}
              >
                <Phone className="h-5 w-5" />
                <span>Ligar Agora</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Especificações Detalhadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-serif font-bold text-text-primary mb-8">
            Especificações Técnicas
          </h2>
          
          <div className="bg-secondary-100 rounded-xl p-6 border border-accent-gold/20">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Características Principais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicle.especificacoes.caracteristicas.map((caracteristica, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full"></div>
                  <span className="text-text-subtle">{caracteristica}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Contacto */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-secondary-100 rounded-xl p-6 w-full max-w-md border border-accent-gold/20"
          >
            <h3 className="text-xl font-serif font-bold text-text-primary mb-4">
              Solicitar Informações
            </h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  required
                  className="w-full px-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-none"
                  placeholder={`Estou interessado no ${vehicle.marca} ${vehicle.modelo}...`}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
