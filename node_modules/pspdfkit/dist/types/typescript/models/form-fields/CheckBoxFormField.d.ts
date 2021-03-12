import { List } from "../../../immutable/dist/immutable-nonambient";
import FormField from './FormField';
import FormOption from '../FormOption';
declare class CheckBoxFormField extends FormField {
    values: List<string>;
    defaultValues: List<string>;
    options: List<FormOption>;
    static defaultValues: any;
}
export default CheckBoxFormField;
