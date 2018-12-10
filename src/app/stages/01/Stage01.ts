import { Stage } from "../Stage";
import { Canvas } from "Canvas";

import { pathStyle, applyStyle } from 'Style/index';
import { BaseStage } from "../BaseStage";
import {Coordinate, ICoordinate} from "Canvas/Coordinate";
import {Edge, IEdge} from "Canvas/Edge";


export default class Stage01 extends BaseStage implements Stage {
  init() {
    super.init();
    //
    // this.vertices = [
    //   this.coordinateSystem.topLeftVertexCoord,
    //   this.coordinateSystem.topRightVertexCoord,
    //   Coordinate(this.coordinateSystem.bottomRightVertexCoord.x, this.coordinateSystem.bottomRightVertexCoord.y * 0.75),
    //   Coordinate(this.coordinateSystem.bottomRightVertexCoord.x * 0.75, this.coordinateSystem.bottomRightVertexCoord.y * 0.75),
    //   Coordinate(this.coordinateSystem.bottomRightVertexCoord.x * 0.75, this.coordinateSystem.bottomRightVertexCoord.y),
    //   this.coordinateSystem.bottomLeftVertexCoord
    // ];
    //

    const localCoord = this.coordinateSystem.toLocalCoord.bind(this.coordinateSystem);
    this._edges = [
      new Edge(
        localCoord(this.coordinateSystem.topLeftVertexCoord),
        localCoord(this.coordinateSystem.topRightVertexCoord)
      ),
      new Edge(
        localCoord(this.coordinateSystem.topRightVertexCoord),
        localCoord(Coordinate(this.coordinateSystem.bottomRightVertexCoord.x, this.coordinateSystem.bottomRightVertexCoord.y * 0.75))
      ),
      new Edge(
        localCoord(Coordinate(this.coordinateSystem.bottomRightVertexCoord.x, this.coordinateSystem.bottomRightVertexCoord.y * 0.75)),
        localCoord(Coordinate(this.coordinateSystem.bottomRightVertexCoord.x * 0.75, this.coordinateSystem.bottomRightVertexCoord.y * 0.75))
      ),
      new Edge(
        localCoord(Coordinate(this.coordinateSystem.bottomRightVertexCoord.x * 0.75, this.coordinateSystem.bottomRightVertexCoord.y * 0.75)),
        localCoord(Coordinate(this.coordinateSystem.bottomRightVertexCoord.x * 0.75, this.coordinateSystem.bottomRightVertexCoord.y))
      ),
      new Edge(
        localCoord(Coordinate(this.coordinateSystem.bottomRightVertexCoord.x * 0.75, this.coordinateSystem.bottomRightVertexCoord.y)),
        localCoord(this.coordinateSystem.bottomLeftVertexCoord)
      ),
      // new Edge(
      //   Coordinate(this.coordinateSystem.topRightVertexCoord.x * 0.75, this.coordinateSystem.topRightVertexCoord.y),
      //   this.coordinateSystem.bottomLeftVertexCoord
      // ),
      new Edge(
        localCoord(this.coordinateSystem.bottomLeftVertexCoord),
        localCoord(this.coordinateSystem.topLeftVertexCoord)
      )
    ];
  }

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

    const startCoord = this.coordinateSystem.toGlobalCoord(this.edges[0].p1);
    ctx.moveTo(startCoord.x, startCoord.y);

    this.edges.forEach((edge: IEdge) => {
      const coord = this.coordinateSystem.toGlobalCoord(edge.p2);
      ctx.lineTo(coord.x, coord.y);
    });

    style(pathStyle);
    ctx.stroke();

    ctx.fillStyle = 'orange';
    // ctx.fill();

    ctx.restore();
  }
}