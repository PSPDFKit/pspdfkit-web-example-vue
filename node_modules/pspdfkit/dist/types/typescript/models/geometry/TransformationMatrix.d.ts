import { InheritableImmutableRecord } from '../../lib/InheritableImmutableRecord';
declare class TransformationMatrix extends InheritableImmutableRecord {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    static defaultValues: any;
    static IDENTITY: TransformationMatrix;
    translate({ x: tx, y: ty }: {
        x: number;
        y: number;
    }): TransformationMatrix;
    translateX(tx: number): TransformationMatrix;
    translateY(ty: number): TransformationMatrix;
    scale(sx: number, sy?: number): TransformationMatrix;
    transform(a2: number, b2: number, c2: number, d2: number, e2: number, f2: number): TransformationMatrix;
    rotate(degCW: number): TransformationMatrix;
    inverse(): TransformationMatrix;
    toCssValue(): string;
    applyToVector([x, y]: [number, number]): [number, number];
    applyToSize([x, y]: [number, number]): [number, number];
}
export default TransformationMatrix;
