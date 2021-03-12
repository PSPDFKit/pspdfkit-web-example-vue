import ChoiceFormField from './ChoiceFormField';
import { FormFieldInputAdditionalActionsType } from './FormField';
declare class ListBoxFormField extends ChoiceFormField {
    additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
}
export default ListBoxFormField;
