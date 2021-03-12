import { Action } from '../actions';
import Annotation from './Annotation';
import { AnnotationCtorProps } from './Annotation';
declare class LinkAnnotation extends Annotation {
    action: Action;
    static readableName: string;
    constructor(args?: AnnotationCtorProps & {
        action?: Action | null | undefined;
    });
}
export default LinkAnnotation;
