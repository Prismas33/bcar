'use client';

import Link from 'next/link';
import { Car, Phone, Mail, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

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
            
            {/* Botão Admin especial */}
            <Link href="/admin/login">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(212, 175, 55, 0.3)',
                    '0 0 15px rgba(212, 175, 55, 0.6)',
                    '0 0 5px rgba(212, 175, 55, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative bg-accent-gold/20 hover:bg-accent-gold/30 border border-accent-gold/50 rounded-lg px-4 py-2 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-accent-gold" />
                  <span className="text-accent-gold font-semibold">Admin Demo</span>
                </div>
                
                {/* Badge "NOVO" */}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                  DEMO
                </div>
              </motion.div>
            </Link>
            
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
