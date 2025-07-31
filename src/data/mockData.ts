import { Vehicle, Lead } from '../types'

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    marca: 'Porsche',
    modelo: '911 Carrera S',
    ano: 2024,
    preco: 850000,
    transmissao: 'automatica',
    combustivel: 'gasolina',
    quilometragem: 0,
    cor: 'Branco',
    status: 'disponivel',
    destaque: true,
    imagens: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop'
    ],
    descricao: 'O Porsche 911 Carrera S é a definição de excelência automotiva. Com motor boxer 3.0L biturbo que desenvolve 450 cavalos, este ícone alemão combina tradição e inovação em cada detalhe.',
    especificacoes: {
      motor: '3.0L Boxer 6 cilindros biturbo',
      potencia: '450 cavalos',
      aceleracao: '3.7 segundos (0-100 km/h)',
      velocidadeMaxima: '308 km/h',
      portas: 2,
      assentos: 4,
      consumoCombustivel: '11.1 L/100km',
      emissoesCO2: '255 g/km',
      garantia: '4 anos',
      caracteristicas: [
        'Motor 3.0L Boxer 6 cilindros biturbo',
        '450 cavalos de potência',
        'Transmissão PDK de 8 velocidades',
        'Tração traseira (RWD)',
        'Sistema de suspensão PASM',
        'Freios Porsche Ceramic Composite Brake (PCCB)',
        'Sistema de escape esportivo',
        'Interior em couro Nappa',
        'Sistema de infotainment PCM',
        'Bancos esportivos adaptativos'
      ]
    },
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15')
  },
  {
    id: '2',
    marca: 'Ferrari',
    modelo: 'F8 Tributo',
    ano: 2023,
    preco: 1250000,
    transmissao: 'automatica',
    combustivel: 'gasolina',
    quilometragem: 2500,
    cor: 'Vermelho',
    status: 'disponivel',
    destaque: true,
    imagens: [
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616788494707-ec4fe3103de3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop'
    ],
    descricao: 'A Ferrari F8 Tributo representa o ápice da engenharia italiana. Seu V8 twin-turbo de 720 cavalos oferece uma experiência de condução incomparável, combinando performance explosiva com elegância refinada.',
    especificacoes: {
      motor: 'V8 3.9L twin-turbo',
      potencia: '720 cavalos',
      aceleracao: '2.9 segundos (0-100 km/h)',
      velocidadeMaxima: '340 km/h',
      portas: 2,
      assentos: 2,
      consumoCombustivel: '15.0 L/100km',
      emissoesCO2: '292 g/km',
      garantia: '3 anos',
      caracteristicas: [
        'Motor V8 3.9L twin-turbo',
        '720 cavalos de potência',
        'Transmissão F1 DCT de 7 velocidades',
        'Tração traseira com diferencial Side Slip Control',
        'Aerodinâmica ativa',
        'Freios Brembo de alta performance',
        'Suspensão magnética SCM-E',
        'Interior em couro italiano premium',
        'Sistema Ferrari Dynamic Enhancer',
        'Modo de condução Manettino'
      ]
    },
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-10')
  },
  {
    id: '3',
    marca: 'Lamborghini',
    modelo: 'Huracán EVO',
    ano: 2023,
    preco: 980000,
    transmissao: 'automatica',
    combustivel: 'gasolina',
    quilometragem: 1800,
    cor: 'Verde',
    status: 'disponivel',
    destaque: false,
    imagens: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592840062661-de8b930d3c56?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop'
    ],
    descricao: 'O Lamborghini Huracán EVO é uma obra-prima da engenharia italiana que combina o rugido selvagem do V10 naturalmente aspirado com tecnologia de ponta e design agressivo.',
    especificacoes: {
      motor: 'V10 5.2L naturalmente aspirado',
      potencia: '640 cavalos',
      aceleracao: '3.1 segundos (0-100 km/h)',
      velocidadeMaxima: '325 km/h',
      portas: 2,
      assentos: 2,
      consumoCombustivel: '14.9 L/100km',
      emissoesCO2: '332 g/km',
      garantia: '3 anos',
      caracteristicas: [
        'Motor V10 5.2L naturalmente aspirado',
        '640 cavalos de potência',
        'Transmissão LDF de dupla embreagem',
        'Tração integral Lamborghini Dinamica Veicolo Integrata',
        'Sistema Lamborghini Piattaforma Inerziale',
        'Aerodinâmica ativa',
        'Freios Brembo com discos carbono-cerâmica',
        'Interior Alcantara e couro',
        'Sistema HMI touchscreen 8.4"',
        'Modos de condução ANIMA'
      ]
    },
    created_at: new Date('2024-01-08'),
    updated_at: new Date('2024-01-08')
  },
  {
    id: '4',
    marca: 'BMW',
    modelo: 'M8 Competition',
    ano: 2024,
    preco: 750000,
    transmissao: 'automatica',
    combustivel: 'gasolina',
    quilometragem: 0,
    cor: 'Preto',
    status: 'disponivel',
    destaque: false,
    imagens: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555618142-db15c4799637?w=800&h=600&fit=crop'
    ],
    descricao: 'O BMW M8 Competition representa o equilíbrio perfeito entre luxo e performance. Seu V8 biturbo entrega potência brutal enquanto mantém o conforto e sofisticação típicos da BMW.',
    especificacoes: {
      motor: 'V8 4.4L M TwinPower Turbo',
      potencia: '625 cavalos',
      aceleracao: '3.2 segundos (0-100 km/h)',
      velocidadeMaxima: '305 km/h',
      portas: 2,
      assentos: 4,
      consumoCombustivel: '12.8 L/100km',
      emissoesCO2: '290 g/km',
      garantia: '3 anos',
      caracteristicas: [
        'Motor V8 4.4L M TwinPower Turbo',
        '625 cavalos de potência',
        'Transmissão M Steptronic de 8 velocidades',
        'Tração integral M xDrive',
        'Diferencial M ativo',
        'Suspensão adaptativa M',
        'Freios M de alto desempenho',
        'Interior M em couro Merino',
        'Sistema BMW iDrive 7.0',
        'Bancos M multicontorno'
      ]
    },
    created_at: new Date('2024-01-12'),
    updated_at: new Date('2024-01-12')
  },
  {
    id: '5',
    marca: 'Mercedes-Benz',
    modelo: 'AMG GT 63 S',
    ano: 2023,
    preco: 920000,
    transmissao: 'automatica',
    combustivel: 'gasolina',
    quilometragem: 3200,
    cor: 'Prata',
    status: 'disponivel',
    destaque: false,
    imagens: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop'
    ],
    descricao: 'O Mercedes-AMG GT 63 S é um grand tourer de alta performance que une a elegância Mercedes com a brutalidade AMG. Perfeito para quem busca conforto e velocidade em doses iguais.',
    especificacoes: {
      motor: 'V8 4.0L AMG biturbo',
      potencia: '630 cavalos',
      aceleracao: '3.2 segundos (0-100 km/h)',
      velocidadeMaxima: '315 km/h',
      portas: 4,
      assentos: 4,
      consumoCombustivel: '12.5 L/100km',
      emissoesCO2: '285 g/km',
      garantia: '3 anos',
      caracteristicas: [
        'Motor V8 4.0L AMG biturbo',
        '630 cavalos de potência',
        'Transmissão AMG SPEEDSHIFT DCT 9G',
        'Tração integral AMG Performance 4MATIC+',
        'Suspensão pneumática AMG RIDE CONTROL+',
        'Sistema AMG DYNAMIC SELECT',
        'Freios AMG de alto desempenho',
        'Interior AMG em couro Nappa',
        'Sistema MBUX com tela 12.3"',
        'Bancos de performance AMG'
      ]
    },
    created_at: new Date('2024-01-05'),
    updated_at: new Date('2024-01-05')
  },
  {
    id: '6',
    marca: 'Audi',
    modelo: 'RS7 Sportback',
    ano: 2024,
    preco: 680000,
    transmissao: 'automatica',
    combustivel: 'gasolina',
    quilometragem: 0,
    cor: 'Azul',
    status: 'disponivel',
    destaque: false,
    imagens: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1614165936126-8c1e0b3df75c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1614026480371-5b65a2b9f236?w=800&h=600&fit=crop'
    ],
    descricao: 'O Audi RS7 Sportback é a definição de versatilidade esportiva. Combina o design elegante de um coupé com a praticidade de um hatchback e a performance devastadora da divisão RS.',
    especificacoes: {
      motor: 'V8 4.0L TFSI twin-turbo',
      potencia: '600 cavalos',
      aceleracao: '3.6 segundos (0-100 km/h)',
      velocidadeMaxima: '305 km/h',
      portas: 5,
      assentos: 4,
      consumoCombustivel: '11.7 L/100km',
      emissoesCO2: '270 g/km',
      garantia: '3 anos',
      caracteristicas: [
        'Motor V8 4.0L TFSI twin-turbo',
        '600 cavalos de potência',
        'Transmissão tiptronic de 8 velocidades',
        'Tração integral quattro permanente',
        'Diferencial esportivo RS',
        'Suspensão pneumática adaptativa',
        'Sistema RS Dynamic Ride Control',
        'Interior RS em couro Valcona',
        'Virtual Cockpit Plus 12.3"',
        'Bancos RS com função massagem'
      ]
    },
    created_at: new Date('2024-01-18'),
    updated_at: new Date('2024-01-18')
  }
]

export const mockLeads: Lead[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    vehicleId: '1',
    mensagem: 'Gostaria de agendar um test drive para este final de semana.',
    status: 'novo',
    created_at: new Date('2024-01-20')
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria.santos@email.com',
    telefone: '(11) 88888-8888',
    vehicleId: '2',
    mensagem: 'Tenho interesse em conhecer mais sobre as opções de financiamento.',
    status: 'contatado',
    created_at: new Date('2024-01-19')
  }
]
