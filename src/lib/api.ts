import axios from 'axios'
import { Product, ProductCreate } from '@/lib/types'

const API_URL = 'https://localhost:7247/' // Replace with your actual API URL

export const api = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products/get-all/image`)
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}/image-info`)
    return response.data
  },

  createProduct: async (product: ProductCreate): Promise<void> => {
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('modelType', product.modelType)
    if (product.image) {
      formData.append('image', product.image)
    }
    await axios.post(`${API_URL}/products/image`, formData)
  },

  updateProduct: async (id: number, product: ProductCreate): Promise<void> => {
    const formData = new FormData()
    formData.append('id', id.toString())
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('modelType', product.modelType)
    if (product.image) {
      formData.append('image', product.image)
    }
    await axios.put(`${API_URL}/products/${id}/image`, formData)
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/products/${id}/image`)
  }
}

