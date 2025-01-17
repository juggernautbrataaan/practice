import { Product } from '../lib/types';
import { Card, CardContent, CardFooter } from "./ui/card"
import {api} from '@/lib/api'


interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 w-80" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 overflow-hidden rounded-md shrink-0">
            <img 
              src={api.getImageUrl(product.id) || "/placeholder.svg"}
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-blue-600 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.modelType}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-2">
        <p className="text-sm text-gray-500 truncate">{product.description}</p>
      </CardFooter>
    </Card>
  )
}


