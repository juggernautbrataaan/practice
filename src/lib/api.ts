import axios from 'axios'
import { Product, ProductCreate } from './types'

const API_URL = 'https://localhost:7247/api' // Replace with your actual API URL

export const api = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products/products`)
    return response.data
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/products/${id}`)
    return response.data
  },

  createProduct(product: ProductCreate): Promise<void> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('modeltype', product.modelType);  // Исправлено на 'modeltype'
    if (product.image) formData.append('image', product.image);
  
    return axios.post(`${API_URL}/Products/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        // Ничего не возвращаем, просто подтверждаем успешное выполнение
      })
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Failed to create product');
      });
  },

  // Для обновления продукта
  updateProduct: async (product: ProductCreate): Promise<void> => {
    const formData = new FormData();
    formData.append('id', product.id!.toString());
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('modelType', product.modelType);
    if (product.image) formData.append('image', product.image);

    await axios.put(`${API_URL}/products/products`, formData);
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/products/products/${id}`)
  },

  getImageUrl: (id: number): string => {
    return `${API_URL}/products/products/${id}/image?timestamp=${new Date().getTime()}`;
  }, 



  renderModel: async (image: File | null, angle: number, lightEnergy: number): Promise<Blob> => {
    if (!image) throw new Error('Изображение не загружено');
    
    const formData = new FormData();
    formData.append('file', image);
    formData.append('angle', angle.toString());
    formData.append('lightEnergy', lightEnergy.toString());

    console.log(`${API_URL}/Image/products/render?angle=${angle}&lightEnergy=${lightEnergy}`)
    try {
      // Отправляем POST запрос с FormData
      const response = await axios.post<Blob>(`${API_URL}/Image/products/render?angle=${angle}&lightEnergy=${lightEnergy}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',  // Говорим, что ответ будет типа Blob
      });
      
      return response.data; // Возвращаем Blob с изображением
    } catch (error) {
      throw new Error('Не удалось отрендерить модель');
    }
  },
}

