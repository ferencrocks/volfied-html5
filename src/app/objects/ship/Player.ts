//@ts-ignore
import Tween from '@tweenjs/tween.js';

import {ObjectState, Size, StageObject, ObjectPosition} from "../StageObject";
import {Canvas} from "Canvas";
import {Stage} from "Stage/Stage";
import {ControlObserver} from "Control/ControlObserver";
import {Direction} from "Control/Direction";

import {State, createState} from '../../generic/State';
import {HorizPosition, VertPosition} from "Object/StageObjectPositioner";


export class Player implements StageObject
{
  constructor(readonly stage: Stage, readonly controlObserver: ControlObserver) {
    this.state = createState<ObjectState>({
      isMoving: false,
      position: this.stage.positioner(this, [HorizPosition.center, VertPosition.bottom]),
      velocity: 150
    });

    this.observeMovement();
  }

  size: Size = {
    height: 25,
    width: 25
  };

  state: State<ObjectState>;


  draw(canvas: Canvas) {
    const ctx = canvas.context;

    ctx.beginPath();
    ctx.arc(this.state.position.x, this.state.position.y, this.size.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  observeMovement() {
    let lastDirection: Direction | null = null;
    let tween: any;

    const animate = (dx: number, dy: number) => new Tween.Tween(this.state.position)
      .to({
        x: this.state.position.x + dx * this.stage.xUnit,
        y: this.state.position.y + dy * this.stage.yUnit
      }, this.state.velocity)
      .onStart(() => {
        this.state.mutate({ isMoving: true });
      })
      .onComplete(() => {
        this.state.mutate({ isMoving: false });
      })
      .onUpdate((tmpPos: ObjectPosition) => {
        this.state.mutate({
          position: { x: tmpPos.x, y: tmpPos.y }
        });
      })
      .start();

    this.controlObserver.direction$.subscribe((direction: Direction) => {
      if (direction !== lastDirection) {
        if (tween) tween.stop();
      }
      else {
        if (this.state.isMoving) return;
      }

      switch (direction) {
        case Direction.right:
          tween = animate(1, 0);
          break;

        case Direction.left:
          tween = animate(-1, 0);
          break;

        case Direction.up:
          tween = animate(0, -1);
          break;

        case Direction.down:
          tween = animate(0, 1);
          break;
      }
      lastDirection = direction;
    });
  }
}