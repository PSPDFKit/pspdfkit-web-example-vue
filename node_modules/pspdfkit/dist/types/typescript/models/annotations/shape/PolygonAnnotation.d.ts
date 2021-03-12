import ShapeAnnotation from '../ShapeAnnotation';
import { Point } from '../../geometry/index';
import { List } from "../../../../immutable/dist/immutable-nonambient";
import { ShapeAnnotationArgs } from '../ShapeAnnotation';
declare class PolygonAnnotation extends ShapeAnnotation {
    points: List<Point>;
    cloudyBorderIntensity: number | null | undefined;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: ShapeAnnotationArgs & {
        points?: List<Point> | null | undefined;
        cloudyBorderIntensity?: number | null | undefined;
    });
}
export default PolygonAnnotation;
