import { Stage } from "../Stage";
import { Canvas } from "Canvas";

import { pathStyle, applyStyle } from 'Style/index';
import { BaseStage } from "../BaseStage";


export default class Stage01 extends BaseStage implements Stage {
  drawCanvas() {
    super.drawCanvas();

    const ctx = this.canvas.context;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const p = this.padding;

    ctx.save();
    ctx.fillStyle = 'orange';
    ctx.fillRect(p, p, w - 2 * p, h - 2 * p);

    applyStyle(ctx)(pathStyle);
    ctx.strokeRect(p, p, w - 2 * p, h - 2 * p);
    ctx.restore();
  }
}