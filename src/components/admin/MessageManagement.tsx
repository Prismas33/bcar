'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Reply, 
  Trash2, 
  Eye, 
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Send,
  Archive,
  Star,
  User,
  Phone
} from 'lucide-react';
import { mockLeads, mockVehicles } from '@/data/mockData';
import { Lead, Vehicle } from '@/types';
import { Button } from '@/components/ui/Button';

// Interface para mensagens expandidas
interface Message {
  id: string;
  from: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  vehicleId?: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'normal' | 'high';
  created_at: Date;
  replied_at?: Date;
}

// Mock data para mensagens
const mockMessages: Message[] = [
  {
    id: '1',
    from: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    subject: 'Interesse em test drive - Porsche 911',
    content: 'Boa tarde, gostaria de agendar um test drive para o Porsche 911 Carrera S para este final de semana. Tenho disponibilidade sábado de manhã. Aguardo retorno.',
    vehicleId: '1',
    status: 'unread',
    priority: 'high',
    created_at: new Date('2024-01-20T14:30:00')
  },
  {
    id: '2',
    from: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 88888-8888',
    subject: 'Dúvidas sobre financiamento',
    content: 'Olá, tenho interesse na Ferrari 488 Spider e gostaria de saber mais sobre as opções de financiamento disponíveis. Qual seria a taxa de juros e quais documentos são necessários?',
    vehicleId: '2',
    status: 'read',
    priority: 'normal',
    created_at: new Date('2024-01-19T16:45:00')
  },
  {
    id: '3',
    from: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    phone: '(21) 77777-7777',
    subject: 'Histórico do veículo BMW M3',
    content: 'Bom dia, gostaria de saber mais sobre o histórico do BMW M3 Competition. O veículo teve algum acidente? Tem histórico de manutenção completo?',
    vehicleId: '3',
    status: 'replied',
    priority: 'normal',
    created_at: new Date('2024-01-18T10:20:00'),
    replied_at: new Date('2024-01-18T15:30:00')
  },
  {
    id: '4',
    from: 'Ana Rodrigues',
    email: 'ana.rodrigues@email.com',
    phone: '(31) 66666-6666',
    subject: 'Proposta para Audi RS7',
    content: 'Boa tarde, após ver o Audi RS7 Performance no vosso stand, gostaria de fazer uma proposta de €75.000. É possível negociar este valor?',
    vehicleId: '4',
    status: 'unread',
    priority: 'high',
    created_at: new Date('2024-01-20T11:15:00')
  },
  {
    id: '5',
    from: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    subject: 'Informações gerais',
    content: 'Olá, gostaria de saber quais os horários de funcionamento do stand e se é necessário marcar hora para visitar.',
    status: 'archived',
    priority: 'low',
    created_at: new Date('2024-01-15T09:00:00'),
    replied_at: new Date('2024-01-15T10:30:00')
  }
];

