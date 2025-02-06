import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
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
    <div className="space-y-2">
      <Label htmlFor="name">Название</Label>
      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <Label htmlFor="description">Описание</Label>
      <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="min-h-[100px]" />

      <Label htmlFor="modelType">Тип упаковки</Label>
      <Combobox options={packageTypes} value={modelType} onValueChange={setModelType} placeholder="Тип упаковки" />
    </div>
  );
}
