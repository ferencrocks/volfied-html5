import { Canvas } from "Canvas";
import { StageObject } from "Object/StageObject";
import { StageObjectPositioner } from "Object/StageObjectPositioner";
import { CoordinateSystem } from "Canvas/CoordinateSystem";

export interface Stage
{
  readonly canvas: Canvas;
  readonly coordinateSystem: CoordinateSystem;

  readonly positioner: StageObjectPositioner;

  readonly width: number;
  readonly height: number;


  draw(): void;

  drawCanvas(): void;

  drawObjects(): void;

  mount(object: StageObject): void;
}