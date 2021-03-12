import { InheritableImmutableRecord } from '../../lib/InheritableImmutableRecord';
import TransformationMatrix from './TransformationMatrix';
export declare type PointCtorProps = {
    x?: number;
    y?: number;
};
declare class Point extends InheritableImmutableRecord {
    x: number;
    y: number;
    static defaultValues: any;
    constructor(args?: PointCtorProps);
    scale(sx: number, sy?: number): Point;
    translate({ x: tx, y: ty }: Point): Point;
    translateX(tx: number): Point;
    translateY(ty: number): Point;
    distance(other: Point): number;
    rotate(deg: number): Point;
    apply(matrix: TransformationMatrix): Point;
}
export default Point;
