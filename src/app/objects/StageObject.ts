import { Canvas } from "Canvas";
import { Stage } from "Stage/Stage";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}


export interface StageObject
{
  readonly position: Position;
  readonly size: Size;
  readonly stage: Stage;

  draw(canvas: Canvas): void;
}

export interface ObjectState {
  isMoving: boolean,
  velocity: number // distance per second
}