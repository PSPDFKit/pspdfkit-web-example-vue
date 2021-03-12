import { List } from "../../../immutable/dist/immutable-nonambient";
import Action from './Action';
declare type AnnotationReference = {
    fieldName: string;
} | {
    pdfObjectId: number;
};
declare class HideAction extends Action {
    hide: boolean;
    annotationReferences: List<AnnotationReference>;
    static defaultValues: any;
    constructor(args?: {
        hide?: boolean;
        annotationReferences?: List<AnnotationReference>;
    });
}
export default HideAction;
