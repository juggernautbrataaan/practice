
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "./ui/sheet"
import { Product } from '../lib/products'
import { Button } from "./ui/button"
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"

interface ProductSheetProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductSheet({ product, isOpen, onClose }: ProductSheetProps) {
  const navigate = useNavigate()

  if (!product) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[90vw] sm:max-w-[540px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">{product.name}</SheetTitle>
          <SheetDescription>Детали товара</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            <div className="aspect-square w-full relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              {/* <Badge variant="secondary" className="mb-2">{product.type}</Badge> */}
              <h3 className="text-lg font-semibold mb-2">Описание</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="mt-6">
          <Button 
            onClick={() => {
              onClose()
              navigate(`/product/${product.id}`)
            }}
            className="w-full"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Редактировать
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

