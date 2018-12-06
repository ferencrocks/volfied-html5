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
    (object: StageObject, [horiz, vert]: Position): ObjectPosition => {
      let x : number = 0, y: number = 0;

      switch (horiz) {
        case HorizPosition.left:
          x = 0;
          break;

        case HorizPosition.center:
          x = stage.width / 2 - object.size.width / 2;
          break;

        case HorizPosition.right:
          x = stage.width;
          break;
      }

      switch (vert) {
        case VertPosition.top:
          y = 0;
          break;

        case VertPosition.center:
          y = stage.height / 2 - object.size.height / 2;
          break;

        case VertPosition.bottom:
          y = stage.height;
      }

      return {
        x: stage.padding + x,
        y: stage.padding + y
      };
    };