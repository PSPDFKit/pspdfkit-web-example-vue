import ShapeAnnotation from '../ShapeAnnotation';
import { Inset } from '../../geometry';
import { ShapeAnnotationArgs } from '../ShapeAnnotation';
declare type RectangleCtorProps = ShapeAnnotationArgs & {
    cloudyBorderIntensity?: number | null | undefined;
    cloudyBorderInset?: Inset | null | undefined;
};
declare class RectangleAnnotation extends ShapeAnnotation {
    cloudyBorderIntensity: number | null | undefined;
    cloudyBorderInset: Inset | null | undefined;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: RectangleCtorProps);
}
export default RectangleAnnotation;
