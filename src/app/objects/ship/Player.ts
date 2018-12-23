//@ts-ignore
import Tween from '@tweenjs/tween.js';

import {IPosition, ObjectState, Position, Size, StageObject} from "../StageObject";
import {Canvas} from "Canvas";
import {Stage} from "Stage/Stage";
import {ControlObserver} from "Control/ControlObserver";
import {Direction, isDirectionPerpendicularTo, isHorizontalDirection, isVerticalDirection} from "Control/Direction";

import {createState, State} from '../../generic/State';
import {ICoordinate} from "Canvas/Coordinate";
import {IEdge} from "Canvas/Edge";

const X_MOVEMENT_UNITS = 40;
const Y_MOVEMENT_UNITS = 30;


interface PlayerState extends ObjectState {
  cutMode: boolean,
  direction: Direction
}


export class Player implements StageObject
{
  constructor(readonly stage: Stage, readonly controlObserver: ControlObserver) {
    this.state = createState<PlayerState>({
      direction: Direction.up,
      isMoving: false,
      position: Position(0, 0),
      velocity: 50,
      cutMode: false
    });

    this.currentEdges = this.findCurrentEdges();
    this.observeClipMode();
    this.observeMovement();
  }

  size: Size = {
    height: 25,
    width: 25
  };

  state: State<PlayerState>;

  currentEdges: IEdge[];

  /**
   * @return {IEdge[]} One or two edges on which the object stays
   */
  protected findCurrentEdges(): IEdge[] {
    const edges = <IEdge[]>this.stage.edges.filter((edge: IEdge) => {
      return edge.contains(this.state.position);
    });
    return edges;
  }

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
    this.controlObserver.cutMode$.subscribe((cutMode) => {
      if (this.state.cutMode === cutMode) return;
      this.state.mutate({ cutMode });
    })
  }

  canMoveTo(direction: Direction): boolean {
    if (this.state.cutMode) {
      return false;
    }

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

    const edges = this.currentEdges;
    if (edges.length === 1) {
      return _canMoveTo(direction, edges[0]);
    }
    else if (edges.length === 2) {
      return _canMoveTo(direction, edges[0]) || _canMoveTo(direction, edges[1]);
    }
    return false;
  }

  move(dx: number, dy: number) {
    // The destination position
    const destPos: IPosition = Position(
      this.state.position.x + dx * this.xMovementDist,
      this.state.position.y + dy * this.yMovementDist
    );

    /* The player can move only until one of the 2 endpoints of the current Edge. These blocks are fixing the
     * destination position, if the destination point goes over one of these endpoints. */
    if (isHorizontalDirection(this.state.direction)) {
      const horizEdge = this.currentEdges.find(edge => edge.isHorizontal);
      if (!horizEdge) return;

      if (destPos.x < horizEdge.lowX) destPos.x = horizEdge.lowX;
      if (destPos.x > horizEdge.highX) destPos.x = horizEdge.highX;
    }
    if (isVerticalDirection(this.state.direction)) {
      const vertEdge = this.currentEdges.find(edge => edge.isVertical);
      if (!vertEdge) return;

      if (destPos.y < vertEdge.lowY) destPos.y = vertEdge.lowY;
      if (destPos.y > vertEdge.highY) destPos.y = vertEdge.highY;
    }
console.log('MOVE');
    // Tweening the subsequent animation frames of the object, while updating states at every frame.
    return new Tween.Tween(this.state.position)
      .to(destPos, this.state.velocity)
      .onStart(() => {
        this.state.mutate({isMoving: true});
      })
      .onComplete(() => {
        this.state.mutate({isMoving: false});
        this.currentEdges = this.findCurrentEdges();
      })
      .onStop(() => {
        this.currentEdges = this.findCurrentEdges();
      })
      .onUpdate((tmpPos: IPosition) => {
        this.state.mutate({ position: tmpPos });
      })
      .start();
  }

  observeMovement() {
    let lastDirection: Direction | null = null;
    let tween: any;

    // Listening to the control inputs
    this.controlObserver.direction$.subscribe((direction: Direction) => {
      if (!this.canMoveTo(direction)) return;

      if (direction !== lastDirection) {
        this.state.mutate({ direction });
        // Stopping the current tween, if the direction is changed
        if (tween) tween.stop();
      }
      else {
        // Do not start other tween if the object is still moving
        if (this.state.isMoving) return;
      }

      switch (direction) {
        case Direction.right:
          tween = this.move(1, 0);
          break;

        case Direction.left:
          tween = this.move(-1, 0);
          break;

        case Direction.up:
          tween = this.move(0, -1);
          break;

        case Direction.down:
          tween = this.move(0, 1);
          break;
      }
      lastDirection = direction;
    });
  }
}