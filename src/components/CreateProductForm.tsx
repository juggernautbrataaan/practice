import React, { useState } from 'react';
import { ProductCreate, packageTypes } from '../lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { ProductBasicInfo } from './ProductBasicInfo';



interface CreateProductFormProps {
  onSubmit: (product: ProductCreate) => Promise<void>;
  onCancel: () => void;
}

export function CreateProductForm({ onSubmit, onCancel }: CreateProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modelType, setModelType] = useState(packageTypes[0].value);
  const [image, setImage] = useState<File | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ProductCreate = { name, description, modelType, image };

    try {
      // Передаем данные в родительский компонент для дальнейшей обработки
      await onSubmit(productData);  // Родительский компонент будет отправлять данные в API
      onCancel();
      toast({ title: 'Товар создан', description: 'Новый товар успешно добавлен.' });
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось создать товар.', variant: 'destructive' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProductBasicInfo {...{ name, description, modelType, setName, setDescription, setModelType }} />
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Изображение</Label>
            <Input id="picture" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" >
          <Save className=" h-4 w-4" />
          Создать товар
        </Button>
      </div>
    </form>
  );
}