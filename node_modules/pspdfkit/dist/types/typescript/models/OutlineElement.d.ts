import { List } from "../../immutable/dist/immutable-nonambient";
import { Record } from "../../immutable/dist/immutable-nonambient";
import Action from './actions/Action';
import Color from './actions/Action';
export declare type OutlineElementProps = {
    children: List<OutlineElement>;
    title: string;
    color: Color | null | undefined;
    isBold: boolean;
    isItalic: boolean;
    isExpanded: boolean;
    action: Action | null | undefined;
};
declare const OutlineElement_base: Record.Factory<{
    children: List<any>;
    title: string;
    color: any;
    isBold: boolean;
    isItalic: boolean;
    isExpanded: boolean;
    action: any;
}>;
export default class OutlineElement extends OutlineElement_base {
    children: List<OutlineElement>;
    title: string;
    color: Color | null | undefined;
    isBold: boolean;
    isItalic: boolean;
    isExpanded: boolean;
    action: Action | null | undefined;
}
export {};
