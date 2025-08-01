'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Não renderizar a navbar se estiver na área admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Navbar />;
}
