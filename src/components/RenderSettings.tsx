import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { api } from "../lib/api";

interface RenderSettingsProps {
  productId: number;
}

export function RenderSettings({ productId }: RenderSettingsProps) {
  const [horizontalAngle, setHorizontalAngle] = useState(144);
  const [verticalAngle, setVerticalAngle] = useState(0);
  const [lightEnergy, setLightEnergy] = useState(80);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  const { toast } = useToast();

  const renderModel = async () => {
    if (!productId) {
      toast({ title: "Ошибка", description: "Товар не найден", variant: "destructive" });
      return;
    }
    setIsRendering(true);
    try {
      const imageBlob = await api.renderModel(productId, horizontalAngle, verticalAngle, lightEnergy);
      setRenderedImage(URL.createObjectURL(imageBlob));
    } catch {
      toast({ title: "Ошибка", description: "Не удалось отрендерить модель", variant: "destructive" });
    } finally {
      setIsRendering(false);
    }
  };

  useEffect(() => {
    renderModel();
  }, [horizontalAngle, verticalAngle, lightEnergy]); // Ререндер при изменении значений

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold border-b pb-2">Рендеринг товара</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="horizontalAngle">Горизонтальный угол</Label>
          <Slider
            id="horizontalAngle"
            min={0}
            max={288}
            step={1}
            value={[horizontalAngle]}
            onValueChange={(value) => setHorizontalAngle(value[0])}
          />
          {/* <div className="text-right">{horizontalAngle}°</div> */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="verticalAngle">Вертикальный угол</Label>
          <Slider
            id="verticalAngle"
            min={-180}
            max={180}
            step={1}
            value={[verticalAngle]}
            onValueChange={(value) => setVerticalAngle(value[0])}
          />
          {/* <div className="text-right">{verticalAngle}°</div> */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lightEnergy">Яркость света</Label>
          <Slider
            id="lightEnergy"
            min={0}
            max={160}
            step={1}
            value={[lightEnergy]}
            onValueChange={(value) => setLightEnergy(value[0])}
          />
          {/* <div className="text-right">{lightEnergy}</div> */}
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isRendering ? (
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full animate-spin border-4 border-t-blue-600 border-solid"></div>
          </div>
        ) : (
          renderedImage && (
            <img
              src={renderedImage}
              alt="Rendered Model"
              onClick={() => setIsFullScreen(true)}
              className="max-w-full max-h-[300px] object-contain cursor-pointer"
            />
          )
        )}
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
    </div>
    </div>
  );
}
