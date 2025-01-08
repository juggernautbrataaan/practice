import { create } from 'zustand'
import { Product, ProductCreate } from './types'
import { api } from './api'

interface ProductStore {
  products: Product[]
  loadProducts: () => Promise<void>
  addProduct: (product: ProductCreate) => Promise<void>
  updateProduct: (id: number, updatedProduct: ProductCreate) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loadProducts: async () => {
    const products = await api.getAllProducts()
    set({ products })
  },
  addProduct: async (product) => {
    await api.createProduct(product)
    set((state) => ({ products: [...state.products, { id: Date.now(), ...product, imageUrl: '' }] }))
  },
  updateProduct: async (id, updatedProduct) => {
    await api.updateProduct(id, updatedProduct)
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct, imageUrl: p.imageUrl } : p)
    }))
  },
  deleteProduct: async (id) => {
    await api.deleteProduct(id)
    set((state) => ({
      products: state.products.filter(p => p.id !== id)
    }))
  },
}))

