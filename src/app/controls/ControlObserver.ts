import { Direction } from "Control/Direction";
import { Observable } from "rxjs";


export interface ObserverConstructorArgs {
  direction$: Observable<Direction>;
  cutMode$: Observable<boolean>
}

export interface ControlObserver {
  readonly direction$: Observable<Direction>;
  readonly cutMode$: Observable<boolean>;
}

export function createControlObserver(observers: ObserverConstructorArgs): ControlObserver {
  class CtrlObserver implements ControlObserver {
    constructor(
      readonly direction$: Observable<Direction>,
      readonly cutMode$: Observable<boolean>
    ) {}
  }

  return new CtrlObserver(observers.direction$, observers.cutMode$);
}