import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface RenderSettingsProps {
  angle: number;
  lightEnergy: number;
  setAngle: (value: number) => void;
  setLightEnergy: (value: number) => void;
  handleRender: () => void;
  isRendering: boolean;
  renderedImage: string | null;
  setIsFullScreen: (value: boolean) => void;
}

export function RenderSettings({ angle, lightEnergy, setAngle, setLightEnergy, handleRender, isRendering, renderedImage, setIsFullScreen }: RenderSettingsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold border-b pb-2">Рендеринг товара</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label htmlFor="angle">Угол поворота</Label>
          <Input id="angle" type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} min={-360} max={360} />

          <Label htmlFor="lightEnergy">Яркость света</Label>
          <Input id="lightEnergy" type="number" value={lightEnergy} onChange={(e) => setLightEnergy(Number(e.target.value))} min={0} max={1000} />

          <Button type="button" onClick={handleRender} className="w-full">
            Рендерить модель
          </Button>
        </div>
        <div className="flex items-center justify-center">
          {isRendering ? (
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 rounded-full animate-spin border-4 border-t-blue-600 border-solid"></div>
            </div>
          ) : (
            renderedImage && <img src={renderedImage} alt="Rendered Model" onClick={() => setIsFullScreen(true)} className="max-w-full max-h-[300px] object-contain cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
}
