export interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  quilometragem: number;
  combustivel: 'gasolina' | 'diesel' | 'eletrico' | 'hibrido';
  transmissao: 'manual' | 'automatica';
  cor: string;
  status: 'disponivel' | 'reservado' | 'vendido' | 'negociando';
  destaque: boolean;
  imagens: string[];
  descricao: string;
  especificacoes: VehicleSpecs;
  created_at: Date;
  updated_at: Date;
}

export interface VehicleSpecs {
  motor: string;
  potencia: string;
  aceleracao: string;
  velocidadeMaxima: string;
  portas: number;
  assentos: number;
  consumoCombustivel: string;
  emissoesCO2: string;
  garantia: string;
  caracteristicas: string[];
}

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  vehicleId: string;
  mensagem: string;
  status: 'novo' | 'contatado' | 'qualificado' | 'convertido';
  created_at: Date;
}

export interface ContactForm {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  vehicleId?: string;
}

export interface VehicleFilters {
  marca?: string;
  modelo?: string;
  precoMinimo?: number;
  precoMaximo?: number;
  anoMinimo?: number;
  anoMaximo?: number;
  combustivel?: string;
  transmissao?: string;
  status?: string;
}

export interface User {
  id: string;
  email: string;
  nome: string;
  papel: 'admin' | 'usuario';
  created_at: Date;
}
