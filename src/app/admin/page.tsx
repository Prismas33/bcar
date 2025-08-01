'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Car, 
  Users, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Calendar,
  Euro,
  Eye,
  Settings,
  BarChart3,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto mb-4"></div>
          <p className="text-text-subtle">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // AuthProvider will handle redirect
  }

  // Mock data para o dashboard
  const stats = {
    totalVehicles: 8,
    availableVehicles: 6,
    soldThisMonth: 2,
    totalLeads: 15,
    newLeads: 5,
    monthlyRevenue: 234000,
    averagePrice: 45000,
    conversionRate: 13.3
  };

  const recentActivity = [
    { id: 1, type: 'lead', message: 'Nova mensagem de João Silva sobre Porsche 911', time: '2 min atrás' },
    { id: 2, type: 'vehicle', message: 'BMW M3 marcado como vendido', time: '1 hora atrás' },
    { id: 3, type: 'lead', message: 'Test drive agendado para Mercedes AMG', time: '3 horas atrás' },
    { id: 4, type: 'proposal', message: 'Proposta enviada para Ferrari 488', time: '5 horas atrás' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'vehicles', label: 'Veículos', icon: Car },
    { id: 'leads', label: 'Clientes', icon: Users },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'proposals', label: 'Propostas', icon: FileText }
  ];

  return (
    <div className="h-screen bg-primary flex flex-col overflow-hidden">
      {/* Header */}
      <AdminHeader 
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isSidebarOpen={isMobileSidebarOpen}
      />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ 
            x: (isMobileSidebarOpen || isDesktop) ? 0 : -300 
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed lg:relative w-64 bg-secondary-100 border-r border-accent-gold/20 h-full p-4 lg:p-6 z-40 overflow-y-auto"
        >
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-accent-gold text-primary font-semibold'
                      : 'text-text-subtle hover:text-text-primary hover:bg-primary/50'
                  }`}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm lg:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-3 lg:p-6 overflow-y-auto">
            {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 lg:space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-subtle text-xs lg:text-sm">Total Veículos</p>
                      <p className="text-xl lg:text-2xl font-bold text-text-primary">{stats.totalVehicles}</p>
                    </div>
                    <Car className="h-6 w-6 lg:h-8 lg:w-8 text-accent-gold" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-400 text-xs lg:text-sm">{stats.availableVehicles} disponíveis</span>
                  </div>
                </div>

                <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-subtle text-xs lg:text-sm">Vendas Este Mês</p>
                      <p className="text-xl lg:text-2xl font-bold text-text-primary">{stats.soldThisMonth}</p>
                    </div>
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-accent-gold" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-400 text-xs lg:text-sm">+25% vs mês anterior</span>
                  </div>
                </div>

                <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-subtle text-xs lg:text-sm">Novos Leads</p>
                      <p className="text-xl lg:text-2xl font-bold text-text-primary">{stats.newLeads}</p>
                    </div>
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-accent-gold" />
                  </div>
                  <div className="mt-2">
                    <span className="text-text-subtle text-xs lg:text-sm">de {stats.totalLeads} total</span>
                  </div>
                </div>

                <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-subtle text-xs lg:text-sm">Receita Mensal</p>
                      <p className="text-xl lg:text-2xl font-bold text-text-primary">€{stats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <Euro className="h-6 w-6 lg:h-8 lg:w-8 text-accent-gold" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-400 text-xs lg:text-sm">{stats.conversionRate}% conversão</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-lg lg:text-xl font-serif font-bold text-text-primary">
                    Atividade Recente
                  </h2>
                  <Button variant="secondary" size="sm" className="text-xs lg:text-sm">
                    Ver Todas
                  </Button>
                </div>
                
                <div className="space-y-3 lg:space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-primary rounded-lg border border-accent-gold/10">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'lead' ? 'bg-blue-400' :
                        activity.type === 'vehicle' ? 'bg-green-400' :
                        activity.type === 'proposal' ? 'bg-yellow-400' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-text-primary text-sm lg:text-base">{activity.message}</p>
                        <p className="text-text-subtle text-xs lg:text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
                <Link href="/admin/vehicles/new">
                  <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6 hover:border-accent-gold/40 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 lg:space-x-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                        <Plus className="h-5 w-5 lg:h-6 lg:w-6 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary text-sm lg:text-base">Adicionar Veículo</h3>
                        <p className="text-text-subtle text-xs lg:text-sm">Novo veículo ao stock</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6 hover:border-accent-gold/40 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 lg:h-6 lg:w-6 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm lg:text-base">Responder Mensagens</h3>
                      <p className="text-text-subtle text-xs lg:text-sm">5 mensagens pendentes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-4 lg:p-6 hover:border-accent-gold/40 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm lg:text-base">Gerar Proposta</h3>
                      <p className="text-text-subtle text-xs lg:text-sm">Para lead qualificado</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vehicles' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <VehicleManagement />
            </motion.div>
          )}

          {activeTab === 'leads' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LeadManagement />
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MessageManagement />
            </motion.div>
          )}

          {activeTab === 'proposals' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProposalManagement />
            </motion.div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}

import { VehicleManagement } from '@/components/admin/VehicleManagement';
import { LeadManagement } from '@/components/admin/LeadManagement';
import { MessageManagement } from '@/components/admin/MessageManagement';
import { ProposalManagement } from '@/components/admin/ProposalManagement';
