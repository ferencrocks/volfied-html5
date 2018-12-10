//@ts-ignore
import Tween from '@tweenjs/tween.js';

import {ObjectState, Size, StageObject, Position, IPosition} from "../StageObject";
import {Canvas} from "Canvas";
import {Stage} from "Stage/Stage";
import {ControlObserver} from "Control/ControlObserver";
import {Direction} from "Control/Direction";

import {State, createState} from '../../generic/State';
import {HorizPosition, VertPosition} from "Object/StageObjectPositioner";
import {Coordinate, ICoordinate} from "Canvas/Coordinate";

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
      velocity: 150,
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

    const animate = (dx: number, dy: number) => {
      const destPos: IPosition = Position(
        Math.round(this.state.position.x + dx * this.xMovementDist),
        Math.round(this.state.position.y + dy * this.yMovementDist)
      );

      if (destPos.x < 0) destPos.x = 0;
      if (destPos.y < 0) destPos.y = 0;
      if (destPos.x > this.stage.width) destPos.x = this.stage.width;
      if (destPos.y > this.stage.height) destPos.y = this.stage.height;

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
// console.log(this.state.position);
      switch (direction) {
        case Direction.right:
          if (this.state.position.y > 0 && this.state.position.y < this.stage.height) return;
          tween = animate(1, 0);
          break;

        case Direction.left:
          if (this.state.position.y > 0 && this.state.position.y < this.stage.height) return;
          tween = animate(-1, 0);
          break;

        case Direction.up:
          if (this.state.position.x > 0 && this.state.position.x < this.stage.width) return;
          tween = animate(0, -1);
          break;

        case Direction.down:
          if (this.state.position.x > 0 && this.state.position.x < this.stage.width) return;
          tween = animate(0, 1);
          break;
      }
      lastDirection = direction;
    });
  }
}