import { create } from "zustand";
import type { Product } from "@/types";
import { api } from "@/services/api";

interface ProductState {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  limit: number;
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  total: 0,
  isLoading: false,
  error: null,
  searchQuery: "",
  page: 1,
  limit: 10,

  fetchProducts: async (limit = 10, skip = 0) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getProducts(limit, skip);
      set({
        products: response.products,
        total: response.total,
        isLoading: false,
        limit,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch products",
        isLoading: false,
      });
    }
  },

  searchProducts: async (query: string) => {
    if (!query.trim()) {
      const store = useProductStore.getState();
      store.fetchProducts(store.limit, (store.page - 1) * store.limit);
      return;
    }
    set({ isLoading: true, error: null, searchQuery: query });
    try {
      const response = await api.searchProducts(query);
      set({
        products: response.products,
        total: response.total,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to search products",
        isLoading: false,
      });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setPage: (page: number) => set({ page }),

  deleteProduct: async (id: number) => {
    try {
      await api.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        total: state.total - 1,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete product",
      });
    }
  },
}));
