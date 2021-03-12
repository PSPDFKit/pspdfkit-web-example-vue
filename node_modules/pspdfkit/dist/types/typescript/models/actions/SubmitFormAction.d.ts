import { List } from "../../../immutable/dist/immutable-nonambient";
import Action from './Action';
declare class SubmitFormAction extends Action {
    uri: string;
    fields: List<string> | null | undefined;
    includeExclude: boolean;
    includeNoValueFields: boolean;
    exportFormat: boolean;
    getMethod: boolean;
    submitCoordinated: boolean;
    xfdf: boolean;
    includeAppendSaves: boolean;
    includeAnnotations: boolean;
    submitPDF: boolean;
    canonicalFormat: boolean;
    excludeNonUserAnnotations: boolean;
    excludeFKey: boolean;
    embedForm: boolean;
    static defaultValues: any;
    constructor(args?: {
        uri?: string;
        fields?: List<string>;
        includeExclude?: boolean;
        includeNoValueFields?: boolean;
        exportFormat?: boolean;
        getMethod?: boolean;
        submitCoordinated?: boolean;
        xfdf?: boolean;
        includeAppendSaves?: boolean;
        includeAnnotations?: boolean;
        submitPDF?: boolean;
        canonicalFormat?: boolean;
        excludeNonUserAnnotations?: boolean;
        excludeFKey?: boolean;
        embedForm?: boolean;
    });
}
export default SubmitFormAction;
