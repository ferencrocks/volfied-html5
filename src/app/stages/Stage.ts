import { Canvas } from "Canvas";
import { StageObject } from "Object/StageObject";
import { StageObjectPositioner } from "Object/StageObjectPositioner";
import { CoordinateSystem } from "Canvas/CoordinateSystem";
import {IEdge} from "Canvas/Edge";

export interface Stage
{
  readonly canvas: Canvas;
  readonly coordinateSystem: CoordinateSystem;

  readonly positioner: StageObjectPositioner;

  readonly width: number;
  readonly height: number;

  edges: Array<IEdge>;
  

  init(): void;

  draw(): void;

  drawCanvas(): void;

  drawObjects(): void;

  mount(object: StageObject): void;
}