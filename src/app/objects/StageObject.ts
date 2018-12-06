import { Canvas } from "Canvas";
import { Coordinate } from "Canvas/Coordinate";

import { Stage } from "Stage/Stage";
import { State } from "../generic/State";

export interface ObjectPosition extends Coordinate {}

export interface Size {
  height: number;
  width: number;
}


export interface StageObject
{
  readonly size: Size;
  readonly stage: Stage;
  readonly state: State<ObjectState>

  draw(canvas: Canvas): void;
}

export interface ObjectState {
  readonly isMoving: boolean,
  readonly position: ObjectPosition,
  readonly velocity: number // distance per second
}