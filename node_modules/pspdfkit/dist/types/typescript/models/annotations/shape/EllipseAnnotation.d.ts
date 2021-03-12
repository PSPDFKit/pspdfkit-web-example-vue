import ShapeAnnotation from '../ShapeAnnotation';
import { Inset } from '../../geometry';
import { ShapeAnnotationArgs } from '../ShapeAnnotation';
declare type EllipseCtorProps = ShapeAnnotationArgs & {
    cloudyBorderIntensity?: number | null | undefined;
    cloudyBorderInset?: Inset | null | undefined;
};
declare class EllipseAnnotation extends ShapeAnnotation {
    cloudyBorderIntensity: number | null | undefined;
    cloudyBorderInset: Inset | null | undefined;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: EllipseCtorProps);
}
export default EllipseAnnotation;
