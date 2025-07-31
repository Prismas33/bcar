import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary-100 border-t border-accent-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-accent-gold" />
              <span className="text-2xl font-serif font-bold text-gradient">
                BCar
              </span>
            </div>
            <p className="text-text-subtle mb-6 max-w-md">
              O seu stand automóvel de confiança em Portugal. Especializados em carros usados 
              de qualidade com total transparência e preços justos.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              <a href="#" className="text-text-subtle hover:text-accent-gold transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-subtle hover:text-accent-gold transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-subtle hover:text-accent-gold transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-subtle hover:text-accent-gold transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-text-subtle hover:text-accent-gold transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-subtle hover:text-accent-gold transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-subtle hover:text-accent-gold transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contactos */}
          <div>
            <h3 className="text-lg font-serif font-semibold text-text-primary mb-4">
              Contactos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-text-subtle">
                <MapPin className="h-5 w-5 text-accent-gold" />
                <span>Rua dos Carros, 123<br />1000-001 Lisboa</span>
              </div>
              <div className="flex items-center space-x-2 text-text-subtle">
                <Phone className="h-5 w-5 text-accent-gold" />
                <span>+351 000 000 000</span>
              </div>
              <div className="flex items-center space-x-2 text-text-subtle">
                <Mail className="h-5 w-5 text-accent-gold" />
                <span>info@bcar.pt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Separação e Copyright */}
        <div className="border-t border-accent-gold/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-subtle text-sm">
              © 2024 BCar. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-text-subtle hover:text-accent-gold text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="text-text-subtle hover:text-accent-gold text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
