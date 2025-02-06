import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Combobox } from './ui/combobox';
import { packageTypes } from '../lib/types';

interface ProductBasicInfoProps {
  name: string;
  description: string;
  modelType: string;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setModelType: (value: string) => void;
}

export function ProductBasicInfo({ name, description, modelType, setName, setDescription, setModelType }: ProductBasicInfoProps) {
  return (
    <div className="space-y-4">
      <Input id="name" placeholder="Название продукта" value={name} onChange={(e) => setName(e.target.value)} required />

      <Textarea id="description" placeholder="Описание продукта" value={description} onChange={(e) => setDescription(e.target.value)} required className="min-h-[100px]" />

      <Combobox options={packageTypes} value={modelType} onValueChange={setModelType} placeholder="Тип упаковки" />
    </div>
  );
}
