import { List } from "../../../immutable/dist/immutable-nonambient";
import FormOption from '../FormOption';
import FormField from './FormField';
declare class ChoiceFormField extends FormField {
    options: List<FormOption>;
    values: List<string>;
    defaultValues: List<string>;
    multiSelect: boolean;
    commitOnChange: boolean;
    additionalActions: any | null | undefined;
    static defaultValues: any;
}
export default ChoiceFormField;
