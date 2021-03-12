import Annotation from './Annotation';
import Color from '../Color';
import { AnnotationCtorProps } from './Annotation';
export declare type ShapeAnnotationArgs = AnnotationCtorProps & {
    strokeDashArray?: [number, number] | null | undefined;
    strokeWidth?: number | null | undefined;
    strokeColor?: Color | null | undefined;
    fillColor?: Color | null | undefined;
};
declare class ShapeAnnotation extends Annotation {
    strokeDashArray: [number, number] | null | undefined;
    strokeWidth: number;
    strokeColor: Color | null | undefined;
    fillColor: Color | null | undefined;
    static defaultValues: any;
    constructor(args?: ShapeAnnotationArgs);
}
export default ShapeAnnotation;
