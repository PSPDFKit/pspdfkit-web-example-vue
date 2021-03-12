import ShapeAnnotation from '../ShapeAnnotation';
import { Point } from '../../geometry/index';
import { List } from "../../../../immutable/dist/immutable-nonambient";
import { LineCapsType as LineCaps } from '../../../enums/LineCap';
import { ShapeAnnotationArgs } from '../ShapeAnnotation';
declare class PolylineAnnotation extends ShapeAnnotation {
    points: List<Point>;
    lineCaps: LineCaps | null | undefined;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: ShapeAnnotationArgs & {
        points?: List<Point> | null | undefined;
        lineCaps?: LineCaps | null | undefined;
    });
}
export default PolylineAnnotation;
