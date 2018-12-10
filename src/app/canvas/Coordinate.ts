export interface ICoordinate {
  x: number;
  y: number;
}

export const Coordinate = (x: number, y: number): ICoordinate => ({x, y});

//
// class CoordinatePool {
//   private coordinates: Array<ICoordinate>;
//
//   add(coord: ICoordinate) {
//
//   }
//
//   remove(coord: ICoordinate) {
//
//   }
//
//   forEach(proc: any) {
//     this.coordinates.forEach(proc);
//   }
// }