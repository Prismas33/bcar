import { create } from 'zustand';
import { Vehicle, VehicleFilters } from '@/types';

interface VehicleStore {
  vehicles: Vehicle[];
  filters: VehicleFilters;
  favorites: string[];
  loading: boolean;
  
  // Actions
  setVehicles: (vehicles: Vehicle[]) => void;
  setFilters: (filters: VehicleFilters) => void;
  addToFavorites: (vehicleId: string) => void;
  removeFromFavorites: (vehicleId: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed
  filteredVehicles: () => Vehicle[];
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],
  filters: {},
  favorites: [],
  loading: false,
  
  setVehicles: (vehicles) => set({ vehicles }),
  setFilters: (filters) => set({ filters }),
  
  addToFavorites: (vehicleId) => 
    set((state) => ({ 
      favorites: [...state.favorites, vehicleId] 
    })),
    
  removeFromFavorites: (vehicleId) =>
    set((state) => ({ 
      favorites: state.favorites.filter(id => id !== vehicleId) 
    })),
    
  setLoading: (loading) => set({ loading }),
  
  filteredVehicles: () => {
    const { vehicles, filters } = get();
    
    return vehicles.filter((vehicle) => {
      if (filters.marca && vehicle.marca !== filters.marca) return false;
      if (filters.precoMinimo && vehicle.preco < filters.precoMinimo) return false;
      if (filters.precoMaximo && vehicle.preco > filters.precoMaximo) return false;
      if (filters.anoMinimo && vehicle.ano < filters.anoMinimo) return false;
      if (filters.anoMaximo && vehicle.ano > filters.anoMaximo) return false;
      if (filters.combustivel && vehicle.combustivel !== filters.combustivel) return false;
      if (filters.transmissao && vehicle.transmissao !== filters.transmissao) return false;
      if (filters.status && vehicle.status !== filters.status) return false;
      
      return true;
    });
  },
}));
