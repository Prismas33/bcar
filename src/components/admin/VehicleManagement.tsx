'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Euro,
  Gauge,
  Fuel,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice, getStatusLabel } from '@/lib/utils/cn';

export function VehicleManagement() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateVehicleStatus = (vehicleId: string, newStatus: Vehicle['status']) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === vehicleId 
        ? { ...vehicle, status: newStatus, updated_at: new Date() }
        : vehicle
    ));
  };

  const deleteVehicle = (vehicleId: string) => {
    if (confirm('Tem a certeza que pretende eliminar este veículo?')) {
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== vehicleId));
    }
  };

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'disponivel': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'reservado': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'vendido': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'negociando': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Vehicle['status']) => {
    switch (status) {
      case 'disponivel': return <CheckCircle className="h-4 w-4" />;
      case 'reservado': return <Clock className="h-4 w-4" />;
      case 'vendido': return <CheckCircle className="h-4 w-4" />;
      case 'negociando': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-text-primary mb-1 lg:mb-2">
            Gestão de Veículos
          </h1>
          <p className="text-sm lg:text-base text-text-subtle">
            Gerir stock de veículos, preços e disponibilidade
          </p>
        </div>
        
        <Button 
          variant="primary"
          size="sm"
          className="self-start sm:self-auto"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
          <span className="hidden sm:inline">Adicionar Veículo</span>
          <span className="sm:hidden">Adicionar</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Disponíveis</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {vehicles.filter(v => v.status === 'disponivel').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Reservados</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {vehicles.filter(v => v.status === 'reservado').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Vendidos</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {vehicles.filter(v => v.status === 'vendido').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
              <Euro className="h-4 w-4 lg:h-5 lg:w-5 text-accent-gold" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Valor Stock</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                €{vehicles.reduce((acc, v) => acc + v.preco, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-subtle" />
            <input
              type="text"
              placeholder="Pesquisar por marca ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold text-sm lg:text-base"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-text-subtle" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold text-sm lg:text-base"
            >
              <option value="all">Todos os Status</option>
              <option value="disponivel">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
              <option value="negociando">Em Negociação</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle List - Mobile Cards and Desktop Table */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg overflow-hidden flex-1">
        {/* Mobile View - Cards */}
        <div className="lg:hidden divide-y divide-accent-gold/10 max-h-[60vh] overflow-y-auto">
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={`mobile-${vehicle.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-primary/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-10 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary text-sm">
                      {vehicle.marca} {vehicle.modelo}
                    </h3>
                    <p className="text-xs text-text-subtle">
                      {vehicle.ano} • {vehicle.quilometragem.toLocaleString()} km
                    </p>
                    <p className="font-bold text-accent-gold text-sm">
                      {formatPrice(vehicle.preco)}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(vehicle.status)}`}>
                    {getStatusIcon(vehicle.status)}
                    <span className="ml-1">{getStatusLabel(vehicle.status)}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-text-subtle">
                  <div className="flex items-center space-x-1">
                    <Fuel className="h-3 w-3" />
                    <span>{vehicle.combustivel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gauge className="h-3 w-3" />
                    <span>{vehicle.transmissao}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingVehicle(vehicle)}
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`/vehicle/${vehicle.id}`, '_blank')}
                    className="p-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <select
                    value={vehicle.status}
                    onChange={(e) => updateVehicleStatus(vehicle.id, e.target.value as Vehicle['status'])}
                    className="text-xs px-2 py-1 bg-primary border border-accent-gold/20 rounded text-text-primary focus:outline-none focus:border-accent-gold"
                  >
                    <option value="disponivel">Disponível</option>
                    <option value="reservado">Reservado</option>
                    <option value="vendido">Vendido</option>
                    <option value="negociando">Negociando</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto max-h-[60vh] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-primary border-b border-accent-gold/20 sticky top-0">
              <tr>
                <th className="text-left p-4 text-text-primary font-semibold">Veículo</th>
                <th className="text-left p-4 text-text-primary font-semibold">Preço</th>
                <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                <th className="text-left p-4 text-text-primary font-semibold">Detalhes</th>
                <th className="text-left p-4 text-text-primary font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <motion.tr
                  key={`desktop-${vehicle.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-accent-gold/10 hover:bg-primary/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {vehicle.marca} {vehicle.modelo}
                        </h3>
                        <p className="text-sm text-text-subtle">
                          {vehicle.ano} • {vehicle.quilometragem.toLocaleString()} km
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className="font-bold text-text-primary">
                      {formatPrice(vehicle.preco)}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(vehicle.status)}`}>
                        {getStatusIcon(vehicle.status)}
                        <span className="ml-1">{getStatusLabel(vehicle.status)}</span>
                      </span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-4 text-sm text-text-subtle">
                      <div className="flex items-center space-x-1">
                        <Fuel className="h-3 w-3" />
                        <span>{vehicle.combustivel}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Gauge className="h-3 w-3" />
                        <span>{vehicle.transmissao}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {/* Status Quick Actions */}
                      <select
                        value={vehicle.status}
                        onChange={(e) => updateVehicleStatus(vehicle.id, e.target.value as Vehicle['status'])}
                        className="text-xs px-2 py-1 bg-primary border border-accent-gold/20 rounded text-text-primary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="disponivel">Disponível</option>
                        <option value="reservado">Reservado</option>
                        <option value="vendido">Vendido</option>
                        <option value="negociando">Negociando</option>
                      </select>
                      
                      <button
                        onClick={() => setEditingVehicle(vehicle)}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => window.open(`/vehicle/${vehicle.id}`, '_blank')}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Ver no site"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteVehicle(vehicle.id)}
                        className="p-2 text-text-subtle hover:text-red-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Vehicle Modal */}
      <AnimatePresence>
        {(showAddModal || editingVehicle) && (
          <VehicleModal
            vehicle={editingVehicle}
            onClose={() => {
              setShowAddModal(false);
              setEditingVehicle(null);
            }}
            onSave={(vehicleData) => {
              if (editingVehicle) {
                setVehicles(prev => prev.map(v => 
                  v.id === editingVehicle.id 
                    ? { ...vehicleData, id: editingVehicle.id, created_at: editingVehicle.created_at, updated_at: new Date() } as Vehicle
                    : v
                ));
              } else {
                const newVehicle: Vehicle = {
                  ...vehicleData,
                  id: Date.now().toString(),
                  created_at: new Date(),
                  updated_at: new Date()
                };
                setVehicles(prev => [...prev, newVehicle]);
              }
              setShowAddModal(false);
              setEditingVehicle(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function VehicleModal({ 
  vehicle, 
  onClose, 
  onSave 
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSave: (vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>) => void;
}) {
  const [formData, setFormData] = useState({
    marca: vehicle?.marca || '',
    modelo: vehicle?.modelo || '',
    ano: vehicle?.ano || new Date().getFullYear(),
    preco: vehicle?.preco || 0,
    quilometragem: vehicle?.quilometragem || 0,
    combustivel: vehicle?.combustivel || 'gasolina',
    transmissao: vehicle?.transmissao || 'manual',
    cor: vehicle?.cor || '',
    status: vehicle?.status || 'disponivel',
    destaque: vehicle?.destaque || false,
    descricao: vehicle?.descricao || '',
    imagens: vehicle?.imagens || [''],
    especificacoes: vehicle?.especificacoes || {
      motor: '',
      potencia: '',
      aceleracao: '',
      velocidadeMaxima: '',
      portas: 4,
      assentos: 5,
      consumoCombustivel: '',
      emissoesCO2: '',
      garantia: '',
      caracteristicas: ['']
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-secondary-100 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-accent-gold/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-bold text-text-primary">
            {vehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Marca
              </label>
              <input
                type="text"
                required
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Modelo
              </label>
              <input
                type="text"
                required
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Ano
              </label>
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.ano}
                onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Preço (€)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Quilometragem
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quilometragem}
                onChange={(e) => setFormData({ ...formData, quilometragem: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Cor
              </label>
              <input
                type="text"
                required
                value={formData.cor}
                onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Combustível
              </label>
              <select
                value={formData.combustivel}
                onChange={(e) => setFormData({ ...formData, combustivel: e.target.value as any })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              >
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diesel</option>
                <option value="eletrico">Elétrico</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Transmissão
              </label>
              <select
                value={formData.transmissao}
                onChange={(e) => setFormData({ ...formData, transmissao: e.target.value as any })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              >
                <option value="manual">Manual</option>
                <option value="automatica">Automática</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Descrição
            </label>
            <textarea
              rows={3}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-none"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.destaque}
                onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                className="w-4 h-4 text-accent-gold border-accent-gold/20 rounded focus:ring-accent-gold"
              />
              <span className="text-text-primary">Veículo em destaque</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              {vehicle ? 'Atualizar' : 'Adicionar'} Veículo
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
