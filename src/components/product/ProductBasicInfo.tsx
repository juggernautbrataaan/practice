import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { packageTypes } from '@/lib/types';
import { Label } from '@/components/ui/label';

interface ProductBasicInfoProps {
  productInfo: {
    name: string;
    description: string;
    modelType: string;
  };
  setProductInfo: (info: { name: string; description: string; modelType: string }) => void;
}

export function ProductBasicInfo({ productInfo, setProductInfo }: ProductBasicInfoProps) {
  const { name, description, modelType } = productInfo;

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Название продукта</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })} 
          required 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Описание продукта</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })} 
          required 
          className="min-h-[100px]" 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="model-type">Тип упаковки</Label>
        <Combobox 
          options={packageTypes} 
          value={modelType} 
          onValueChange={(value) => setProductInfo({ ...productInfo, modelType: value })} 
          placeholder="Тип упаковки" 
        />
      </div>
    </div>
  );
}
