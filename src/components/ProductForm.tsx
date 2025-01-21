import React, { useState, useEffect } from 'react';
import { Product, packageTypes } from '../lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import { Combobox } from './ui/combobox';

interface ProductFormProps {
  product: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function ProductForm({ product, onSubmit, onCancel, onDelete }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [modelType, setModelType] = useState(product?.modelType ?? '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product ? api.getImageUrl(product.id) : '');
  const [renderImage, setRenderImage] = useState<File | null>(null);  // Добавлен новый state для изображения рендера

  // Для рендеринга 3D модели
  const [angle, setAngle] = useState(90);
  const [lightEnergy, setLightEnergy] = useState(900);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);

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
      await api.updateProduct({ ...updatedProduct, id: product.id });
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

  const handleRenderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRenderImage(file); // Сохраняем файл для рендера
    }
  };

  const handleRender = async () => {
    if (!renderImage) {
      toast({ title: "Ошибка", description: "Пожалуйста, загрузите изображение для рендера", variant: "destructive" });
      return;
    }

    try {
      // Передаем изображение для рендера, угол и яркость в запрос
      const imageBlob = await api.renderModel(renderImage, angle, lightEnergy);
      const imageUrl = URL.createObjectURL(imageBlob); // Создаем URL для Blob
      setRenderedImage(imageUrl); // Устанавливаем изображение для отображения
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось отрендерить модель", variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-1  overflow-y-auto overflow-x-hidden ">
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
        <Label htmlFor="modelType">Тип упаковки</Label>
        <Combobox options={packageTypes} value={modelType} onChange={setModelType} />
      </div>
      
      {/* Заголовок для изображения */}
      <div className="space-y-2">
        <Label htmlFor="image">Изображение</Label>
        <div className="flex items-center space-x-4">
          {/* Превью изображения с уменьшенными размерами */}
          <div className="relative w-24 h-24">
            <img
              src={imagePreview || '/placeholder.svg'}
              alt="Product image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Инпут для загрузки файла изображения */}
          <Label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <Upload className="w-4 h-4" />
              <span>Загрузить</span>
            </div>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </Label>
        </div>
      </div>


      <div className="flex justify-around space-x-4">
        <div className="flex space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          {onDelete && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить
            </Button>
          )}
        </div>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </div>

      {/* Новый инпут для загрузки изображения для рендеринга */}
      <div className="space-y-2">
        <Label htmlFor="render-image">Изображение для рендеринга</Label>
        <div className="flex items-center space-x-4">
          {/* Превью изображения для рендера */}
          <div className="relative w-24 h-24">
            {renderImage ? (
              <img
                src={URL.createObjectURL(renderImage)}
                alt="Render Image"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">Нет изображения</div>
            )}
          </div>

          {/* Инпут для загрузки изображения для рендеринга */}
          <Label htmlFor="render-image-upload" className="cursor-pointer">
            <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <Upload className="w-4 h-4" />
              <span>Загрузить</span>
            </div>
            <Input id="render-image-upload" type="file" accept="image/*" onChange={handleRenderImageUpload} className="hidden" />
          </Label>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="angle">Угол поворота</Label>
        <Input
          id="angle"
          type="number"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          min={0}
          max={360}
        />
        <Label htmlFor="lightEnergy">Яркость света</Label>
        <Input
          id="lightEnergy"
          type="number"
          value={lightEnergy}
          onChange={(e) => setLightEnergy(Number(e.target.value))}
          min={0}
          max={1000}
        />
      </div>

      

      {renderedImage && (
        <div className="mt-6">
          <Label>Рендер 3D модели:</Label>
          <img src={renderedImage} alt="Rendered Model" className="mt-2 rounded-md" />
        </div>
      )}

      <Button type="button" onClick={handleRender} className="bg-blue-600 hover:bg-blue-700 mt-4">
        Рендерить модель
      </Button>
    </form>
  );
}
