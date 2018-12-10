//@ts-ignore
import Tween from '@tweenjs/tween.js';

import {IPosition, ObjectState, Position, Size, StageObject} from "../StageObject";
import {Canvas} from "Canvas";
import {Stage} from "Stage/Stage";
import {ControlObserver} from "Control/ControlObserver";
import {Direction, isHorizontalDirection, isVerticalDirection} from "Control/Direction";

import {createState, State} from '../../generic/State';
import {ICoordinate} from "Canvas/Coordinate";
import {IEdge} from "Canvas/Edge";

const X_MOVEMENT_UNITS = 40;
const Y_MOVEMENT_UNITS = 30;


interface PlayerState extends ObjectState {
  clipMode: boolean
}


export class Player implements StageObject
{
  constructor(readonly stage: Stage, readonly controlObserver: ControlObserver) {
    this.state = createState<PlayerState>({
      isMoving: false,
      position: Position(0, 0),
      velocity: 50,
      clipMode: false
    });

    this.observeClipMode();
    this.observeMovement();
  }

  size: Size = {
    height: 25,
    width: 25
  };

  state: State<PlayerState>;


  draw(canvas: Canvas, coord: ICoordinate) {
    const ctx = canvas.context;

    ctx.beginPath();
    ctx.arc(coord.x, coord.y,this.size.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  private get xMovementDist(): number {
    return this.stage.width / X_MOVEMENT_UNITS;
  }

  private get yMovementDist(): number {
    return this.stage.height/ Y_MOVEMENT_UNITS;
  }

  observeClipMode() {
    this.controlObserver.clipMode$.subscribe((clipMode) => {
      if (this.state.clipMode === clipMode) return;
      this.state.mutate({ clipMode });
      console.log(clipMode);
    })
  }

  observeMovement() {
    let lastDirection: Direction | null = null;
    let tween: any;

    const canMoveTo = (direction: Direction, edges: Array<IEdge>) => {
      const _canMoveTo = (direction: Direction, edge: IEdge) => {
        switch (direction) {
          case Direction.up:
            return this.state.position.y > edge.lowY;

          case Direction.down:
            return this.state.position.y < edge.highY;

          case Direction.left:
            return this.state.position.x > edge.lowX;

          case Direction.right:
            return this.state.position.x < edge.highX;
        }
      };
console.log(edges, this.state.position);
      if (edges.length === 1) {
        return _canMoveTo(direction, edges[0]);
      }
      else if (edges.length === 2) {
        return _canMoveTo(direction, edges[0]) || _canMoveTo(direction, edges[1]);
      }
      return false;
    };

    const animate = (dx: number, dy: number, edges: Array<IEdge>, direction: Direction) => {
      const destPos: IPosition = Position(
        this.state.position.x + dx * this.xMovementDist,
        this.state.position.y + dy * this.yMovementDist
      );

      if (isHorizontalDirection(direction)) {
        const horizEdge = <IEdge>edges.find(edge => edge.isHorizontal);
        if (destPos.x < horizEdge.lowX) destPos.x = horizEdge.lowX;
        if (destPos.x > horizEdge.highX) destPos.x = horizEdge.highX;
      }

      if (isVerticalDirection(direction)) {
        const vertEdge = <IEdge>edges.find(edge => edge.isVertical);
        if (destPos.y < vertEdge.lowY) destPos.y = vertEdge.lowY;
        if (destPos.y > vertEdge.highY) destPos.y = vertEdge.highY;
      }

      return new Tween.Tween(this.state.position)
        .to(destPos, this.state.velocity)
        .onStart(() => {
          this.state.mutate({isMoving: true});
        })
        .onComplete(() => {
          this.state.mutate({isMoving: false});
        })
        .onUpdate((tmpPos: IPosition) => {
          this.state.mutate({ position: tmpPos });
        })
        .start();
    };

    this.controlObserver.direction$.subscribe((direction: Direction) => {
      if (direction !== lastDirection) {
        if (tween) tween.stop();
      }
      else {
        if (this.state.isMoving) return;
      }

      const edges = <IEdge[]>this.stage.edges.filter((edge: IEdge) => {
        return edge.contains(this.state.position);
      });

      if (!canMoveTo(direction, edges)) return;
      switch (direction) {
        case Direction.right:
          tween = animate(1, 0, edges, direction);
          break;

        case Direction.left:
          tween = animate(-1, 0, edges, direction);
          break;

        case Direction.up:
          tween = animate(0, -1, edges, direction);
          break;

        case Direction.down:
          tween = animate(0, 1, edges, direction);
          break;
      }
      lastDirection = direction;
    });
  }
}