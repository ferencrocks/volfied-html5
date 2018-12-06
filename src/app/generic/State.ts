import { Observable, Observer } from "rxjs";

type StringKeyedObject = {[key: string]: any};

export interface State<T> extends StringKeyedObject{
  getState(): T;
  getStateByKey(key: string): any;
  mutate(newState: Partial<T>): State<T>;
  readonly mutation$: Observable<T>;
}

class StateManager<T extends StringKeyedObject> implements State<T> {
  readonly mutation$: Observable<T>;
  private mutationObserver: Observer<T> | undefined;
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;

    this.mutation$ = Observable.create((observer: Observer<T>) => {
      this.mutationObserver = observer;
    });
  }

  getState(): T {
    return Object.assign({}, this.state);
  }

  getStateByKey(key: string): any {
    return this.state[key];
  }

  mutate(newState: Partial<T>): State<T> {
    this.state = Object.assign(this.state, newState);

    if (this.mutationObserver) {
      this.mutationObserver.next(this.state);
    }
    return this;
  }
}

export function createState<T>(initialState: T): State<T> {
  return new Proxy(new StateManager(initialState), {
    get(target, property: string): any {
      switch (property) {
        case "getState":
          return target.getState.bind(target);

        case "mutate":
          return target.mutate.bind(target);

        case "mutation$":
          return target.mutation$;

        default:
          return target.getStateByKey(property);
      }
    },

    set(target, property): boolean {
      throw new Error("State properties can't be changed directly");
      return false;
    }
  });
}