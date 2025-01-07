import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore, Product } from '../lib/products'
import { ProductCard } from '../components/ProductCard'
import { ProductSheet } from '../components/ProductSheet'
import { Button } from "../components/ui/button"
import { PlusCircle } from 'lucide-react'

export default function Home() {
  const { products } = useProductStore()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Список товаров</h1>
          <Link to="/product/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить товар
            </Button>
          </Link>
        </div>
        <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => {
                setSelectedProduct(product)
                setIsSheetOpen(true)
              }}
            />
          ))}
        </div>
      </div>
      <ProductSheet 
        product={selectedProduct}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  )
}

