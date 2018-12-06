//@ts-ignore
import Tween from '@tweenjs/tween.js';

import {Position, Size, StageObject, ObjectState} from "../StageObject";
import {Canvas} from "Canvas";
import {Stage} from "Stage/Stage";
import {ControlObserver} from "Control/ControlObserver";
import {Direction} from "Control/Direction";

export class Player implements StageObject
{
  constructor(readonly stage: Stage, readonly controlObserver: ControlObserver) {
    this.observeMovement();
  }

  position: Position = {
    x: 0,
    y: 0
  };

  size: Size = {
    height: 25,
    width: 25
  };

  state: ObjectState = {
    velocity: 150,
    isMoving: false
  };

  draw(canvas: Canvas) {
    const ctx = canvas.context;

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  observeMovement() {
    let lastDirection: Direction | null = null;
    let tween: any;

    const animate = (dx: number, dy: number) => new Tween.Tween(this.position)
      .to({
        x: this.position.x + dx * this.stage.xUnit,
        y: this.position.y + dy * this.stage.yUnit
      }, this.state.velocity)
      .onStart(() => {
        this.state.isMoving = true;
      })
      .onComplete(() => {
        this.state.isMoving = false;
        tween = null;
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