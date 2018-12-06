//@ts-ignore
import Tween from '@tweenjs/tween.js';

import { keyDown$, arrowWithSpaceDown$ } from "./controls/strategy/keyboard";

import { Canvas } from "Canvas";
import { Player } from "Object/ship/Player";

import Stage01 from 'Stage/01/Stage01';
import { createStageObjectPosition } from 'Object/StageObjectPositioner';

import {ControlObserver, createControlObserver} from "Control/ControlObserver";
import { observers } from "Control/strategy/keyboard";


export function init() {
  const canvas = new Canvas('#rootCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const controlObserver: ControlObserver = createControlObserver(observers);

  const stage = new Stage01(canvas, createStageObjectPosition);

  const player = new Player(stage, controlObserver);

  stage.mount(player);

  const drawStage = (time: number) => {
    stage.draw();
    window.requestAnimationFrame(drawStage);
    Tween.update(time);
  };
  drawStage(0);
}