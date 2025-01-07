import React from 'react'
import { Product } from '../lib/products'
import { Card, CardContent } from "./ui/card"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow overflow-hidden" onClick={onClick}>
      <CardContent className="p-4 flex items-center">
        <div className="w-16 h-16 mr-4 flex-shrink-0 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

