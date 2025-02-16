
import { RenderControl } from "./renderConrol"

interface RenderControlsProps {
  horizontalAngle: number;
  verticalAngle: number;
  lightEnergy: number;
  lightAngle: number;
  onHorizontalAngleChange: (value: number) => void;
  onVerticalAngleChange: (value: number) => void;
  onLightEnergyChange: (value: number) => void;
  onLightAngleChange: (value: number) => void;
}

export function RenderControls({
  horizontalAngle,
  verticalAngle,
  lightEnergy,
  lightAngle,
  onHorizontalAngleChange,
  onVerticalAngleChange,
  onLightEnergyChange,
  onLightAngleChange,
}: RenderControlsProps) {
  return (
    <div className="space-y-4">
      <RenderControl
        id="horizontalAngle"
        label="Горизонтальный угол"
        value={horizontalAngle}
        min={-90}
        max={90}
        unit="°"
        onChange={onHorizontalAngleChange}
      />
      <RenderControl
        id="verticalAngle"
        label="Вертикальный угол"
        value={verticalAngle}
        min={-90}
        max={90}
        unit="°"
        onChange={onVerticalAngleChange}
      />
      <RenderControl
        id="lightEnergy"
        label="Яркость света"
        value={lightEnergy}
        min={0}
        max={100}
        unit="%"
        onChange={onLightEnergyChange}
      />
      <RenderControl
        id="lightAngle"
        label="Угол света"
        value={lightAngle}
        min={-180}
        max={180}
        unit="°"
        onChange={onLightAngleChange}
      />
    </div>
  );
} 