import TextMarkupAnnotation from './TextMarkupAnnotation';
import { BlendModeType } from '../../enums/BlendMode';
import { TextMarkupAnnotationArgs } from './TextMarkupAnnotation';
export default class HighlightAnnotation extends TextMarkupAnnotation {
    blendMode: BlendModeType;
    static className: string;
    static readableName: string;
    static defaultValues: any;
    constructor(args?: TextMarkupAnnotationArgs & {
        blendMode?: BlendModeType;
    });
}
