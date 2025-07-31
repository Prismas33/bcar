import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Selecione um assunto'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  vehicleId: z.string().optional(),
});

export const vehicleInterestSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().optional(),
  vehicleId: z.string(),
});

export const vehicleFilterSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  minYear: z.number().min(1990).optional(),
  maxYear: z.number().max(new Date().getFullYear() + 1).optional(),
  fuel: z.enum(['gasoline', 'diesel', 'electric', 'hybrid']).optional(),
  transmission: z.enum(['manual', 'automatic']).optional(),
  status: z.enum(['available', 'reserved', 'sold', 'negotiating']).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type VehicleInterestData = z.infer<typeof vehicleInterestSchema>;
export type VehicleFilterData = z.infer<typeof vehicleFilterSchema>;
