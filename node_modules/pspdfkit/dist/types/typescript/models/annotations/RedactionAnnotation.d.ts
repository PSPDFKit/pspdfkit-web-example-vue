import TextMarkupAnnotation from './TextMarkupAnnotation';
import Color from '../Color';
import { TextMarkupAnnotationArgs } from './TextMarkupAnnotation';
export default class RedactionAnnotation extends TextMarkupAnnotation {
    fillColor: Color | null | undefined;
    overlayText: string | null | undefined;
    repeatOverlayText: boolean | null | undefined;
    outlineColor: Color | null | undefined;
    static readableName: string;
    static defaultValues: any;
    constructor(args?: TextMarkupAnnotationArgs & {
        fillColor?: Color;
        overlayText?: string;
        repeatOverlayText?: boolean;
        outlineColor?: Color;
    });
}