export function MessageManagement() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const updateMessageStatus = (messageId: string, newStatus: Message['status']) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId 
        ? { 
            ...message, 
            status: newStatus,
            replied_at: newStatus === 'replied' ? new Date() : message.replied_at
          }
        : message
    ));
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Tem a certeza que pretende eliminar esta mensagem?')) {
      setMessages(prev => prev.filter(message => message.id !== messageId));
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId && message.status === 'unread'
        ? { ...message, status: 'read' }
        : message
    ));
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'unread': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'unread': return <AlertCircle className="h-4 w-4" />;
      case 'read': return <Eye className="h-4 w-4" />;
      case 'replied': return <CheckCircle className="h-4 w-4" />;
      case 'archived': return <Archive className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: Message['status']) => {
    switch (status) {
      case 'unread': return 'Não lida';
      case 'read': return 'Lida';
      case 'replied': return 'Respondida';
      case 'archived': return 'Arquivada';
      default: return 'Desconhecido';
    }
  };

  const getPriorityColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'normal': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityLabel = (priority: Message['priority']) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'normal': return 'Normal';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  const getVehicleInfo = (vehicleId?: string) => {
    if (!vehicleId) return 'Consulta geral';
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.marca} ${vehicle.modelo}` : 'Veículo não encontrado';
  };

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    // Prioridade: não lidas primeiro, depois por prioridade, depois por data
    if (a.status === 'unread' && b.status !== 'unread') return -1;
    if (b.status === 'unread' && a.status !== 'unread') return 1;
    
    const priorityOrder = { high: 3, normal: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    return b.created_at.getTime() - a.created_at.getTime();
  });

  return (
    <div className="space-y-4 lg:space-y-6 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-text-primary mb-1 lg:mb-2">
            Gestão de Mensagens
          </h1>
          <p className="text-sm lg:text-base text-text-subtle">
            Gerir comunicações e responder a clientes
          </p>
        </div>
        
        <Button 
          variant="primary"
          size="sm"
          className="self-start sm:self-auto"
          onClick={() => setShowReplyModal(true)}
        >
          <Plus className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
          <span className="hidden sm:inline">Nova Mensagem</span>
          <span className="sm:hidden">Nova</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Não Lidas</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {messages.filter(m => m.status === 'unread').length}
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
              <p className="text-xs lg:text-sm text-text-subtle">Pendentes</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {messages.filter(m => m.status === 'read').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Respondidas</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {messages.filter(m => m.status === 'replied').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Star className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
            </div>
            <div>
              <p className="text-xs lg:text-sm text-text-subtle">Alta Prioridade</p>
              <p className="text-lg lg:text-xl font-bold text-text-primary">
                {messages.filter(m => m.priority === 'high').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg p-3 lg:p-4">
        <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-subtle" />
            <input
              type="text"
              placeholder="Pesquisar por nome, email ou assunto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold text-sm lg:text-base"
            />
          </div>
          
          <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-2">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-text-subtle flex-shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 lg:flex-none px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold text-sm"
              >
                <option value="all">Todos os Status</option>
                <option value="unread">Não lidas</option>
                <option value="read">Lidas</option>
                <option value="replied">Respondidas</option>
                <option value="archived">Arquivadas</option>
              </select>
            </div>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold text-sm"
            >
              <option value="all">Todas Prioridades</option>
              <option value="high">Alta</option>
              <option value="normal">Normal</option>
              <option value="low">Baixa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List - Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {sortedMessages.map((message) => (
          <motion.div
            key={`mobile-${message.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-secondary-100 border border-accent-gold/20 rounded-lg p-4 ${
              message.status === 'unread' ? 'bg-blue-500/5 border-blue-500/30' : ''
            }`}
            onClick={() => {
              setSelectedMessage(message);
              markAsRead(message.id);
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-semibold truncate ${message.status === 'unread' ? 'text-text-primary' : 'text-text-subtle'}`}>
                    {message.from}
                  </h3>
                  <p className="text-sm text-text-subtle truncate">{message.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${
                  message.priority === 'high' ? 'bg-red-400' :
                  message.priority === 'normal' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(message.status)}`}>
                  {getStatusIcon(message.status)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className={`font-medium ${message.status === 'unread' ? 'text-text-primary' : 'text-text-subtle'}`}>
                {message.subject}
              </p>
              
              {message.vehicleId && (
                <p className="text-sm text-accent-gold">
                  🚗 {getVehicleInfo(message.vehicleId)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-text-subtle mb-3">
              <span>
                {message.created_at.toLocaleDateString('pt-PT')} às {message.created_at.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className={`font-medium ${getPriorityColor(message.priority)}`}>
                {getPriorityLabel(message.priority)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-accent-gold/10">
              <select
                value={message.status}
                onChange={(e) => {
                  e.stopPropagation();
                  updateMessageStatus(message.id, e.target.value as Message['status']);
                }}
                className="text-xs px-2 py-1 bg-primary border border-accent-gold/20 rounded text-text-primary focus:outline-none focus:border-accent-gold"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="unread">Não lida</option>
                <option value="read">Lida</option>
                <option value="replied">Respondida</option>
                <option value="archived">Arquivada</option>
              </select>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMessage(message);
                    setShowReplyModal(true);
                  }}
                  className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                  title="Responder"
                >
                  <Reply className="h-4 w-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`mailto:${message.email}`);
                  }}
                  className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                  title="Enviar email"
                >
                  <Mail className="h-4 w-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(message.id);
                  }}
                  className="p-2 text-text-subtle hover:text-red-400 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Messages List - Desktop Table */}
      <div className="bg-secondary-100 border border-accent-gold/20 rounded-lg overflow-hidden hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary border-b border-accent-gold/20">
              <tr>
                <th className="text-left p-4 text-text-primary font-semibold">Remetente</th>
                <th className="text-left p-4 text-text-primary font-semibold">Assunto</th>
                <th className="text-left p-4 text-text-primary font-semibold">Veículo</th>
                <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                <th className="text-left p-4 text-text-primary font-semibold">Prioridade</th>
                <th className="text-left p-4 text-text-primary font-semibold">Data</th>
                <th className="text-left p-4 text-text-primary font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedMessages.map((message) => (
                <motion.tr
                  key={`desktop-${message.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b border-accent-gold/10 hover:bg-primary/50 transition-colors cursor-pointer ${
                    message.status === 'unread' ? 'bg-blue-500/5' : ''
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    markAsRead(message.id);
                  }}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${message.status === 'unread' ? 'text-text-primary' : 'text-text-subtle'}`}>
                          {message.from}
                        </h3>
                        <p className="text-sm text-text-subtle">{message.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className={`${message.status === 'unread' ? 'font-semibold text-text-primary' : 'text-text-subtle'} truncate max-w-xs`}>
                      {message.subject}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <p className="text-sm text-text-subtle">
                      {getVehicleInfo(message.vehicleId)}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(message.status)}`}>
                      {getStatusIcon(message.status)}
                      <span className="ml-1">{getStatusLabel(message.status)}</span>
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        message.priority === 'high' ? 'bg-red-400' :
                        message.priority === 'normal' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      <span className={`text-sm ${getPriorityColor(message.priority)}`}>
                        {getPriorityLabel(message.priority)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <p className="text-sm text-text-subtle">
                      {message.created_at.toLocaleDateString('pt-PT')}
                    </p>
                    <p className="text-xs text-text-subtle">
                      {message.created_at.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <select
                        value={message.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateMessageStatus(message.id, e.target.value as Message['status']);
                        }}
                        className="text-xs px-2 py-1 bg-primary border border-accent-gold/20 rounded text-text-primary focus:outline-none focus:border-accent-gold"
                      >
                        <option value="unread">Não lida</option>
                        <option value="read">Lida</option>
                        <option value="replied">Respondida</option>
                        <option value="archived">Arquivada</option>
                      </select>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(message);
                          setShowReplyModal(true);
                        }}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Responder"
                      >
                        <Reply className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`mailto:${message.email}`);
                        }}
                        className="p-2 text-text-subtle hover:text-accent-gold transition-colors"
                        title="Enviar email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
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

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && !showReplyModal && (
          <MessageDetailModal
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
            onReply={() => setShowReplyModal(true)}
          />
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <AnimatePresence>
        {showReplyModal && (
          <ReplyModal
            message={selectedMessage}
            onClose={() => {
              setShowReplyModal(false);
              setSelectedMessage(null);
            }}
            onSend={(replyData) => {
              if (selectedMessage) {
                updateMessageStatus(selectedMessage.id, 'replied');
              }
              setShowReplyModal(false);
              setSelectedMessage(null);
              alert('Resposta enviada com sucesso!');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageDetailModal({ 
  message, 
  onClose, 
  onReply 
}: {
  message: Message;
  onClose: () => void;
  onReply: () => void;
}) {
  const vehicle = message.vehicleId ? mockVehicles.find(v => v.id === message.vehicleId) : null;

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
            Detalhes da Mensagem
          </h2>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Sender Info */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-accent-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{message.from}</h3>
                <p className="text-text-subtle">{message.email}</p>
                {message.phone && <p className="text-text-subtle">{message.phone}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-subtle">Data:</p>
                <p className="text-text-primary">{message.created_at.toLocaleString('pt-PT')}</p>
              </div>
              <div>
                <p className="text-sm text-text-subtle">Status:</p>
                <p className="text-text-primary">{message.status}</p>
              </div>
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

          {/* Message Content */}
          <div className="bg-primary border border-accent-gold/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3">
              Assunto: {message.subject}
            </h3>
            <div className="prose max-w-none">
              <p className="text-text-subtle whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>

          {/* Response Info */}
          {message.replied_at && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-green-400">Respondida</h3>
              </div>
              <p className="text-text-subtle">
                Resposta enviada em {message.replied_at.toLocaleString('pt-PT')}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => window.open(`mailto:${message.email}`)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Abrir Email
            </Button>
            {message.phone && (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => window.open(`tel:${message.phone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Ligar
              </Button>
            )}
            <Button
              variant="primary"
              className="flex-1"
              onClick={onReply}
            >
              <Reply className="h-4 w-4 mr-2" />
              Responder
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ReplyModal({ 
  message, 
  onClose, 
  onSend 
}: {
  message?: Message | null;
  onClose: () => void;
  onSend: (replyData: any) => void;
}) {
  const [replyData, setReplyData] = useState({
    to: message?.email || '',
    subject: message ? `Re: ${message.subject}` : '',
    content: '',
    sendCopy: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(replyData);
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
            {message ? 'Responder Mensagem' : 'Nova Mensagem'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Para
              </label>
              <input
                type="email"
                required
                value={replyData.to}
                onChange={(e) => setReplyData({ ...replyData, to: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Assunto
              </label>
              <input
                type="text"
                required
                value={replyData.subject}
                onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Mensagem
            </label>
            <textarea
              rows={8}
              required
              value={replyData.content}
              onChange={(e) => setReplyData({ ...replyData, content: e.target.value })}
              placeholder="Digite sua resposta aqui..."
              className="w-full px-3 py-2 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sendCopy"
              checked={replyData.sendCopy}
              onChange={(e) => setReplyData({ ...replyData, sendCopy: e.target.checked })}
              className="w-4 h-4 text-accent-gold border-accent-gold/20 rounded focus:ring-accent-gold"
            />
            <label htmlFor="sendCopy" className="text-text-primary">
              Enviar cópia para o meu email
            </label>
          </div>

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
              Enviar Resposta
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
