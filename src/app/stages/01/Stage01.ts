import { Stage } from "../Stage";
import { Canvas } from "Canvas";

import { pathStyle, applyStyle } from 'Style/index';
import { BaseStage } from "../BaseStage";
import {ICoordinate} from "Canvas/Coordinate";


export default class Stage01 extends BaseStage implements Stage {
  drawCanvas() {
    super.drawCanvas();

    const ctx = this.canvas.context;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cs = this.coordinateSystem;

    const style = applyStyle(ctx);

    ctx.save();
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = "white";
    ctx.beginPath();

    this.vertices.forEach((vertex: ICoordinate, idx) => {
      if (idx === 0) {
        ctx.moveTo(vertex.x, vertex.y);
      }
      else {
        ctx.lineTo(vertex.x, vertex.y);
      }
    });

    ctx.lineTo(this.vertices[0].x, this.vertices[0].y);

    style(pathStyle);
    ctx.stroke();

    ctx.fillStyle = 'orange';
    // ctx.fill();

    ctx.restore();
  }
}