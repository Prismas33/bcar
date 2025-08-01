import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary-100 border-t border-accent-gold/20 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <Car className="h-6 w-6 text-accent-gold" />
              <span className="text-xl font-serif font-bold text-gradient">
                BCar
              </span>
            </div>
            <p className="text-text-subtle text-sm text-center md:text-left mb-4 max-w-md mx-auto md:mx-0">
              O seu stand automóvel de confiança em Portugal. Especializados em carros usados 
              de qualidade com total transparência e preços justos.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-text-subtle hover:text-accent-gold transition-colors p-1">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-subtle hover:text-accent-gold transition-colors p-1">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-subtle hover:text-accent-gold transition-colors p-1">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-serif font-semibold text-text-primary mb-3">
              Links Rápidos
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-text-subtle hover:text-accent-gold transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-text-subtle hover:text-accent-gold transition-colors text-sm">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-subtle hover:text-accent-gold transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-subtle hover:text-accent-gold transition-colors text-sm">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contactos */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-serif font-semibold text-text-primary mb-3">
              Contactos
            </h3>
            <div className="space-y-2">
              <div className="flex items-start justify-center md:justify-start space-x-2 text-text-subtle text-sm">
                <MapPin className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <span className="text-center md:text-left">Rua dos Carros, 123<br />1000-001 Lisboa</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-text-subtle text-sm">
                <Phone className="h-4 w-4 text-accent-gold flex-shrink-0" />
                <a href="tel:+351000000000" className="hover:text-accent-gold transition-colors">
                  +351 000 000 000
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-text-subtle text-sm">
                <Mail className="h-4 w-4 text-accent-gold flex-shrink-0" />
                <a href="mailto:info@bcar.pt" className="hover:text-accent-gold transition-colors">
                  info@bcar.pt
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Compacto */}
        <div className="border-t border-accent-gold/20 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-text-subtle text-xs text-center md:text-left">
              © 2024 BCar. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-text-subtle hover:text-accent-gold text-xs transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="text-text-subtle hover:text-accent-gold text-xs transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
