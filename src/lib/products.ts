import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: number
  name: string
  description: string
  image: string
  type: string
}

interface ProductStore {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: number, updatedProduct: Partial<Product>) => void
  deleteProduct: (id: number) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [
        { id: 1, name: "Ноутбук", description: "Мощный ноутбук для работы и игр", image: "/placeholder.svg", type: "Электроника" },
        { id: 2, name: "Смартфон", description: "Современный смартфон с отличной камерой", image: "/placeholder.svg", type: "Электроника" },
        { id: 3, name: "Наушники", description: "Беспроводные наушники с шумоподавлением", image: "/placeholder.svg", type: "Аксессуары" },
        { id: 4, name: "Планшет", description: "Легкий и удобный планшет для развлечений", image: "/placeholder.svg", type: "Электроника" },
      ],
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Math.max(0, ...state.products.map(p => p.id)) + 1 }]
      })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'product-storage',
      
    }
  )
)

