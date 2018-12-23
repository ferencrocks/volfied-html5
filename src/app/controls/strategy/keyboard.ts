import {fromEvent, merge, Observable, Subscriber} from 'rxjs';
import {filter, map, withLatestFrom, share} from 'rxjs/operators';

import {Direction} from "Control/Direction";
import {ObserverConstructorArgs} from "Control/ControlObserver";


const eventToDirection = (evt: KeyboardEvent): Direction => {
  switch (evt.key) {
    case 'ArrowUp':
      return Direction.up;

    case 'ArrowDown':
      return Direction.down;

    case 'ArrowLeft':
      return Direction.left;

    case 'ArrowRight':
      return Direction.right;

    default:
      throw new Error('Invalid event');
  }
};

export const keyDown$ = <Observable<KeyboardEvent>>fromEvent(document, 'keydown');
export const keyUp$ = <Observable<KeyboardEvent>>fromEvent(document, 'keyup');
export const key$: Observable<KeyboardEvent> = merge<KeyboardEvent, KeyboardEvent>(keyDown$, keyUp$);

const isKeyboardArrow = (evt:KeyboardEvent) => evt.key.indexOf('Arrow') === 0;

export const keyboardArrow$: Observable<Direction> =
  Observable.create((observer: Subscriber<Direction>) => {
    let timer: number | null = null;
    let lastDirection: Direction | null = null;

    const stopInterval = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    key$
      .pipe( filter(isKeyboardArrow) )
      .subscribe((keyEvt: KeyboardEvent) => {
        keyEvt.stopImmediatePropagation();
        keyEvt.preventDefault();

        const direction = eventToDirection(keyEvt);

        if (keyEvt.type === 'keydown') {
          if (direction !== lastDirection) {
            stopInterval();
            observer.next(direction);
            timer = setInterval(() => observer.next(direction), 10);
            lastDirection = direction;
          }
        }
        // Stop the interval if the last keydown is released
        else if (lastDirection === direction) {
          stopInterval();
          lastDirection = null;
        }
      });
  })
  .pipe( share() );

const isSpace = (evt:KeyboardEvent) => evt.key === ' ';
export const spaceDown$: Observable<boolean> = merge( keyDown$.pipe(filter(isSpace)), keyUp$.pipe(filter(isSpace)) )
  .pipe( map((event: KeyboardEvent) => event.type === 'keydown') );

export const observers: ObserverConstructorArgs = {
  direction$: keyboardArrow$,
  cutMode$: spaceDown$
};