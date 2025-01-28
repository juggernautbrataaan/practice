import React, { useState, useEffect } from 'react';
import { Product, packageTypes } from '../lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Trash2, UserPen } from 'lucide-react';
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
  const [lightEnergy, setLightEnergy] = useState(0);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false)
  // Состояние для отслеживания процесса рендеринга
  const [isRendering, setIsRendering] = useState(false);

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

  const handleRenderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRenderImage(file); // Сохраняем файл для рендера
    }
  };

  const handleRender = async () => {
    if (!product) {
      toast({ title: "Ошибка", description: "Товар не найден", variant: "destructive" });
      return;
    }
  
    setIsRendering(true); // Устанавливаем состояние загрузки в true
  
    try {
      // Передаем id товара, угол и яркость в запрос
      const imageBlob = await api.renderModel(product.id, angle, lightEnergy);
      const imageUrl = URL.createObjectURL(imageBlob); // Создаем URL для Blob
      setRenderedImage(imageUrl); // Устанавливаем изображение для отображения
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось отрендерить модель", variant: "destructive" });
    } finally {
      setIsRendering(false); // Завершаем процесс рендеринга
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-1 overflow-y-auto overflow-x-hidden">
      {/* Секция изменения информации о товаре */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold border-b pb-2">Изменение информации о товаре</h2>
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
          <Combobox options={packageTypes} value={modelType} onValueChange={setModelType} placeholder="Тип упаковки" />
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="image">Изображение</Label> */}
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <img
                src={imagePreview || '/placeholder.svg'}
                alt="Product image"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-primary/90">
                <Upload className="w-4 h-4" />
                <span>Загрузить</span>
              </div>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </Label>
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Изображение</Label>
              <Input id="picture" type="file" accept="image/*" onChange={handleImageUpload} />
            </div> */}
          </div>
        </div>
      </div>

      {/* Общие действия */}
      <div className="flex justify-between space-x-4">

        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>

        <Button type="button" variant="destructive" onClick={onDelete}>
          <Trash2 />
          Удалить
        </Button>

        <Button type="submit" >
          <Save />
          Сохранить
        </Button>
      </div>
      {/* Секция редактирования рендера */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold border-b pb-2">Редактирование рендера товара</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Изображение</Label>
              <Input id="picture" type="file" accept="image/*" onChange={handleRenderImageUpload} />
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="angle">Угол поворота</Label>
              <Input
                id="angle"
                type="number"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                min={0}
                max={360}
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="lightEnergy">Яркость света</Label>
              <Input
                id="lightEnergy"
                type="number"
                value={lightEnergy}
                onChange={(e) => setLightEnergy(Number(e.target.value))}
                min={0}
                max={1000}
              />
            </div> */}
            <Button type="button" onClick={handleRender}  className="w-full">
              Рендерить модель
            </Button>
          </div>
          <div className="flex items-center justify-center">
            {isRendering ? (
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full animate-spin border-4 border-t-blue-600 border-solid"></div>              </div>
            ) : (
              renderedImage && <img src={renderedImage} alt="Rendered Model" onClick={() => setIsFullScreen(true)} className="max-w-full max-h-[300px] object-contain cursor-pointer" />
            )}
          </div>
        </div>
      </div>
      {isFullScreen && renderedImage && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ margin: 0 }} // Убирает внешние отступы
          onClick={() => setIsFullScreen(false)}
        >
          <img
            src={renderedImage || "/placeholder.svg"}
            alt="Full Screen Rendered Model"
            className="max-w-[90%] max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}



    </form>
  );

}
