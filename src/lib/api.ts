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

  createProduct(product: ProductCreate): Promise<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('modeltype', product.modelType);
    if (product.image) formData.append('image', product.image);
  
    return fetch(`${API_URL}/products/products`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create product');
        }
        return response.json(); // Возвращаем промис с продуктом
      })
      .then((createdProduct: Product) => {
        return createdProduct; // Возвращаем созданный продукт
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



  renderModel: async (formData: FormData): Promise<Blob> => {
    const response = await axios.post<Blob>(`https://localhost:7247/api/Image/products/render`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob',  // Это говорит Axios, что ответ будет Blob
    });
    return response.data; // Теперь тип данных будет точно Blob
  }
}

