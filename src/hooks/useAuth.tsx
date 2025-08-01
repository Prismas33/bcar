'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar autenticação ao carregar
    const userData = localStorage.getItem('bcar-admin-user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
      // Redirecionar para login se estiver em rota protegida
      router.push('/admin/login');
    }
    setIsLoading(false);
  }, [pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('bcar-admin-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bcar-admin-user');
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
