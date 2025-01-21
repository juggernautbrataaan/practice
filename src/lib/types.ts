export interface Product {
    id: number
    name: string
    description: string
    modelType: string
    imageUrl: string
    
  }

  export interface Product extends ProductCreate {
    id: number;
    imageUrl: string;  // Ссылка на изображение товара
  }
  
  export interface ProductCreate {
    id?: number;
    name: string
    description: string
    modelType: string
    image: File | null
    
  }
  
  export const packageTypes = [
    { label: 'Пакет', value: 'Пакет' },
    { label: 'Банка', value: 'Банка' }
  ]