'use client';

import Link from 'next/link';
import { Car, Phone, Mail } from 'lucide-react';

export function Navbar() {
  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '/catalog' },
    { name: 'Sobre Nós', href: '/about' },
    { name: 'Contactos', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-primary/80 backdrop-blur-md border-b border-accent-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-accent-gold" />
              <span className="text-2xl font-serif font-bold text-gradient">
                BCar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile since we have bottom nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-primary hover:text-accent-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Contact Info */}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-accent-gold/20">
              <a href="tel:+351000000000" className="flex items-center space-x-1 text-text-subtle hover:text-accent-gold transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+351 000 000 000</span>
              </a>
              <a href="mailto:info@bcar.pt" className="flex items-center space-x-1 text-text-subtle hover:text-accent-gold transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@bcar.pt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
