import { Canvas } from "Canvas";
import { Coordinate, ICoordinate } from "Canvas/Coordinate";

import { Stage } from "Stage/Stage";
import { State } from "../generic/State";

export interface IPosition extends ICoordinate {}
export const Position = Coordinate;

export interface Size {
  height: number;
  width: number;
}


export interface StageObject
{
  readonly size: Size;
  readonly stage: Stage;
  readonly state: State<ObjectState>

  draw(canvas: Canvas, position: IPosition): void;
}

export interface ObjectState {
  readonly isMoving: boolean,
  readonly position: IPosition,
  readonly velocity: number // distance per second
}