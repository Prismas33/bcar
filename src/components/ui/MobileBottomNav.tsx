'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Heart, Home, Search, Mail, Monitor } from 'lucide-react';
import Link from 'next/link';

export function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    {
      id: 'home',
      icon: Home,
      label: 'Início',
      href: '/',
      color: 'text-accent-gold',
    },
    {
      id: 'catalog',
      icon: Search,
      label: 'Catálogo',
      href: '/catalog',
      color: 'text-blue-400',
    },
    {
      id: 'admin',
      icon: Monitor,
      label: 'Admin',
      href: '/admin/login',
      color: 'text-accent-gold',
      special: true,
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/351000000000',
      color: 'text-green-500',
      external: true,
    },
    {
      id: 'contact',
      icon: Mail,
      label: 'Email',
      href: '/contact',
      color: 'text-purple-400',
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      <div className="bg-primary/95 backdrop-blur-md border-t border-accent-gold/20 px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            const content = (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl touch-target transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent-gold/20 text-accent-gold' 
                    : tab.special
                    ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30'
                    : 'text-text-subtle hover:text-text-primary'
                }`}
              >
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : tab.special ? 1.05 : 1,
                    y: isActive ? -2 : 0 
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isActive ? tab.color : tab.special ? tab.color : ''}`} />
                </motion.div>
                
                <span className={`text-xs font-medium ${
                  isActive ? 'text-accent-gold' : tab.special ? 'text-accent-gold' : 'text-text-subtle'
                }`}>
                  {tab.label}
                </span>
                
                {/* Badge especial para admin */}
                {tab.special && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full font-bold text-[8px]"
                  >
                    DEMO
                  </motion.div>
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-1 h-1 bg-accent-gold rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            );

            if (tab.external) {
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-manipulation"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={tab.id} href={tab.href} className="touch-manipulation">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Floating Contact Button */}
      <motion.a
        href="tel:+351000000000"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent-gold text-luxury-black p-4 rounded-full shadow-luxury flex items-center justify-center touch-target"
        style={{
          boxShadow: '0 10px 30px rgba(184, 134, 11, 0.4)',
        }}
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </motion.div>
  );
}
