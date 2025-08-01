'use client';

import { usePathname } from 'next/navigation';
import { MobileBottomNav } from '../ui/MobileBottomNav';

export function ConditionalMobileBottomNav() {
  const pathname = usePathname();
  
  // Não renderizar a bottom nav se estiver na área admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <MobileBottomNav />;
}
