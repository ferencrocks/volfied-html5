import { Canvas } from "Canvas";
import { StageObject } from "Object/StageObject";
import {StageObjectPositioner} from "Object/StageObjectPositioner";

export interface Stage
{
  readonly canvas: Canvas;

  readonly padding: number;
  readonly positioner: StageObjectPositioner;

  readonly xUnit: number;
  readonly yUnit: number;

  readonly width: number;
  readonly height: number;


  draw(): void;

  drawCanvas(): void;

  drawObjects(): void;

  mount(object: StageObject): void;
}