import {ICoordinate} from "Canvas/Coordinate";

export interface IEdge {
  readonly p1: ICoordinate,
  readonly p2: ICoordinate,

  readonly lowX: number;
  readonly highX: number;
  readonly lowY: number;
  readonly highY: number;

  contains(p: ICoordinate): boolean;
  readonly isHorizontal: boolean;
  readonly isVertical: boolean;
}

export class Edge implements IEdge {
  readonly isHorizontal: boolean;
  readonly isVertical: boolean;

  readonly lowX: number;
  readonly highX: number;
  readonly lowY: number;
  readonly highY: number;

  constructor(readonly p1: ICoordinate, readonly p2: ICoordinate) {
    this.isHorizontal = this.p1.y === this.p2.y;
    this.isVertical = this.p1.x === this.p2.x;

    [this.lowX, this.highX] = [this.p1.x, this.p2.x].sort();
    [this.lowY, this.highY] = [this.p1.y, this.p2.y].sort();
  }

  contains(p: ICoordinate) {
    if (this.isHorizontal) {
      return p.y === this.p1.y && p.x >= this.lowX && p.x <= this.highX;
    }
    if (this.isVertical) {
      return p.x === this.p1.x && p.y >= this.lowY && p.y <= this.highY;
    }

    return false;
  }
}