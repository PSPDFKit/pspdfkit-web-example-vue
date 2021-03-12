import ShapeAnnotation from '../ShapeAnnotation';
import { Point } from '../../geometry/index';
import { LineCapsType as LineCaps } from '../../../enums/LineCap';
import { ShapeAnnotationArgs } from '../ShapeAnnotation';
declare class LineAnnotation extends ShapeAnnotation {
    startPoint: Point;
    endPoint: Point;
    lineCaps: LineCaps | null | undefined;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: ShapeAnnotationArgs & {
        startPoint?: Point | null | undefined;
        endPoint?: Point | null | undefined;
        lineCaps?: LineCaps | null | undefined;
    });
}
export default LineAnnotation;
