# BCar - Dashboard Administrativo

## Visão Geral

Dashboard completo para gestão do stand automóvel BCar, incluindo gestão de veículos, CRM de clientes, sistema de mensagens e geração de propostas comerciais.

## Funcionalidades Principais

### 🚗 Gestão de Veículos
- **Inventário Completo**: Visualização de todos os veículos em stock
- **Status em Tempo Real**: Controlo de disponibilidade (Disponível, Reservado, Vendido, Em Negociação)
- **CRUD Completo**: Adicionar, editar e remover veículos
- **Filtros Avançados**: Pesquisa por marca, modelo, status, preço
- **Estatísticas**: Valor total do stock, veículos por status
- **Ações Rápidas**: Mudança de status diretamente na tabela

### 👥 CRM - Gestão de Clientes
- **Pipeline de Vendas**: Gestão de leads por status (Novo, Contatado, Qualificado, Convertido)
- **Priorização Automática**: Sistema de pontuação baseado em status e tempo
- **Histórico Completo**: Rastreamento de todas as interações
- **Ações Diretas**: Email, telefone e criação de propostas
- **Métricas de Conversão**: Acompanhamento de performance de vendas

### 💬 Sistema de Mensagens
- **Inbox Unificado**: Todas as mensagens do site em um local
- **Estados de Leitura**: Não lida, Lida, Respondida, Arquivada
- **Priorização**: Sistema de prioridades (Alta, Normal, Baixa)
- **Resposta Integrada**: Sistema de resposta por email diretamente na plataforma
- **Contextualização**: Ligação automática com veículos de interesse

### 📋 Gestão de Propostas
- **Criação Profissional**: Geração de propostas comerciais detalhadas
- **Múltiplos Tipos**: À vista, Financiamento, Leasing
- **Rastreamento Completo**: Status da proposta (Rascunho, Enviada, Visualizada, Aceite/Rejeitada)
- **Calculadora Financeira**: Simulação automática de prestações e juros
- **Ofertas Especiais**: Inclusão de benefícios e promoções
- **Validade Automática**: Controlo de expiração de propostas

## Estrutura da Dashboard

### Layout Principal
```
📊 Visão Geral (Overview)
├── Estatísticas gerais
├── Atividade recente
└── Ações rápidas

🚗 Veículos
├── Lista de veículos
├── Filtros e pesquisa
└── Gestão de status

👥 Clientes (CRM)
├── Pipeline de leads
├── Priorização automática
└── Ações de follow-up

💬 Mensagens
├── Inbox unificado
├── Estados de leitura
└── Sistema de resposta

📋 Propostas
├── Lista de propostas
├── Estados de negociação
└── Geração de PDFs
```

## Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização responsiva
- **Framer Motion**: Animações fluidas
- **Lucide React**: Ícones modernos
- **Zustand**: Gestão de estado (preparado para integração)

## Dados Mock

Para demonstração, a dashboard utiliza dados mock que simulam:
- 8 veículos com diferentes status
- 7 leads em várias fases do pipeline
- 5 mensagens com diferentes prioridades
- 5 propostas em diferentes estados

## Preparação para Firebase

A estrutura está preparada para integração com Firebase:

### Estrutura de Dados Sugerida

```typescript
// Firestore Collections
vehicles: {
  id: string;
  marca: string;
  modelo: string;
  // ... outros campos
}

leads: {
  id: string;
  nome: string;
  email: string;
  status: 'novo' | 'contatado' | 'qualificado' | 'convertido';
  // ... outros campos
}

messages: {
  id: string;
  from: string;
  subject: string;
  content: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  // ... outros campos
}

proposals: {
  id: string;
  clientName: string;
  vehicleId: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected';
  // ... outros campos
}
```

### Pontos de Integração

1. **Stores Zustand**: Já configurados para receber dados do Firebase
2. **Tipos TypeScript**: Interfaces prontas para use com Firestore
3. **CRUD Operations**: Métodos preparados para substituir mock data
4. **Real-time Updates**: Estrutura pronta para listeners do Firebase

## Funcionalidades Futuras

### 📧 Sistema de Email
- Templates profissionais
- Envio automático de propostas
- Sequências de follow-up
- Integração com Gmail/Outlook

### 📊 Analytics Avançado
- Dashboard de métricas
- Relatórios de vendas
- Análise de conversão
- Previsões de receita

### 🔐 Sistema de Autenticação
- Login administrativo
- Níveis de acesso
- Auditoria de ações
- Sessões seguras

### 📱 Notificações
- Push notifications
- Alertas de novos leads
- Lembretes de follow-up
- Propostas expiradas

### 🎨 Personalização
- Temas customizáveis
- Configurações de empresa
- Templates de documentos
- Branding personalizado

## Como Acessar

1. **Desenvolvimento**: `/admin`
2. **Navegação**: Menu principal → Admin
3. **Acesso Direto**: `http://localhost:3000/admin`

## Responsividade

A dashboard foi desenvolvida com foco mobile-first:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Virtualization**: Listas grandes otimizadas
- **Caching**: Dados em cache local
- **Animações Otimizadas**: Framer Motion com GPU acceleration

---

**Status**: ✅ Mockup Completo - Pronto para apresentação e integração Firebase
**Próximos Passos**: Integração Firebase, Autenticação, Geração de PDFs
