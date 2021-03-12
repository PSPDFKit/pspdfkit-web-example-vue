import Annotation from './Annotation';
import Color from '../Color';
import { ColorPreset } from '../Colors';
import { NoteIconType } from '../../enums/NoteIcon';
import { AnnotationCtorProps } from './Annotation';
export declare const defaultColorPresets: Array<ColorPreset>;
declare class NoteAnnotation extends Annotation {
    text: string;
    icon: NoteIconType;
    color: Color;
    static isEditable: boolean;
    static readableName: string;
    static defaultValues: any;
    constructor(args?: AnnotationCtorProps & {
        text?: string;
        icon?: string | NoteIconType;
        color?: Color;
    });
}
export default NoteAnnotation;
