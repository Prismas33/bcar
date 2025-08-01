import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/ui/MobileBottomNav';

export const metadata = {
  title: 'BCar - Carros Usados de Qualidade',
  description: 'Stand automóvel especializado em carros usados de qualidade com total transparência e preços justos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-primary text-text-primary font-sans no-scroll-x">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
