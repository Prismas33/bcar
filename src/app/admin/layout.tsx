import '../globals.css';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata = {
  title: 'BCar Admin - Painel Administrativo',
  description: 'Painel administrativo para gestão do stand automóvel BCar.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-primary text-text-primary font-sans no-scroll-x">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
