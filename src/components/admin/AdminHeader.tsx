'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Eye,
  Settings,
  LogOut,
  User,
  Bell,
  ChevronDown,
  X,
  MessageSquare,
  Clock,
  CheckCircle,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function AdminHeader({ onToggleSidebar, isSidebarOpen }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      logout();
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'Nova mensagem de cliente',
      message: 'João Silva enviou uma mensagem sobre o Porsche 911',
      time: '2 min atrás',
      unread: true
    },
    {
      id: 2,
      type: 'sale',
      title: 'Venda confirmada',
      message: 'BMW M3 foi vendido com sucesso',
      time: '1 hora atrás',
      unread: true
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Test drive agendado',
      message: 'Agendamento para Mercedes AMG amanhã às 14h',
      time: '3 horas atrás',
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'Backup concluído',
      message: 'Backup automático do sistema realizado',
      time: '1 dia atrás',
      unread: false
    }
  ];

  if (!user) return null;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary-100 border-b border-accent-gold/20 px-3 lg:px-6 py-3 lg:py-4 relative z-40"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Botão hamburger integrado no mobile */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 -ml-2 hover:bg-primary/50 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-text-primary" />
            </button>
            
            <div>
              <h1 className="text-base sm:text-lg lg:text-2xl font-serif font-bold text-text-primary">
                Painel Administrativo
              </h1>
              <p className="text-text-subtle text-xs sm:text-sm lg:text-base">
                {getGreeting()}, {user.name.split(' ')[0]}! Bem-vindo ao BCar
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Notificações */}
            <div className="relative" ref={notificationsRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1.5 lg:p-2 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              </Button>
            </div>

            {/* Ver Site - Hidden on mobile */}
            <Link href="/" className="hidden md:block">
              <Button variant="secondary" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
            </Link>

            {/* Menu do Usuário */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-2 rounded-lg hover:bg-primary/50 transition-colors"
              >
                <div className="relative">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent-gold/20 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 lg:h-4 lg:w-4 text-accent-gold" />
                  </div>
                  {/* Status online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 lg:w-3 lg:h-3 bg-green-500 border-2 border-secondary-100 rounded-full"></div>
                </div>
                <div className="text-left hidden sm:block lg:block">
                  <p className="text-xs sm:text-sm font-medium text-text-primary">{user.name}</p>
                  <p className="text-xs text-text-subtle">{user.role}</p>
                </div>
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 text-text-subtle hidden sm:block" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-secondary-100 border border-accent-gold/20 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setShowSettings(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded hover:bg-primary/50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span className="text-sm">Configurações</span>
                      </button>
                      <button 
                        onClick={() => {
                          setShowProfile(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded hover:bg-primary/50 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm">Perfil</span>
                      </button>
                      <hr className="my-2 border-accent-gold/20" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 p-2 rounded hover:bg-red-500/20 transition-colors text-red-400"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Sair</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Barra lateral de notificações */}
      <AnimatePresence>
        {showNotifications && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setShowNotifications(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-secondary-100 border-l border-accent-gold/20 z-40 shadow-2xl"
            >
              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="text-lg lg:text-xl font-bold text-text-primary">Notificações</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-2 hover:bg-primary/50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 lg:space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 lg:p-4 rounded-lg border transition-colors cursor-pointer ${
                        notification.unread 
                          ? 'bg-accent-gold/10 border-accent-gold/30' 
                          : 'bg-primary border-accent-gold/10 hover:border-accent-gold/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'message' ? 'bg-blue-500/20' :
                          notification.type === 'sale' ? 'bg-green-500/20' :
                          notification.type === 'appointment' ? 'bg-yellow-500/20' :
                          'bg-gray-500/20'
                        }`}>
                          {notification.type === 'message' && <MessageSquare className="h-3 w-3 lg:h-4 lg:w-4 text-blue-400" />}
                          {notification.type === 'sale' && <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-400" />}
                          {notification.type === 'appointment' && <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400" />}
                          {notification.type === 'system' && <Settings className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-xs lg:text-sm font-medium text-text-primary truncate">
                              {notification.title}
                            </h4>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-text-subtle mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-text-subtle">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 lg:mt-6">
                  <Button variant="secondary" className="w-full text-sm">
                    Marcar todas como lidas
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Configurações */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-primary">Configurações</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-primary/50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-2">Tema</h4>
                  <p className="text-sm text-text-subtle">Modo escuro ativado</p>
                </div>
                
                <div className="p-4 bg-primary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-2">Notificações</h4>
                  <p className="text-sm text-text-subtle">Email e push habilitados</p>
                </div>
                
                <div className="p-4 bg-primary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-2">Idioma</h4>
                  <p className="text-sm text-text-subtle">Português (Portugal)</p>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                className="w-full mt-6"
                onClick={() => setShowSettings(false)}
              >
                Fechar
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Perfil */}
      <AnimatePresence>
        {showProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-primary">Perfil</h3>
                <button
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-primary/50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <User className="h-10 w-10 text-accent-gold" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-secondary-100 rounded-full"></div>
                </div>
                <h4 className="font-bold text-text-primary text-lg">{user.name}</h4>
                <p className="text-text-subtle">{user.role}</p>
                <p className="text-sm text-text-subtle mt-1">{user.email}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-primary rounded-lg">
                  <span className="text-sm text-text-primary">Último login</span>
                  <span className="text-sm text-text-subtle">Hoje, 09:30</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-primary rounded-lg">
                  <span className="text-sm text-text-primary">Sessões ativas</span>
                  <span className="text-sm text-accent-gold">1</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-primary rounded-lg">
                  <span className="text-sm text-text-primary">Desde</span>
                  <span className="text-sm text-text-subtle">Janeiro 2024</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                className="w-full mt-6"
                onClick={() => setShowProfile(false)}
              >
                Fechar
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
