import { Stage } from "./Stage";
import { StageObject } from "Object/StageObject";
import { Canvas } from "Canvas";
import { StageObjectPositioner, StageObjectPositionerConstructor } from "Object/StageObjectPositioner";
import { ICoordinate } from "Canvas/Coordinate";
import { CoordinateSystem } from "Canvas/CoordinateSystem";


export abstract class BaseStage implements Stage
{
  readonly objects: Set<StageObject> = new Set<StageObject>();

  readonly positioner: StageObjectPositioner;

  protected vertices: Array<ICoordinate>;


  constructor(readonly canvas: Canvas, readonly coordinateSystem: CoordinateSystem, positionerConstructor: StageObjectPositionerConstructor) {
    this.positioner = positionerConstructor(this);

    // Initialize vertices
    this.vertices = [
      this.coordinateSystem.topLeftVertexCoord,
      this.coordinateSystem.topRightVertexCoord,
      this.coordinateSystem.bottomRightVertexCoord,
      this.coordinateSystem.bottomLeftVertexCoord
    ];
  }

  draw() {
    this.drawCanvas();
    this.drawObjects();
  }

  drawCanvas() {

  }

  drawObjects() {
    this.objects.forEach(obj => {
      obj.draw(this.canvas, this.coordinateSystem.toGlobalCoord(obj.state.position));
    });
  }

  get width(): number {
    return this.coordinateSystem.width;
  }

  get height(): number {
    return this.coordinateSystem.height;
  }

  mount(obj: StageObject) {
    this.objects.add(obj);
  }

  unmount(obj: StageObject) {
    this.objects.delete(obj);
  }
}