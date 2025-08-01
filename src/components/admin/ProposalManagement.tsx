'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Send,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Euro,
  Calendar,
  User,
  Car
} from 'lucide-react';
import { mockVehicles } from '@/data/mockData';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/Button';

// Interface para propostas
interface Proposal {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  vehicleId: string;
  proposalType: 'cash' | 'financing' | 'leasing';
  totalValue: number;
  downPayment?: number;
  monthlyPayment?: number;
  interestRate?: number;
  loanTerm?: number;
  specialOffer?: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  validUntil: Date;
  created_at: Date;
  sent_at?: Date;
  viewed_at?: Date;
  responded_at?: Date;
}

// Mock data para propostas
const mockProposals: Proposal[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientEmail: 'joao.silva@email.com',
    clientPhone: '(11) 99999-9999',
    vehicleId: '1',
    proposalType: 'financing',
    totalValue: 850000,
    downPayment: 200000,
    monthlyPayment: 8500,
    interestRate: 5.5,
    loanTerm: 84,
    specialOffer: 'Seguro incluído por 1 ano + revisões gratuitas',
    status: 'sent',
    validUntil: new Date('2024-02-01'),
    created_at: new Date('2024-01-20T10:00:00'),
    sent_at: new Date('2024-01-20T14:30:00')
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    clientEmail: 'maria.santos@email.com',
    clientPhone: '(11) 88888-8888',
    vehicleId: '2',
    proposalType: 'cash',
    totalValue: 420000,
    specialOffer: 'Desconto de 5% para pagamento à vista',
    status: 'viewed',
    validUntil: new Date('2024-01-25'),
    created_at: new Date('2024-01-18T15:00:00'),
    sent_at: new Date('2024-01-19T09:00:00'),
    viewed_at: new Date('2024-01-19T16:30:00')
  },
  {
    id: '3',
    clientName: 'Pedro Costa',
    clientEmail: 'pedro.costa@email.com',
    vehicleId: '3',
    proposalType: 'leasing',
    totalValue: 380000,
    monthlyPayment: 4200,
    loanTerm: 36,
    status: 'accepted',
    validUntil: new Date('2024-01-30'),
    created_at: new Date('2024-01-15T11:00:00'),
    sent_at: new Date('2024-01-16T10:00:00'),
    viewed_at: new Date('2024-01-16T14:00:00'),
    responded_at: new Date('2024-01-17T09:30:00')
  },
  {
    id: '4',
    clientName: 'Ana Rodrigues',
    clientEmail: 'ana.rodrigues@email.com',
    vehicleId: '4',
    proposalType: 'financing',
    totalValue: 750000,
    downPayment: 150000,
    monthlyPayment: 7200,
    interestRate: 6.2,
    loanTerm: 96,
    status: 'draft',
    validUntil: new Date('2024-02-05'),
    created_at: new Date('2024-01-20T16:00:00')
  },
  {
    id: '5',
    clientName: 'Carlos Silva',
    clientEmail: 'carlos.silva@email.com',
    vehicleId: '1',
    proposalType: 'cash',
    totalValue: 800000,
    status: 'rejected',
    validUntil: new Date('2024-01-22'),
    created_at: new Date('2024-01-10T12:00:00'),
    sent_at: new Date('2024-01-11T08:00:00'),
    viewed_at: new Date('2024-01-12T10:00:00'),
    responded_at: new Date('2024-01-13T14:00:00')
  }
];

