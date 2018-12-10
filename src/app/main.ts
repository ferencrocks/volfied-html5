//@ts-ignore
import Tween from '@tweenjs/tween.js';

import { Canvas } from "Canvas";
import { Player } from "Object/ship/Player";

import Stage01 from 'Stage/01/Stage01';
import { createStageObjectPosition } from 'Object/StageObjectPositioner';

import {ControlObserver, createControlObserver} from "Control/ControlObserver";
import { observers } from "Control/strategy/keyboard";
import {CoordinateSystem} from "Canvas/CoordinateSystem";
import {Coordinate} from "Canvas/Coordinate";


export function init() {
  const canvas = new Canvas('#rootCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const controlObserver: ControlObserver = createControlObserver(observers);

  const stageCoordSys = new CoordinateSystem(
    Coordinate(20, 20),
    Coordinate(canvas.width - 20, canvas.height - 20)
  );

  const stage = new Stage01(canvas, stageCoordSys, createStageObjectPosition);

  const player = new Player(stage, controlObserver);

  stage.mount(player);

  const drawStage = (time: number) => {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height);

    stage.draw();
    window.requestAnimationFrame(drawStage);
    Tween.update(time);
  };
  drawStage(0);
}