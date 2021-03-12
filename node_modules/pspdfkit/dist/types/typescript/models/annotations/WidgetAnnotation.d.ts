import Annotation from './Annotation';
import Color from '../Color';
import { ActionTriggerEventType } from '../actions/Action';
import { BorderStyleType } from '../../enums/BorderStyle';
import { AnnotationCtorProps } from './Annotation';
import JavaScriptAction from '../actions/JavaScriptAction';
declare type FontSize = 'auto' | number;
export declare type WidgetActionTriggerEventType = ActionTriggerEventType | 'onFocus' | 'onBlur';
export declare type WidgetAnnotationAdditionalActionsType = {
    onFocus?: JavaScriptAction;
    onBlur?: JavaScriptAction;
    onFormat?: JavaScriptAction;
    onInput?: JavaScriptAction;
};
export declare type WidgetAnnotationArgs = AnnotationCtorProps & {
    formFieldName?: string | null | undefined;
    borderColor?: Color | null | undefined;
    borderStyle?: BorderStyleType | null | undefined;
    borderWidth?: number | null | undefined;
    backgroundColor?: Color | null | undefined;
    fontSize?: FontSize | null | undefined;
    font?: string | null | undefined;
    isBold?: boolean | null | undefined;
    isItalic?: boolean | null | undefined;
    horizontalAlign?: 'left' | 'center' | 'right' | null;
    verticalAlign?: 'top' | 'center' | 'bottom' | null;
    additionalActions?: WidgetAnnotationAdditionalActionsType | null | undefined;
    rotation?: number | null | undefined;
};
declare class WidgetAnnotation extends Annotation {
    formFieldName: string;
    borderColor: Color | null | undefined;
    borderStyle: BorderStyleType | null | undefined;
    borderWidth: number | null | undefined;
    backgroundColor: Color | null | undefined;
    fontSize: FontSize | null | undefined;
    font: string | null | undefined;
    isBold: boolean;
    isItalic: boolean;
    horizontalAlign: 'left' | 'center' | 'right' | null;
    verticalAlign: 'top' | 'center' | 'bottom' | null;
    additionalActions: WidgetAnnotationAdditionalActionsType | null | undefined;
    rotation: number;
    static defaultValues: any;
    constructor(args?: WidgetAnnotationArgs);
}
export default WidgetAnnotation;
