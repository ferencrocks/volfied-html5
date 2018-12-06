import { Canvas } from "Canvas";
import { StageObject } from "Object/StageObject";

export interface Stage
{
  readonly canvas: Canvas;

  readonly padding: number;

  readonly xUnit: number;
  readonly yUnit: number;

  readonly width: number;
  readonly height: number;


  draw(): void;

  drawCanvas(): void;

  drawObjects(): void;

  mount(object: StageObject): void;
}