import Point from './Point';
import { PointCtorProps } from './Point';
declare class DrawingPoint extends Point {
    intensity: number;
    static defaultValues: any;
    constructor(args?: PointCtorProps & {
        intensity?: number;
    });
}
export default DrawingPoint;
