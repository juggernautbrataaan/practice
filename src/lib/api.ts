import axios from 'axios';
import { Product, ProductCreate,  } from '@/lib/types';

const API_URL = 'https://localhost:7247/api/products';
const IMAGE_API_URL = 'https://localhost:7247/api/products';

export const api = {
  // Получение всех продуктов
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  // Получение продукта по ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Создание нового продукта
  createProduct: async (product: ProductCreate): Promise<void> => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('modeltype', product.modelType);
    if (product.image) formData.append('image', product.image);

    await axios.post(`${API_URL}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Обновление продукта
  updateProduct: async (id: number, product: ProductCreate): Promise<void> => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('modeltype', product.modelType);
    if (product.image) formData.append('image', product.image);

    await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Удаление продукта
  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  // Получение изображения продукта
  getImageUrl: (id: number): string => {
    return `${API_URL}/${id}/image?timestamp=${new Date().getTime()}`;
  },

  // Рендер модели
  renderModel: async (id: number, angle: number, lightEnergy: number): Promise<Blob> => {
    console.log()
    const response = await axios.put(`${IMAGE_API_URL}/${id}/render`, null, {
      params: { angle, lightEnergy },
      responseType: 'blob',
    });
    console.log(`${IMAGE_API_URL}/${id}/render`, null, {
      params: { angle, lightEnergy },
      responseType: 'blob',
    })
    return response.data;
  },

  // Получение всех моделей
  // getAllModels: async (): Promise<Model[]> => {
  //   const response = await axios.get(`${IMAGE_API_URL}/models`);
  //   return response.data;
  // },

  // // Добавление модели
  // addModel: async (modelType: string, file: File): Promise<void> => {
  //   const formData = new FormData();
  //   formData.append('modeltype', modelType);
  //   formData.append('Blender_file', file);

  //   await axios.post(`${IMAGE_API_URL}/model`, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  // },

  // // Удаление модели
  // deleteModel: async (id: number): Promise<void> => {
  //   await axios.delete(`${IMAGE_API_URL}/${id}/model`);
  // },

  // // Получение всех рендеров
  // getAllRenders: async (): Promise<RenderResponse[]> => {
  //   const response = await axios.get(`${IMAGE_API_URL}/renders`);
  //   return response.data;
  // },
};
