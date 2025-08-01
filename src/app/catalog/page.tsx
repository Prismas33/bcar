'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { MobileFilters } from '@/components/ui/MobileFilters';
import { Button } from '@/components/ui/Button';
import { formatPrice, getStatusLabel, getFuelLabel } from '@/lib/utils/cn';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    marca: '',
    precoMinimo: '',
    precoMaximo: '',
    combustivel: '',
    status: 'disponivel',
  });

  const brands = ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Jaguar'];
  
  // Filtrar veículos baseado nos filtros e termo de busca
  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter((vehicle) => {
      // Filtro de busca
      const matchesSearch = !searchTerm || 
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtros
      const matchesBrand = !filters.marca || vehicle.marca === filters.marca;
      const matchesMinPrice = !filters.precoMinimo || vehicle.preco >= parseInt(filters.precoMinimo);
      const matchesMaxPrice = !filters.precoMaximo || vehicle.preco <= parseInt(filters.precoMaximo);
      const matchesFuel = !filters.combustivel || vehicle.combustivel === filters.combustivel;
      const matchesStatus = !filters.status || vehicle.status === filters.status;
      
      return matchesSearch && matchesBrand && matchesMinPrice && matchesMaxPrice && matchesFuel && matchesStatus;
    });
  }, [searchTerm, filters]);

  const handleViewDetails = (id: string) => {
    window.location.href = `/vehicle/${id}`;
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Catálogo de <span className="text-gradient">Veículos</span>
          </h1>
          <p className="text-xl text-text-subtle max-w-3xl mx-auto">
            Explore a nossa seleção de carros usados de qualidade. 
            Use os filtros abaixo para encontrar o seu veículo ideal.
          </p>
        </motion.div>

        {/* Search and Filters - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block bg-secondary-100 rounded-xl p-6 mb-8 border border-accent-gold/20"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-subtle" />
            <input
              type="text"
              placeholder="Pesquisar por marca ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
            />
          </div>

          {/* Desktop Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={filters.marca}
              onChange={(e) => setFilters({ ...filters, marca: e.target.value })}
              className="px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="">Todas as Marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Preço Mín."
              value={filters.precoMinimo}
              onChange={(e) => setFilters({ ...filters, precoMinimo: e.target.value })}
              className="px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
            />

            <input
              type="number"
              placeholder="Preço Máx."
              value={filters.precoMaximo}
              onChange={(e) => setFilters({ ...filters, precoMaximo: e.target.value })}
              className="px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
            />

            <select
              value={filters.combustivel}
              onChange={(e) => setFilters({ ...filters, combustivel: e.target.value })}
              className="px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="">Combustível</option>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="hibrido">Híbrido</option>
              <option value="eletrico">Elétrico</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="">Todos</option>
              <option value="disponivel">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
            </select>
          </div>
        </motion.div>

        {/* Mobile Search Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:hidden bg-secondary-100 rounded-xl p-4 mb-6 border border-accent-gold/20"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-subtle" />
            <input
              type="text"
              placeholder="Pesquisar carros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
            />
          </div>
        </motion.div>

        {/* Mobile Filters Component */}
        <MobileFilters
          filters={filters}
          onFiltersChange={setFilters}
          brands={brands}
          resultsCount={filteredVehicles.length}
        />

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-between items-center mb-8"
        >
          <p className="text-text-subtle">
            Encontrados <span className="text-accent-gold font-semibold">{filteredVehicles.length}</span> veículos
          </p>
          
          <select className="px-4 py-2 bg-secondary-100 border border-accent-gold/20 rounded-lg text-text-primary">
            <option>Ordenar por Preço</option>
            <option>Preço: Menor para Maior</option>
            <option>Preço: Maior para Menor</option>
            <option>Ano: Mais Recente</option>
            <option>Quilometragem: Menor</option>
          </select>
        </motion.div>

        {/* Vehicle Grid - Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20 lg:pb-8"
        >
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VehicleCard
                vehicle={vehicle}
                onViewDetails={handleViewDetails}
                showStatus={true}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Vehicle List - Mobile Only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="sm:hidden space-y-4 pb-20"
        >
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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

        {/* No Results */}
        {filteredVehicles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif font-bold text-text-primary mb-2">
              Nenhum veículo encontrado
            </h3>
            <p className="text-text-subtle mb-6">
              Tente ajustar os seus filtros de pesquisa
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  marca: '',
                  precoMinimo: '',
                  precoMaximo: '',
                  combustivel: '',
                  status: '',
                });
              }}
            >
              Limpar Filtros
            </Button>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredVehicles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-accent-gold hover:text-primary transition-colors">
                Anterior
              </button>
              <button className="px-4 py-2 bg-accent-gold text-primary rounded-lg">
                1
              </button>
              <button className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-accent-gold hover:text-primary transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-accent-gold hover:text-primary transition-colors">
                3
              </button>
              <button className="px-4 py-2 bg-secondary-100 text-text-primary rounded-lg hover:bg-accent-gold hover:text-primary transition-colors">
                Próximo
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
