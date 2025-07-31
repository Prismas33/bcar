'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Entre em <span className="text-gradient">Contacto</span>
          </h1>
          <p className="text-xl text-text-subtle max-w-3xl mx-auto">
            Estamos aqui para ajudá-lo a encontrar o veículo perfeito. 
            Entre em contacto connosco através dos canais abaixo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informações de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-8">
              Informações de Contacto
            </h2>

            <div className="space-y-6">
              {/* Endereço */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Endereço</h3>
                  <p className="text-text-subtle">
                    Rua dos Carros, 123<br />
                    1000-001 Lisboa<br />
                    Portugal
                  </p>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Telefone</h3>
                  <p className="text-text-subtle">
                    +351 000 000 000<br />
                    +351 900 000 000 (Móvel)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Email</h3>
                  <p className="text-text-subtle">
                    info@bcar.pt<br />
                    vendas@bcar.pt
                  </p>
                </div>
              </div>

              {/* Horários */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Horários</h3>
                  <div className="text-text-subtle">
                    <p>Segunda a Sexta: 9h00 - 19h00</p>
                    <p>Sábado: 9h00 - 17h00</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-8">
              <h3 className="text-xl font-serif font-bold text-text-primary mb-4">Localização</h3>
              <div className="aspect-video bg-secondary-100 rounded-xl border border-accent-gold/20 flex items-center justify-center">
                <div className="text-center text-text-subtle">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-accent-gold" />
                  <p>Mapa Interativo</p>
                  <p className="text-sm">(Google Maps integração)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-secondary-100 rounded-xl p-8 border border-accent-gold/20">
              <h2 className="text-3xl font-serif font-bold text-text-primary mb-8">
                Envie-nos uma Mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
                    placeholder="O seu nome"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
                    placeholder="o.seu.email@exemplo.com"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold"
                    placeholder="+351 000 000 000"
                  />
                </div>

                {/* Assunto */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-gold"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="informacoes">Informações Gerais</option>
                    <option value="interesse">Interesse num Veículo</option>
                    <option value="visita">Agendar Visita</option>
                    <option value="financiamento">Financiamento</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-accent-gold/20 rounded-lg text-text-primary placeholder-text-subtle focus:outline-none focus:border-accent-gold resize-none"
                    placeholder="A sua mensagem..."
                  ></textarea>
                </div>

                {/* Botão Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Enviar Mensagem</span>
                </motion.button>
              </form>

              {/* Nota */}
              <p className="text-text-subtle text-sm mt-4 text-center">
                * Campos obrigatórios. Responderemos em até 24 horas.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-gold rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
              Prefere Falar Diretamente?
            </h3>
            <p className="text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              Ligue-nos agora e fale diretamente com um dos nossos especialistas. 
              Estamos disponíveis para esclarecer todas as suas dúvidas.
            </p>
            
            <a href="tel:+351000000000" className="btn-primary bg-primary text-accent-gold hover:bg-primary/90 inline-flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+351 000 000 000</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
