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
    case 'available':
      return 'Disponível';
    case 'reserved':
      return 'Reservado';
    case 'sold':
      return 'Vendido';
    case 'negotiating':
      return 'Em Negociação';
    default:
      return 'Desconhecido';
  }
}

export function getFuelLabel(fuel: string): string {
  switch (fuel) {
    case 'gasoline':
      return 'Gasolina';
    case 'diesel':
      return 'Diesel';
    case 'electric':
      return 'Elétrico';
    case 'hybrid':
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
