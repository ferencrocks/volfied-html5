import { Stage } from "./Stage";
import { StageObject } from "Object/StageObject";
import { Canvas } from "Canvas";
import { StageObjectPositioner, StageObjectPositionerConstructor } from "Object/StageObjectPositioner";


const X_UNITS = 40;
const Y_UNITS = 30;


export abstract class BaseStage implements Stage
{
  protected _padding: number = 20;

  readonly objects: Set<StageObject> = new Set<StageObject>();

  readonly positioner: StageObjectPositioner;


  constructor(readonly canvas: Canvas, positionerConstructor: StageObjectPositionerConstructor) {
    this.positioner = positionerConstructor(this);
  }

  draw() {
    this.drawCanvas();
    this.drawObjects();
  }

  drawCanvas() {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawObjects() {
    this.objects.forEach(obj => {
      obj.draw(this.canvas);
    });
  }

  get padding() {
    return this._padding;
  }

  set padding(padding) {
    this._padding = padding;
  }

  get width(): number {
    return this.canvas.width - this._padding * 2;
  }

  get height(): number {
    return this.canvas.height - this._padding * 2;
  }

  get xUnit(): number {
    return this.width / X_UNITS;
  }

  get yUnit(): number {
    return this.height / Y_UNITS;
  }

  mount(obj: StageObject) {
    this.objects.add(obj);
  }

  unmount(obj: StageObject) {
    this.objects.delete(obj);
  }
}