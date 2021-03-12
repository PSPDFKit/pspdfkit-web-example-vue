import { List } from "../../../immutable/dist/immutable-nonambient";
import FormField from './FormField';
import FormOption from '../FormOption';
declare class RadioButtonFormField extends FormField {
    noToggleToOff: boolean;
    radiosInUnison: boolean;
    value: string;
    defaultValue: string;
    options: List<FormOption>;
    static defaultValues: any;
}
export default RadioButtonFormField;
