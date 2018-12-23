import {Player} from "Object/ship/Player";



export function ControllablePlayer<T extends {new (...args: any[]):{}}>(player: T) {
  return class extends player {

  }
}