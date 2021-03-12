import { List } from "../../../immutable/dist/immutable-nonambient";
import Annotation from './Annotation';
import Color from '../Color';
import { DrawingPoint } from '../geometry';
import { BlendModeType } from '../../enums/BlendMode';
import { AnnotationCtorProps } from './Annotation';
declare class InkAnnotation extends Annotation {
    lines: List<List<DrawingPoint>>;
    lineWidth: number;
    strokeColor: Color | null | undefined;
    backgroundColor: Color | null | undefined;
    isDrawnNaturally: boolean;
    isSignature: boolean;
    blendMode: BlendModeType;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: AnnotationCtorProps & {
        lines?: List<List<DrawingPoint>>;
        lineWidth?: number | null | undefined;
        strokeColor?: Color | null | undefined;
        backgroundColor?: Color | null | undefined;
        isDrawnNaturally?: boolean;
        isSignature?: boolean;
        blendMode?: BlendModeType | null | undefined;
    });
}
export default InkAnnotation;
