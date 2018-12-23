export enum Direction {
  up = "UP",
  down = "DOWN",
  left = "LEFT",
  right = "RIGHT"
}

export function isHorizontalDirection(direction: Direction): boolean {
  return direction === Direction.left || direction === Direction.right;
}

export function isVerticalDirection(direction: Direction): boolean {
  return direction === Direction.up || direction === Direction.down;
}

export function isDirectionPerpendicularTo(direction: Direction, to: Direction): boolean {
  return isHorizontalDirection(direction)
    ? isVerticalDirection(to)
    : isHorizontalDirection(to);
}