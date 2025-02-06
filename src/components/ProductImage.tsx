import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";

interface ProductImageProps {
  imagePreview: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductImage({ imagePreview, handleImageUpload }: ProductImageProps) {
  return (
    
        <div  onClick={() => document.getElementById('image-upload')?.click()}>
          <Card className="w-full h-full flex items-center justify-center rounded">
            <CardContent className="w-full h-full flex items-center justify-center p-4">
              <img src={imagePreview} alt="Product" className="max-w-full max-h-full object-contain rounded" />
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </CardContent>
          </Card>
        </div>
      
  );
}