export function ProposalManagement() {
  const [proposals, setProposals] = useState(mockProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    const matchesType = typeFilter === 'all' || proposal.proposalType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const updateProposalStatus = (proposalId: string, newStatus: Proposal['status']) => {
    setProposals(prev => prev.map(proposal => 
      proposal.id === proposalId 
        ? { 
            ...proposal, 
            status: newStatus,
            sent_at: newStatus === 'sent' && !proposal.sent_at ? new Date() : proposal.sent_at,
            viewed_at: newStatus === 'viewed' && !proposal.viewed_at ? new Date() : proposal.viewed_at,
            responded_at: (newStatus === 'accepted' || newStatus === 'rejected') && !proposal.responded_at ? new Date() : proposal.responded_at
          }
        : proposal
    ));
  };

  const deleteProposal = (proposalId: string) => {
    if (confirm('Tem a certeza que pretende eliminar esta proposta?')) {
      setProposals(prev => prev.filter(proposal => proposal.id !== proposalId));
    }
  };

  const duplicateProposal = (proposal: Proposal) => {
    const newProposal: Proposal = {
      ...proposal,
      id: Date.now().toString(),
      status: 'draft',
      created_at: new Date(),
      sent_at: undefined,
      viewed_at: undefined,
      responded_at: undefined,
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 dias a partir de hoje
    };
    setProposals(prev => [newProposal, ...prev]);
  };

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'sent': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'viewed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'expired': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'viewed': return <Eye className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'expired': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: Proposal['status']) => {
    switch (status) {
      case 'draft': return 'Rascunho';
      case 'sent': return 'Enviada';
      case 'viewed': return 'Visualizada';
      case 'accepted': return 'Aceite';
      case 'rejected': return 'Rejeitada';
      case 'expired': return 'Expirada';
      default: return 'Desconhecido';
    }
  };

  const getTypeLabel = (type: Proposal['proposalType']) => {
    switch (type) {
      case 'cash': return 'À Vista';
      case 'financing': return 'Financiamento';
      case 'leasing': return 'Leasing';
      default: return 'Desconhecido';
    }
  };

  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.marca} ${vehicle.modelo}` : 'Veículo não encontrado';
  };

  const isExpired = (proposal: Proposal) => {
    return new Date() > proposal.validUntil && proposal.status !== 'accepted' && proposal.status !== 'rejected';
  };

  // Marcar propostas expiradas
  const expiredProposals = proposals.filter(p => isExpired(p) && p.status !== 'expired');
  if (expiredProposals.length > 0) {
    setTimeout(() => {
      setProposals(prev => prev.map(p => 
        isExpired(p) && p.status !== 'expired' && p.status !== 'accepted' && p.status !== 'rejected'
          ? { ...p, status: 'expired' }
          : p
      ));
    }, 1000);
  }

  const sortedProposals = [...filteredProposals].sort((a, b) => {
    // Prioridade: aceites primeiro, depois por data de criação
    if (a.status === 'accepted' && b.status !== 'accepted') return -1;
    if (b.status === 'accepted' && a.status !== 'accepted') return 1;
    return b.created_at.getTime() - a.created_at.getTime();
  });

  return (
    <div className="space-y-4 lg:space-y-6 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-text-primary mb-1 lg:mb-2">
            Gestão de Propostas
          </h1>
          <p className="text-sm lg:text-base text-text-subtle">
            Criar e gerir propostas comerciais para clientes
          </p>
        </div>
        
        <Button 
          variant="primary"
          size="sm"
          className="self-start sm:self-auto"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
          <span className="hidden sm:inline">Nova Proposta</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
              <Edit className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Rascunhos</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {proposals.filter(p => p.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Send className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Enviadas</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {proposals.filter(p => p.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-text-subtle">Visualizadas</p>
              <p className="text-xl font-bold text-text-primary">
                {proposals.filter(p => p.status === 'viewed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-text-subtle">Aceites</p>
              <p className="text-xl font-bold text-text-primary">
                {proposals.filter(p => p.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
              <Euro className="h-5 w-5 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-text-subtle">Valor Total</p>
              <p className="text-xl font-bold text-text-primary">
                €{proposals.filter(p => p.status === 'accepted').reduce((acc, p) => acc + p.totalValue, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-subtle" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou email do cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-text-subtle" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="all">Todos os Status</option>
              <option value="draft">Rascunho</option>
              <option value="sent">Enviada</option>
              <option value="viewed">Visualizada</option>
              <option value="accepted">Aceite</option>
              <option value="rejected">Rejeitada</option>
              <option value="expired">Expirada</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
            >
              <option value="all">Todos os Tipos</option>
              <option value="cash">À Vista</option>
              <option value="financing">Financiamento</option>
              <option value="leasing">Leasing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary border-b border-accent-gold/20">
              <tr>
                <th className="text-left p-4 text-text-primary font-semibold">Cliente</th>
                <th className="text-left p-4 text-text-primary font-semibold">Veículo</th>
                <th className="text-left p-4 text-text-primary font-semibold">Tipo</th>
                <th className="text-left p-4 text-text-primary font-semibold">Valor</th>
                <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                <th className="text-left p-4 text-text-primary font-semibold">Validade</th>
                <th className="text-left p-4 text-text-primary font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedProposals.map((proposal) => (
                <motion.tr
                  key={proposal.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b border-accent-gold/10 hover:bg-primary/50 transition-colors cursor-pointer ${
                    proposal.status === 'accepted' ? 'bg-green-500/5' : 
                    isExpired(proposal) ? 'bg-orange-500/5' : ''
                  }`}
                  onClick={() => setSelectedProposal(proposal)}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {proposal.clientName}
                        </h3>
                        <p className="text-sm text-text-subtle">{proposal.clientEmail}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className="text-text-primary">
                      {getVehicleInfo(proposal.vehicleId)}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <p className="text-text-subtle">
                      {getTypeLabel(proposal.proposalType)}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-text-primary">
                        €{proposal.totalValue.toLocaleString()}
                      </p>
                      {proposal.monthlyPayment && (
                        <p className="text-sm text-text-subtle">
                          €{proposal.monthlyPayment}/mês
                        </p>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proposal.status)}`}>
                      {getStatusIcon(proposal.status)}
                      <span className="ml-1">{getStatusLabel(proposal.status)}</span>
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <p className={`text-sm ${isExpired(proposal) ? 'text-red-400 font-semibold' : 'text-text-subtle'}`}>
                        {proposal.validUntil.toLocaleDateString('pt-PT')}
                      </p>
                      {isExpired(proposal) && (
                        <p className="text-xs text-red-400">Expirada</p>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <select
                        value={proposal.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateProposalStatus(proposal.id, e.target.value as Proposal['status']);
                        }}
                        className="text-xs px-2 py-1 bg-primary border border-accent-gold/20 rounded text-text-primary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="draft">Rascunho</option>
                        <option value="sent">Enviada</option>
                        <option value="viewed">Visualizada</option>
                        <option value="accepted">Aceite</option>
                        <option value="rejected">Rejeitada</option>
                        <option value="expired">Expirada</option>
                      </select>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateProposal(proposal);
                        }}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Duplicar"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Download da proposta em PDF - funcionalidade em desenvolvimento');
                        }}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProposal(proposal.id);
                        }}
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

      {/* Proposal Detail Modal */}
      <AnimatePresence>
        {selectedProposal && !showCreateModal && (
          <ProposalDetailModal
            proposal={selectedProposal}
            onClose={() => setSelectedProposal(null)}
            onEdit={() => setShowCreateModal(true)}
          />
        )}
      </AnimatePresence>

      {/* Create/Edit Proposal Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateProposalModal
            proposal={selectedProposal}
            onClose={() => {
              setShowCreateModal(false);
              setSelectedProposal(null);
            }}
            onSave={(proposalData) => {
              if (selectedProposal) {
                setProposals(prev => prev.map(p => 
                  p.id === selectedProposal.id 
                    ? { ...proposalData as Proposal, id: selectedProposal.id }
                    : p
                ));
              } else {
                const newProposal: Proposal = {
                  ...proposalData as Proposal,
                  id: Date.now().toString(),
                  created_at: new Date()
                };
                setProposals(prev => [newProposal, ...prev]);
              }
              setShowCreateModal(false);
              setSelectedProposal(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProposalDetailModal({ 
  proposal, 
  onClose, 
  onEdit 
}: {
  proposal: Proposal;
  onClose: () => void;
  onEdit: () => void;
}) {
  const vehicle = mockVehicles.find(v => v.id === proposal.vehicleId);

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
            Detalhes da Proposta #{proposal.id}
          </h2>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Info */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informações do Cliente
            </h3>
            <div className="space-y-2">
              <p><span className="text-text-subtle">Nome:</span> {proposal.clientName}</p>
              <p><span className="text-text-subtle">Email:</span> {proposal.clientEmail}</p>
              {proposal.clientPhone && <p><span className="text-text-subtle">Telefone:</span> {proposal.clientPhone}</p>}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Veículo
            </h3>
            {vehicle && (
              <div className="space-y-2">
                <p><span className="text-text-subtle">Veículo:</span> {vehicle.marca} {vehicle.modelo}</p>
                <p><span className="text-text-subtle">Ano:</span> {vehicle.ano}</p>
                <p><span className="text-text-subtle">Preço Lista:</span> €{vehicle.preco.toLocaleString()}</p>
                <p><span className="text-text-subtle">Status:</span> {vehicle.status}</p>
              </div>
            )}
          </div>

          {/* Proposal Details */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center">
              <Euro className="h-5 w-5 mr-2" />
              Detalhes Financeiros
            </h3>
            <div className="space-y-2">
              <p><span className="text-text-subtle">Tipo:</span> {proposal.proposalType === 'cash' ? 'À Vista' : proposal.proposalType === 'financing' ? 'Financiamento' : 'Leasing'}</p>
              <p><span className="text-text-subtle">Valor Total:</span> €{proposal.totalValue.toLocaleString()}</p>
              {proposal.downPayment && <p><span className="text-text-subtle">Entrada:</span> €{proposal.downPayment.toLocaleString()}</p>}
              {proposal.monthlyPayment && <p><span className="text-text-subtle">Prestação Mensal:</span> €{proposal.monthlyPayment.toLocaleString()}</p>}
              {proposal.interestRate && <p><span className="text-text-subtle">Taxa de Juro:</span> {proposal.interestRate}%</p>}
              {proposal.loanTerm && <p><span className="text-text-subtle">Prazo:</span> {proposal.loanTerm} meses</p>}
            </div>
          </div>

          {/* Status & Dates */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Status & Datas
            </h3>
            <div className="space-y-2">
              <p><span className="text-text-subtle">Status:</span> {getStatusLabel(proposal.status)}</p>
              <p><span className="text-text-subtle">Criada:</span> {proposal.created_at.toLocaleString('pt-PT')}</p>
              {proposal.sent_at && <p><span className="text-text-subtle">Enviada:</span> {proposal.sent_at.toLocaleString('pt-PT')}</p>}
              {proposal.viewed_at && <p><span className="text-text-subtle">Visualizada:</span> {proposal.viewed_at.toLocaleString('pt-PT')}</p>}
              {proposal.responded_at && <p><span className="text-text-subtle">Respondida:</span> {proposal.responded_at.toLocaleString('pt-PT')}</p>}
              <p><span className="text-text-subtle">Válida até:</span> {proposal.validUntil.toLocaleDateString('pt-PT')}</p>
            </div>
          </div>
        </div>

        {/* Special Offer */}
        {proposal.specialOffer && (
          <div className="mt-6 bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3">Oferta Especial</h3>
            <p className="text-text-subtle">{proposal.specialOffer}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => window.open(`mailto:${proposal.clientEmail}`)}
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar por Email
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => alert('Download PDF - funcionalidade em desenvolvimento')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Proposta
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function CreateProposalModal({ 
  proposal, 
  onClose, 
  onSave 
}: {
  proposal?: Proposal | null;
  onClose: () => void;
  onSave: (proposal: Omit<Proposal, 'id' | 'created_at'>) => void;
}) {
  const [formData, setFormData] = useState({
    clientName: proposal?.clientName || '',
    clientEmail: proposal?.clientEmail || '',
    clientPhone: proposal?.clientPhone || '',
    vehicleId: proposal?.vehicleId || '',
    proposalType: proposal?.proposalType || 'cash',
    totalValue: proposal?.totalValue || 0,
    downPayment: proposal?.downPayment || 0,
    monthlyPayment: proposal?.monthlyPayment || 0,
    interestRate: proposal?.interestRate || 5.5,
    loanTerm: proposal?.loanTerm || 60,
    specialOffer: proposal?.specialOffer || '',
    status: proposal?.status || 'draft',
    validUntil: proposal?.validUntil ? proposal.validUntil.toISOString().split('T')[0] : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      validUntil: new Date(formData.validUntil),
      sent_at: proposal?.sent_at,
      viewed_at: proposal?.viewed_at,
      responded_at: proposal?.responded_at
    } as Omit<Proposal, 'id' | 'created_at'>);
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
            {proposal ? 'Editar Proposta' : 'Nova Proposta'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Telefone (opcional)
              </label>
              <input
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          {/* Vehicle & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Veículo
              </label>
              <select
                required
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
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

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Tipo de Proposta
              </label>
              <select
                value={formData.proposalType}
                onChange={(e) => setFormData({ ...formData, proposalType: e.target.value as any })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              >
                <option value="cash">À Vista</option>
                <option value="financing">Financiamento</option>
                <option value="leasing">Leasing</option>
              </select>
            </div>
          </div>

          {/* Financial Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Valor Total (€)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.totalValue}
                onChange={(e) => setFormData({ ...formData, totalValue: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            {formData.proposalType !== 'cash' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Entrada (€)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.downPayment}
                    onChange={(e) => setFormData({ ...formData, downPayment: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Prestação (€/mês)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.monthlyPayment}
                    onChange={(e) => setFormData({ ...formData, monthlyPayment: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Taxa Juro (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Prazo (meses)
                  </label>
                  <select
                    value={formData.loanTerm}
                    onChange={(e) => setFormData({ ...formData, loanTerm: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                  >
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="48">48 meses</option>
                    <option value="60">60 meses</option>
                    <option value="72">72 meses</option>
                    <option value="84">84 meses</option>
                    <option value="96">96 meses</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Special Offer & Validity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Oferta Especial (opcional)
              </label>
              <textarea
                rows={3}
                value={formData.specialOffer}
                onChange={(e) => setFormData({ ...formData, specialOffer: e.target.value })}
                placeholder="Ex: Seguro incluído, manutenção gratuita..."
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Válida Até
              </label>
              <input
                type="date"
                required
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>
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
              {proposal ? 'Atualizar' : 'Criar'} Proposta
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function getStatusLabel(status: Proposal['status']) {
  switch (status) {
    case 'draft': return 'Rascunho';
    case 'sent': return 'Enviada';
    case 'viewed': return 'Visualizada';
    case 'accepted': return 'Aceite';
    case 'rejected': return 'Rejeitada';
    case 'expired': return 'Expirada';
    default: return 'Desconhecido';
  }
}
