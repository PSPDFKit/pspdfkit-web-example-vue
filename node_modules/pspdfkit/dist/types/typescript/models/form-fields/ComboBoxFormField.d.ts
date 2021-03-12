import ChoiceFormField from './ChoiceFormField';
declare class ComboBoxFormField extends ChoiceFormField {
    edit: boolean;
    doNotSpellCheck: boolean;
    static defaultValues: any;
}
export default ComboBoxFormField;
