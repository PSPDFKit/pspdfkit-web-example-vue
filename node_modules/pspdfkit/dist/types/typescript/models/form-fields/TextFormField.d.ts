import FormField from './FormField';
import { FormFieldInputAdditionalActionsType } from './FormField';
declare class TextFormField extends FormField {
    value: string;
    defaultValue: string;
    password: boolean;
    maxLength: number | null | undefined;
    doNotSpellCheck: boolean;
    doNotScroll: boolean;
    multiLine: boolean;
    comb: boolean;
    additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
    static defaultValues: any;
}
export default TextFormField;
