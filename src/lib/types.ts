export interface Product {
    id: number
    name: string
    description: string
    modelType: string
    imageUrl: string
  }
  
  export interface ProductCreate {
    name: string
    description: string
    modelType: string
    image: File | null
  }
  
  