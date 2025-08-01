import './globals.css';
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { ConditionalMobileBottomNav } from '@/components/layout/ConditionalMobileBottomNav';

export const metadata = {
  title: 'BCar - Carros Usados de Qualidade',
  description: 'Stand automóvel especializado em carros usados de qualidade com total transparência e preços justos.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-primary text-text-primary font-sans no-scroll-x">
        <ConditionalNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ConditionalFooter />
        <ConditionalMobileBottomNav />
      </body>
    </html>
  );
}
