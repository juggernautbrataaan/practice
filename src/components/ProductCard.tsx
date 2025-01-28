import { Product } from '../lib/types';
import { Button } from './ui/button';
import { HeartIcon, PlusIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { api } from '@/lib/api'

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card className="w-[300px] group relative space-y-4 overflow-hidden">
      <figure className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          {/* <HeartIcon className="size-4" /> */}
        </Button>
        <img
          className="aspect-square w-full object-cover"
          src={api.getImageUrl(product.id) || "/placeholder.svg"}
          alt={product.name}
        />
      </figure>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 ">
              <span aria-hidden="true" className="absolute inset-0 " onClick={onClick} />
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t">
        {/* <Button variant="ghost" className="w-full" onClick={onClick}>
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button> */}
      </CardFooter>
    </Card>
  );
}
