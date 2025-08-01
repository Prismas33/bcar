'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Phone,
  Mail,
  Calendar,
  Star,
  MessageSquare,
  UserCheck,
  UserX,
  Search,
  Filter,
  FileText,
  Send
} from 'lucide-react';
import { mockLeads, mockVehicles } from '@/data/mockData';
import { Lead, Vehicle } from '@/types';
import { Button } from '@/components/ui/Button';

// Expandir dados mock para demonstração
const extendedLeads: Lead[] = [
  ...mockLeads,
  {
    id: '8',
    nome: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    telefone: '(21) 77777-7777',
    vehicleId: '3',
    mensagem: 'Gostaria de saber mais sobre o histórico do veículo.',
    status: 'qualificado',
    created_at: new Date('2024-01-18')
  },
  {
    id: '9',
    nome: 'Ana Rodrigues',
    email: 'ana.rodrigues@email.com',
    telefone: '(31) 66666-6666',
    vehicleId: '1',
    mensagem: 'Interessada em financiamento. Qual a taxa de juro?',
    status: 'convertido',
    created_at: new Date('2024-01-17')
  },
  {
    id: '10',
    nome: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    telefone: '(41) 55555-5555',
    vehicleId: '4',
    mensagem: 'Posso fazer test drive amanhã?',
    status: 'novo',
    created_at: new Date('2024-01-20')
  }
];

