import {Stage} from "Stage/Stage";
import {ObjectPosition, StageObject} from "Object/StageObject";

export enum VertPosition {
  top ='TOP',
  center = 'CENTER',
  bottom = 'BOTTOM'
};

export enum HorizPosition {
  left = 'LEFT',
  right = 'RIGHT',
  center = 'CENTER'
}

export type Position = [HorizPosition | number, VertPosition | number];

export type StageObjectPositionerConstructor = (stage: Stage) => StageObjectPositioner;

export type StageObjectPositioner = (object: StageObject, position: Position) => ObjectPosition;

export const createStageObjectPosition: StageObjectPositionerConstructor =
  (stage: Stage): StageObjectPositioner =>
    (object: StageObject, position: Position): ObjectPosition => {
      return {x: 0, y: 0};
    };