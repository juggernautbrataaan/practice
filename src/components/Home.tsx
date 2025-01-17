import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductForm } from './ProductForm';
import { CreateProductForm } from './CreateProductForm';
import { Product, ProductCreate } from '../lib/types';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Plus } from 'lucide-react';
import { api } from '../lib/api';
import { useToast } from '@/hooks/use-toast';
import { prototype } from 'events';


export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await api.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast({ title: "Ошибка", description: "Не удалось загрузить товары.", variant: "destructive" });
    }
  };

 

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
  };

  const handleCreateProduct = async (product: ProductCreate) => {
    try {
      const newProduct = await api.createProduct(product);
      setProducts(prevProducts => [...prevProducts, newProduct]);  // Добавляем новый товар с полем imageUrl
      setIsCreating(false);
      toast({ title: "Товар создан", description: "Новый товар успешно добавлен." });
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось создать товар.", variant: "destructive" });
    }
  };

 
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setIsSheetOpen(false);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await api.deleteProduct(selectedProduct.id);
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setIsSheetOpen(false);
        toast({ title: "Товар удален", description: "Товар успешно удален." });
      } catch (error) {
        console.error('Failed to delete product:', error);
        toast({ title: "Ошибка", description: "Не удалось удалить товар.", variant: "destructive" });
      }
    }
  };

  


  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Каталог товаров</h1>
        <Button onClick={() => setIsCreating(true)} className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Добавить товар
        </Button>
      </div>
      <div className="flex flex-col gap-4 items-center">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
      {selectedProduct && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            {/* <SheetTitle className="text-2xl font-bold text-blue-600">Редактирование товара</SheetTitle>
            <SheetDescription>
              Измените детали товара или удалите его
            </SheetDescription> */}
          </SheetHeader>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleUpdateProduct}
            onCancel={() => setIsSheetOpen(false)}
            onDelete={handleDeleteProduct}
          />
        </SheetContent>
      </Sheet>
      )}
      {isCreating && (
        <Sheet open={isCreating} onOpenChange={setIsCreating}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-blue-600">Создание нового товара</SheetTitle>
              {/* <SheetDescription>
                Заполните форму для создания нового товара
              </SheetDescription> */}
            </SheetHeader>
            <CreateProductForm 
              onSubmit={handleCreateProduct}
              onCancel={() => setIsCreating(false)}
            />        
            </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