export function LeadManagement() {
  const [leads, setLeads] = useState(extendedLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus }
        : lead
    ));
  };

  const deleteLead = (leadId: string) => {
    if (confirm('Tem a certeza que pretende eliminar este lead?')) {
      setLeads(prev => prev.filter(lead => lead.id !== leadId));
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'novo': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contatado': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'qualificado': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'convertido': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'novo': return <UserCheck className="h-4 w-4" />;
      case 'contatado': return <Phone className="h-4 w-4" />;
      case 'qualificado': return <Star className="h-4 w-4" />;
      case 'convertido': return <UserCheck className="h-4 w-4" />;
      default: return <UserX className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: Lead['status']) => {
    switch (status) {
      case 'novo': return 'Novo';
      case 'contatado': return 'Contatado';
      case 'qualificado': return 'Qualificado';
      case 'convertido': return 'Convertido';
      default: return 'Desconhecido';
    }
  };

  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.marca} ${vehicle.modelo}` : 'Veículo não encontrado';
  };

  const getPriorityScore = (lead: Lead) => {
    const daysSinceCreated = Math.floor((Date.now() - lead.created_at.getTime()) / (1000 * 60 * 60 * 24));
    let score = 0;
    
    if (lead.status === 'qualificado') score += 30;
    if (lead.status === 'contatado') score += 20;
    if (lead.status === 'novo') score += 10;
    
    // Reduz score com base nos dias
    score = Math.max(0, score - daysSinceCreated);
    
    return score;
  };

  const sortedLeads = [...filteredLeads].sort((a, b) => getPriorityScore(b) - getPriorityScore(a));

  return (
    <div className="space-y-4 lg:space-y-6 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-text-primary mb-1 lg:mb-2">
            Gestão de Clientes (CRM)
          </h1>
          <p className="text-sm lg:text-base text-text-subtle">
            Gerir leads, propostas e relacionamento com clientes
          </p>
        </div>
        
        <Button 
          variant="primary"
          size="sm"
          className="self-start sm:self-auto"
          onClick={() => setShowProposalModal(true)}
        >
          <Plus className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
          <span className="hidden sm:inline">Nova Proposta</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Novos Leads</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {leads.filter(l => l.status === 'novo').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Contatados</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {leads.filter(l => l.status === 'contatado').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Star className="h-4 w-4 lg:h-5 lg:w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Qualificados</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {leads.filter(l => l.status === 'qualificado').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <UserCheck className="h-4 w-4 lg:h-5 lg:w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Convertidos</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {leads.filter(l => l.status === 'convertido').length}
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
              placeholder="Pesquisar por nome ou email..."
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
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="qualificado">Qualificado</option>
              <option value="convertido">Convertido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads List - Mobile Cards and Desktop Table */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg overflow-hidden flex-1">
        {/* Mobile View - Cards */}
        <div className="lg:hidden divide-y divide-accent-gold/10 max-h-[60vh] overflow-y-auto">
          {sortedLeads.map((lead) => (
            <motion.div
              key={`mobile-${lead.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-primary/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-sm">
                      {lead.nome}
                    </h3>
                    <p className="text-xs text-text-subtle">{lead.email}</p>
                    <p className="text-xs text-text-subtle">{lead.telefone}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.status)}`}>
                    {getStatusIcon(lead.status)}
                    <span className="ml-1">{getStatusLabel(lead.status)}</span>
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-text-subtle">
                    <strong>Veículo:</strong> {getVehicleInfo(lead.vehicleId)}
                  </p>
                  <p className="text-xs text-text-subtle">
                    <strong>Data:</strong> {lead.created_at.toLocaleDateString('pt-PT')}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLead(lead)}
                    className="p-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`mailto:${lead.email}`)}
                    className="p-2"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`tel:${lead.telefone}`)}
                    className="p-2"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
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
                <th className="text-left p-4 text-text-primary font-semibold">Cliente</th>
                <th className="text-left p-4 text-text-primary font-semibold">Veículo Interesse</th>
                <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                <th className="text-left p-4 text-text-primary font-semibold">Prioridade</th>
                <th className="text-left p-4 text-text-primary font-semibold">Data</th>
                <th className="text-left p-4 text-text-primary font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => (
                <motion.tr
                  key={`desktop-${lead.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-accent-gold/10 hover:bg-primary/50 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {lead.nome}
                      </h3>
                      <p className="text-sm text-text-subtle">{lead.email}</p>
                      <p className="text-sm text-text-subtle">{lead.telefone}</p>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className="text-text-primary">
                      {getVehicleInfo(lead.vehicleId)}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.status)}`}>
                      {getStatusIcon(lead.status)}
                      <span className="ml-1">{getStatusLabel(lead.status)}</span>
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        getPriorityScore(lead) > 25 ? 'bg-red-400' :
                        getPriorityScore(lead) > 15 ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      <span className="text-sm text-text-subtle">
                        {getPriorityScore(lead) > 25 ? 'Alta' :
                         getPriorityScore(lead) > 15 ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className="text-sm text-text-subtle">
                      {lead.created_at.toLocaleDateString('pt-PT')}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                        className="text-xs px-2 py-1 bg-primary border border-accent-gold/20 rounded text-text-primary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="novo">Novo</option>
                        <option value="contatado">Contatado</option>
                        <option value="qualificado">Qualificado</option>
                        <option value="convertido">Convertido</option>
                      </select>
                      
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => window.open(`mailto:${lead.email}`)}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Enviar email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => window.open(`tel:${lead.telefone}`)}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Ligar"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteLead(lead.id)}
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

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onSendProposal={() => {
              setShowProposalModal(true);
              setSelectedLead(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Proposal Modal */}
      <AnimatePresence>
        {showProposalModal && (
          <ProposalModal
            onClose={() => setShowProposalModal(false)}
            onSend={() => {
              setShowProposalModal(false);
              alert('Proposta enviada com sucesso!');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LeadDetailModal({ 
  lead, 
  onClose, 
  onSendProposal 
}: {
  lead: Lead;
  onClose: () => void;
  onSendProposal: () => void;
}) {
  const vehicle = mockVehicles.find(v => v.id === lead.vehicleId);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-secondary-100 rounded-xl p-6 w-full max-w-2xl border border-accent-gold/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-bold text-text-primary">
            Detalhes do Cliente
          </h2>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3">Informações do Cliente</h3>
            <div className="space-y-2">
              <p><span className="text-text-subtle">Nome:</span> {lead.nome}</p>
              <p><span className="text-text-subtle">Email:</span> {lead.email}</p>
              <p><span className="text-text-subtle">Telefone:</span> {lead.telefone}</p>
              <p><span className="text-text-subtle">Status:</span> {lead.status}</p>
              <p><span className="text-text-subtle">Data:</span> {lead.created_at.toLocaleDateString('pt-PT')}</p>
            </div>
          </div>

          {/* Vehicle Info */}
          {vehicle && (
            <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
              <h3 className="font-semibold text-text-primary mb-3">Veículo de Interesse</h3>
              <div className="space-y-2">
                <p><span className="text-text-subtle">Veículo:</span> {vehicle.marca} {vehicle.modelo}</p>
                <p><span className="text-text-subtle">Ano:</span> {vehicle.ano}</p>
                <p><span className="text-text-subtle">Preço:</span> €{vehicle.preco.toLocaleString()}</p>
                <p><span className="text-text-subtle">Status:</span> {vehicle.status}</p>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3">Mensagem</h3>
            <p className="text-text-subtle">{lead.mensagem}</p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => window.open(`mailto:${lead.email}`)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Enviar Email
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => window.open(`tel:${lead.telefone}`)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Ligar
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={onSendProposal}
            >
              <FileText className="h-4 w-4 mr-2" />
              Enviar Proposta
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProposalModal({ 
  onClose, 
  onSend 
}: {
  onClose: () => void;
  onSend: () => void;
}) {
  const [proposalData, setProposalData] = useState({
    clientName: '',
    clientEmail: '',
    vehicleId: '',
    financingOption: 'cash',
    downPayment: 0,
    monthlyPayment: 0,
    interestRate: 5.5,
    loanTerm: 60,
    specialOffer: '',
    validUntil: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-secondary-100 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-accent-gold/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-bold text-text-primary">
            Gerar Proposta Comercial
          </h2>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                required
                value={proposalData.clientName}
                onChange={(e) => setProposalData({ ...proposalData, clientName: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email do Cliente
              </label>
              <input
                type="email"
                required
                value={proposalData.clientEmail}
                onChange={(e) => setProposalData({ ...proposalData, clientEmail: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Veículo
            </label>
            <select
              required
              value={proposalData.vehicleId}
              onChange={(e) => setProposalData({ ...proposalData, vehicleId: e.target.value })}
              className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="">Selecionar veículo...</option>
              {mockVehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.marca} {vehicle.modelo} - €{vehicle.preco.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Financing Options */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Opção de Pagamento
            </label>
            <select
              value={proposalData.financingOption}
              onChange={(e) => setProposalData({ ...proposalData, financingOption: e.target.value })}
              className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="cash">Pagamento à Vista</option>
              <option value="financing">Financiamento</option>
              <option value="leasing">Leasing</option>
            </select>
          </div>

          {/* Financing Details (conditional) */}
          {proposalData.financingOption === 'financing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Entrada (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={proposalData.downPayment}
                  onChange={(e) => setProposalData({ ...proposalData, downPayment: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Prestação Mensal (€)
                </label>
                <input
                  type="number"
                  min="0"
                  value={proposalData.monthlyPayment}
                  onChange={(e) => setProposalData({ ...proposalData, monthlyPayment: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Taxa de Juro (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={proposalData.interestRate}
                  onChange={(e) => setProposalData({ ...proposalData, interestRate: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Prazo (meses)
                </label>
                <select
                  value={proposalData.loanTerm}
                  onChange={(e) => setProposalData({ ...proposalData, loanTerm: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                >
                  <option value="36">36 meses</option>
                  <option value="48">48 meses</option>
                  <option value="60">60 meses</option>
                  <option value="72">72 meses</option>
                  <option value="84">84 meses</option>
                </select>
              </div>
            </div>
          )}

          {/* Special Offer */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Oferta Especial (opcional)
            </label>
            <textarea
              rows={2}
              value={proposalData.specialOffer}
              onChange={(e) => setProposalData({ ...proposalData, specialOffer: e.target.value })}
              placeholder="Ex: Seguro incluído por 1 ano, manutenção gratuita..."
              className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-none"
            />
          </div>

          {/* Valid Until */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Válida Até
            </label>
            <input
              type="date"
              required
              value={proposalData.validUntil}
              onChange={(e) => setProposalData({ ...proposalData, validUntil: e.target.value })}
              className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            />
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
              <Send className="h-4 w-4 mr-2" />
              Enviar Proposta
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
