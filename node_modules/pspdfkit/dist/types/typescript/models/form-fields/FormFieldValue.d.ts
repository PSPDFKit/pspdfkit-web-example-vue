import { InheritableImmutableRecord } from '../../lib/InheritableImmutableRecord';
import { List } from "../../../immutable/dist/immutable-nonambient";
declare class FormFieldValue extends InheritableImmutableRecord {
    name: string;
    value: string | List<string> | null;
    static defaultValues: any;
}
export default FormFieldValue;
export declare function getFormFieldValueID(formFieldValue: FormFieldValue): string;
