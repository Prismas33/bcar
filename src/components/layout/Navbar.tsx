'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Car, Phone, Mail } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Desktop Navigation */}
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary hover:text-accent-gold transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-primary/95 backdrop-blur-md border-b border-accent-gold/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-text-primary hover:text-accent-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="px-3 py-2 space-y-2 border-t border-accent-gold/20 mt-4">
              <a href="tel:+351000000000" className="flex items-center space-x-2 text-text-subtle">
                <Phone className="h-4 w-4" />
                <span>+351 000 000 000</span>
              </a>
              <a href="mailto:info@bcar.pt" className="flex items-center space-x-2 text-text-subtle">
                <Mail className="h-4 w-4" />
                <span>info@bcar.pt</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
