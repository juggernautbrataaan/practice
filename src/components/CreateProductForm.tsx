import React, { useState } from 'react';
import { ProductCreate, packageTypes } from '../lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload } from 'lucide-react';
import { Combobox } from './ui/combobox';

interface CreateProductFormProps {
  onSubmit: (product: ProductCreate) => Promise<void>;
  onCancel: () => void;
}

export function CreateProductForm({ onSubmit, onCancel }: CreateProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modelType, setModelType] = useState(packageTypes[0].value);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

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
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Название</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label>Тип упаковки</Label>
        <Combobox options={packageTypes} value={modelType} onValueChange={setModelType} placeholder="Тип упаковки"/>
      </div>
      <div className="space-y-2">
        {/* <Label htmlFor="image">Изображение</Label> */}
        <div className="flex items-center space-x-4">
          {/* <div className="relative w-32 h-32">
            <img
              src={imagePreview || '/placeholder.svg'}
              alt="Product preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <Label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <Upload className="w-4 h-4" />
              <span>Загрузить изображение</span>
            </div>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
          </Label> */}
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
          <Save className="mr-2 h-4 w-4" />
          Создать товар
        </Button>
      </div>
    </form>
  );
}