import React, { useState, useEffect } from 'react';
import { Product } from '../lib/types';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import { ProductBasicInfo } from './ProductBasicInfo';
import { RenderSettings } from './RenderSettings';
import { ProductImage } from './ProductImage';



interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product) => void;
  onDelete?: () => void;
}

export function ProductForm({ product, onSubmit,  onDelete }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [modelType, setModelType] = useState(product?.modelType ?? '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product ? api.getImageUrl(product.id) : '');
  const { toast } = useToast();

  // Обновление imagePreview, если product изменился
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setModelType(product.modelType);
      setImagePreview(api.getImageUrl(product.id)); // Обновляем превью с URL
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) {
      return; // Если продукт не существует, ничего не делаем
    }

    const updatedProduct = { name, description, modelType, image };

    try {
      // Передаем id и объект продукта как отдельные аргументы
      await api.updateProduct(product.id, updatedProduct);
      const freshProduct = await api.getProductById(product.id);
      onSubmit(freshProduct); // Передаем обновленный продукт в родительский компонент
      toast({ title: 'Товар обновлен', description: 'Изменения сохранены успешно.' });
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить товар.', variant: 'destructive' });
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Обновляем превью изображения
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL для превью
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 px-2">
      <div className="flex justify-between items-center mb-6 mr-2">
        <h2 className="text-2xl font-bold mb-4">Товар</h2>
        <div className="space-x-2">
          <Button type="submit" >
            <Save />
            Сохранить
          </Button>
          <Button type="button" variant="destructive" onClick={onDelete}>
            <Trash2 />
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ProductBasicInfo {...{ name, description, modelType, setName, setDescription, setModelType }} />
        <ProductImage {...{ imagePreview, handleImageUpload }} />
      </div>
      {product && <RenderSettings productId={product.id} />}
    </form>
  );
}