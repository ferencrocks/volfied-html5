let canvas: HTMLCanvasElement | null;

export class Canvas {
  readonly canvas: HTMLCanvasElement;

  constructor(private canvasSelector: string) {
    this.canvas = this.getCanvas();
  }

  get context(): CanvasRenderingContext2D {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error("Failed to get the 2D context of the canvas");
    return ctx;
  }

  get height(): number {
    return this.canvas.clientHeight;
  }

  set height(h: number) {
    this.context.canvas.height = h;
  }

  get width(): number {
    return this.canvas.clientWidth;
  }

  set width(w: number) {
    this.context.canvas.width = w;
  }

  private getCanvas(): HTMLCanvasElement {
    canvas = <HTMLCanvasElement> document.querySelector(this.canvasSelector);
    if (!canvas) throw new Error("Invalid canvas selector");
    return canvas;
  }
}