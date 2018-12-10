import { Stage } from "./Stage";
import { StageObject } from "Object/StageObject";
import { Canvas } from "Canvas";
import { StageObjectPositioner, StageObjectPositionerConstructor } from "Object/StageObjectPositioner";
import { ICoordinate } from "Canvas/Coordinate";
import { CoordinateSystem } from "Canvas/CoordinateSystem";
import {Edge, IEdge} from "Canvas/Edge";


export abstract class BaseStage implements Stage
{
  readonly objects: Set<StageObject> = new Set<StageObject>();

  readonly positioner: StageObjectPositioner;

  protected _edges: Array<IEdge> = [];


  constructor(readonly canvas: Canvas, readonly coordinateSystem: CoordinateSystem, positionerConstructor: StageObjectPositionerConstructor) {
    this.positioner = positionerConstructor(this);

    // Initialize edges
    const localCoord = coordinateSystem.toLocalCoord.bind(coordinateSystem);
    this._edges = [
      new Edge(
        localCoord(this.coordinateSystem.topLeftVertexCoord),
        localCoord(this.coordinateSystem.topRightVertexCoord)
      ),
      new Edge(
        localCoord(this.coordinateSystem.topRightVertexCoord),
        localCoord(this.coordinateSystem.bottomRightVertexCoord)
      ),
      new Edge(
        localCoord(this.coordinateSystem.bottomRightVertexCoord),
        localCoord(this.coordinateSystem.bottomLeftVertexCoord)
      ),
      new Edge(
        localCoord(this.coordinateSystem.bottomLeftVertexCoord),
        localCoord(this.coordinateSystem.topLeftVertexCoord)
      )
    ];

    this.init();
  }

  init() {}

  get edges(): Array<IEdge> {
    return [...this._edges];
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