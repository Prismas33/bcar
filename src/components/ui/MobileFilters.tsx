'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from './Button';

interface MobileFiltersProps {
  filters: {
    marca: string;
    precoMinimo: string;
    precoMaximo: string;
    combustivel: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
  brands: string[];
  resultsCount: number;
}

export function MobileFilters({ filters, onFiltersChange, brands, resultsCount }: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      marca: '',
      precoMinimo: '',
      precoMaximo: '',
      combustivel: '',
      status: 'disponivel',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'disponivel').length;

  const FilterSection = ({ title, children, sectionKey }: { title: string; children: React.ReactNode; sectionKey: string }) => (
    <div className="border-b border-accent-gold/20 last:border-b-0">
      <button
        onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <ChevronDown 
          className={`h-4 w-4 text-accent-gold transition-transform ${
            expandedSection === sectionKey ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <AnimatePresence>
        {expandedSection === sectionKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-accent-gold text-luxury-black p-4 rounded-full shadow-luxury flex items-center space-x-2"
      >
        <Filter className="h-5 w-5" />
        {activeFiltersCount > 0 && (
          <span className="bg-luxury-black text-accent-gold rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {activeFiltersCount}
          </span>
        )}
      </motion.button>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 h-full w-full sm:w-96 bg-primary border-l border-accent-gold/20 z-50 overflow-y-auto"
            >
              <div className="glass-luxury">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-accent-gold/20">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-text-primary">Filtros</h3>
                    <p className="text-sm text-text-subtle">{resultsCount} carros encontrados</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-accent-gold/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-text-primary" />
                  </button>
                </div>

                {/* Filter Sections */}
                <div className="flex-1">
                  <FilterSection title="Marca" sectionKey="brand">
                    <div className="space-y-2">
                      <button
                        onClick={() => handleFilterChange('marca', '')}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          !filters.marca 
                            ? 'bg-accent-gold/20 text-accent-gold' 
                            : 'hover:bg-accent-gold/10 text-text-primary'
                        }`}
                      >
                        Todas as marcas
                      </button>
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => handleFilterChange('marca', brand)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            filters.marca === brand 
                              ? 'bg-accent-gold/20 text-accent-gold' 
                              : 'hover:bg-accent-gold/10 text-text-primary'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Preço" sectionKey="price">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-text-subtle mb-2">Preço mínimo</label>
                        <input
                          type="number"
                          value={filters.precoMinimo}
                          onChange={(e) => handleFilterChange('precoMinimo', e.target.value)}
                          placeholder="€0"
                          className="w-full bg-secondary-200 border border-accent-gold/20 rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-text-subtle mb-2">Preço máximo</label>
                        <input
                          type="number"
                          value={filters.precoMaximo}
                          onChange={(e) => handleFilterChange('precoMaximo', e.target.value)}
                          placeholder="€100.000"
                          className="w-full bg-secondary-200 border border-accent-gold/20 rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </FilterSection>

                  <FilterSection title="Combustível" sectionKey="fuel">
                    <div className="space-y-2">
                      {['', 'gasolina', 'diesel', 'hibrido', 'eletrico'].map((fuel) => (
                        <button
                          key={fuel}
                          onClick={() => handleFilterChange('combustivel', fuel)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            filters.combustivel === fuel 
                              ? 'bg-accent-gold/20 text-accent-gold' 
                              : 'hover:bg-accent-gold/10 text-text-primary'
                          }`}
                        >
                          {fuel === '' ? 'Todos' : fuel.charAt(0).toUpperCase() + fuel.slice(1)}
                        </button>
                      ))}
                    </div>
                  </FilterSection>

                  <FilterSection title="Status" sectionKey="status">
                    <div className="space-y-2">
                      {[
                        { value: '', label: 'Todos' },
                        { value: 'disponivel', label: 'Disponível' },
                        { value: 'reservado', label: 'Reservado' },
                        { value: 'vendido', label: 'Vendido' },
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleFilterChange('status', status.value)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            filters.status === status.value 
                              ? 'bg-accent-gold/20 text-accent-gold' 
                              : 'hover:bg-accent-gold/10 text-text-primary'
                          }`}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </FilterSection>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-accent-gold/20 space-y-3">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={clearAllFilters}
                  >
                    Limpar Filtros
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Aplicar Filtros ({resultsCount})
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
