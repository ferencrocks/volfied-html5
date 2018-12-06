import { Direction } from "Control/Direction";
import { Observable } from "rxjs";


export interface ObserverConstructorArgs {
  direction$: Observable<Direction>;
}

export interface ControlObserver {
  readonly direction$: Observable<Direction>;
}

export function createControlObserver(observers: ObserverConstructorArgs): ControlObserver {
  class CtrlObserver implements ControlObserver {
    constructor(
      readonly direction$: Observable<Direction>
    ) {}
  }

  return new CtrlObserver(observers.direction$);
}