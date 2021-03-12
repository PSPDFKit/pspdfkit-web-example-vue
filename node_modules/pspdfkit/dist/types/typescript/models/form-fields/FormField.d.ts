import { $Keys } from "../../../utility-types/dist/index";
import { InheritableImmutableRecord } from '../../lib/InheritableImmutableRecord';
import { List } from "../../../immutable/dist/immutable-nonambient";
import { ID } from '../annotations/Annotation';
import { FormFieldFlags } from '../../lib/Backend';
import Action from '../actions/Action';
export declare type FormFieldValue = null | string | List<string>;
export declare type FormFieldAdditionalActionsType = {
    onChange?: Action;
    onCalculate?: Action;
};
export declare type FormFieldEventTriggerType = $Keys<FormFieldAdditionalActionsType>;
export declare type FormFieldInputAdditionalActionsType = FormFieldAdditionalActionsType & {
    onInput?: Action;
    onFormat?: Action;
};
export declare type FormFieldInputEventTriggerType = $Keys<FormFieldInputAdditionalActionsType>;
export declare type FormFieldName = string;
export declare const formFieldFlags: FormFieldFlags;
declare class FormField extends InheritableImmutableRecord {
    id: ID;
    name: FormFieldName;
    pdfObjectId: number;
    annotationIds: List<string>;
    label: string;
    readOnly: boolean;
    required: boolean;
    noExport: boolean;
    additionalActions: any;
    group: string | void | null;
    isEditable: boolean | void;
    isFillable: boolean | void;
    isDeletable: boolean | void;
    canSetGroup: boolean | void;
    static defaultValues: any;
    constructor(args?: {
        id?: ID;
        pdfObjectId?: number;
        annotationIds?: List<string>;
        name?: FormFieldName;
        label?: string;
        readOnly?: boolean;
        required?: boolean;
        noExport?: boolean;
        additionalActions?: any;
        group?: string | null | undefined;
        isEditable?: boolean;
        isFillable?: boolean;
        isDeletable?: boolean;
        canSetGroup?: boolean;
        [key: string]: any;
    });
}
export default FormField;
export declare function validate(formField: FormField): any;
