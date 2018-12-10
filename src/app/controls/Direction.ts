export enum Direction {
  up = "UP",
  down = "DOWN",
  left = "LEFT",
  right = "RIGHT"
}

export function isHorizontalDirection(direction: Direction) {
  return direction === Direction.left || direction === Direction.right;
}

export function isVerticalDirection(direction: Direction) {
  return direction === Direction.up || direction === Direction.down;
}