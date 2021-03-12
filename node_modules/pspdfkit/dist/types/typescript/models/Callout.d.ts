import { InheritableImmutableRecord } from '../lib/InheritableImmutableRecord';
import { LineCapType } from '../enums/LineCap';
import { Point, Inset } from './geometry';
declare class Callout extends InheritableImmutableRecord {
    start: Point;
    knee: Point | null | undefined;
    end: Point;
    cap: LineCapType | null | undefined;
    innerRectInset: Inset;
    static defaultValues: any;
}
export default Callout;
