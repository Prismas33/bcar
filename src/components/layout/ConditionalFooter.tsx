'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Não renderizar o footer se estiver na área admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Footer />;
}
