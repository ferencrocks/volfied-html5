import { ICoordinate } from "Canvas/Coordinate";

export class CoordinateSystem {
  constructor(private vertexA: ICoordinate, private vertexB: ICoordinate) {

  }

  get topLeftVertexCoord(): ICoordinate {
    return this.vertexA;
  }

  get topRightVertexCoord(): ICoordinate {
    return { x: this.vertexB.x, y: this.vertexA.y };
  }

  get bottomLeftVertexCoord(): ICoordinate {
    return { x: this.vertexA.x, y: this.vertexB.y };
  }

  get bottomRightVertexCoord(): ICoordinate {
    return this.vertexB;
  }

  get width(): number {
    return this.vertexB.x - this.vertexA.x;
  }

  get height(): number {
    return this.vertexB.y - this.vertexA.y;
  }

  contains(coord: ICoordinate): boolean {
    return coord.x >= this.vertexA.x
      && coord.x <= this.vertexB.x
      && coord.y >= this.vertexA.y
      && coord.y <= this.vertexB.y;
  }

  toLocalCoord(globalCoord: ICoordinate): ICoordinate {
    return {
      x: globalCoord.x - this.vertexA.x,
      y: globalCoord.y - this.vertexA.y
    };
  }

  toGlobalCoord(localCoord: ICoordinate): ICoordinate {
    return {
      x: localCoord.x + this.vertexA.x,
      y: localCoord.y + this.vertexA.y
    };
  }
}