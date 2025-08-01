import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('pt-PT').format(mileage) + ' km';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'text-green-400';
    case 'reserved':
      return 'text-yellow-400';
    case 'sold':
      return 'text-red-400';
    case 'negotiating':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'disponivel':
      return 'Disponível';
    case 'reservado':
      return 'Reservado';
    case 'vendido':
      return 'Vendido';
    case 'negociacao':
      return 'Em Negociação';
    default:
      return 'Desconhecido';
  }
}

export function getFuelLabel(fuel: string): string {
  switch (fuel) {
    case 'gasolina':
      return 'Gasolina';
    case 'diesel':
      return 'Diesel';
    case 'eletrico':
      return 'Elétrico';
    case 'hibrido':
      return 'Híbrido';
    default:
      return fuel;
  }
}

export function getTransmissionLabel(transmission: string): string {
  switch (transmission) {
    case 'manual':
      return 'Manual';
    case 'automatic':
      return 'Automática';
    default:
      return transmission;
  }
}
