import TextMarkupAnnotation from './TextMarkupAnnotation';
import { TextMarkupAnnotationArgs } from './TextMarkupAnnotation';
export default class StrikeOutAnnotation extends TextMarkupAnnotation {
    static className: string;
    static readableName: string;
    static defaultValues: any;
    constructor(args?: TextMarkupAnnotationArgs);
}
