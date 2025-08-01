'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Car } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLogin() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: 'admin@bcar.pt',
    password: 'demo123'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticação
    setTimeout(() => {
      if (credentials.email === 'admin@bcar.pt' && credentials.password === 'demo123') {
        login({
          name: 'João Silva',
          email: 'admin@bcar.pt',
          role: 'Administrador'
        });
        router.push('/admin');
      } else {
        alert('Credenciais inválidas! Use: admin@bcar.pt / demo123');
      }
      setIsLoading(false);
    }, 1500);
  };

  const demoUsers = [
    { name: 'João Silva', email: 'admin@bcar.pt', role: 'Administrador', password: 'demo123' },
    { name: 'Maria Santos', email: 'vendas@bcar.pt', role: 'Vendedora', password: 'demo123' },
    { name: 'Pedro Costa', email: 'gerente@bcar.pt', role: 'Gerente', password: 'demo123' }
  ];

  const handleDemoLogin = (user: typeof demoUsers[0]) => {
    setCredentials({ email: user.email, password: user.password });
    login({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsLoading(true);
    setTimeout(() => {
      router.push('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Área de Login */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-accent-gold" />
              <span className="text-2xl font-serif font-bold text-accent-gold">BCar</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Painel Administrativo</h1>
            <p className="text-text-subtle">Faça login para acessar o sistema</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-subtle" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-primary border border-accent-gold/20 rounded-lg focus:outline-none focus:border-accent-gold text-text-primary"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-subtle" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 bg-primary border border-accent-gold/20 rounded-lg focus:outline-none focus:border-accent-gold text-text-primary"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-subtle hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="text-center mt-6 space-y-3">
            <p className="text-text-subtle text-sm">
              Credenciais demo: admin@bcar.pt / demo123
            </p>
            <a 
              href="/"
              className="inline-flex items-center text-sm text-accent-gold hover:text-accent-gold/80 transition-colors"
            >
              ← Voltar ao Site
            </a>
          </div>
        </motion.div>

        {/* Área de Demo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Acesso Demo</h2>
            <p className="text-text-subtle mb-6">
              Experimente o sistema com diferentes tipos de usuário
            </p>

            <div className="space-y-3">
              {demoUsers.map((user, index) => (
                <motion.button
                  key={user.email}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleDemoLogin(user)}
                  disabled={isLoading}
                  className="w-full p-4 bg-primary border border-accent-gold/20 rounded-lg hover:border-accent-gold/40 transition-colors text-left disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{user.name}</p>
                      <p className="text-sm text-text-subtle">{user.role} • {user.email}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-secondary-100 border border-accent-gold/20 rounded-xl p-6">
            <h3 className="font-bold text-text-primary mb-3">Funcionalidades Demo</h3>
            <ul className="space-y-2 text-sm text-text-subtle">
              <li>• Gestão completa de veículos</li>
              <li>• Sistema de leads e clientes</li>
              <li>• Chat de mensagens</li>
              <li>• Geração de propostas</li>
              <li>• Dashboard com métricas</li>
              <li>• Interface responsiva</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
