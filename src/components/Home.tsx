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
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары.",
        variant: "destructive",
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
  };

  const handleCreateProduct = async (product: ProductCreate) => {
    try {
      await api.createProduct(product);  // Отправка запроса на создание товара

      // После создания товара, перезагружаем все товары с сервера
      fetchProducts();  // Это обновит список товаров

      setIsCreating(false);  // Закрытие формы создания товара
      toast({
        title: "Товар создан",
        description: "Новый товар успешно добавлен.",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать товар.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setIsSheetOpen(false);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await api.deleteProduct(selectedProduct.id);
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        setIsSheetOpen(false);
        toast({
          title: "Товар удален",
          description: "Товар успешно удален.",
        });
      } catch (error) {
        console.error('Failed to delete product:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось удалить товар.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Каталог товаров</h1>
        <Button onClick={() => setIsCreating(true)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Добавить товар
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent  className="sm:max-w-md max-h-screen overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-gray-800">Редактирование товара</SheetTitle>
              <SheetDescription className="text-sm text-gray-600">
                Измените детали товара или удалите его
              </SheetDescription>
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
          <SheetContent className="max-w-md max-h-screen overflow-y-auto rounded-lg shadow-lg">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-blue-600">Создание нового товара</SheetTitle>
            </SheetHeader>
            <CreateProductForm onSubmit={handleCreateProduct} onCancel={() => setIsCreating(false)} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
