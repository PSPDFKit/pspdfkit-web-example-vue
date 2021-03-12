import Rect from './Rect';
declare const Inset_base: any;
export default class Inset extends Inset_base {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(args?: {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    });
    static applyToRect(inset: Inset, rect: Rect): Rect;
    static fromValue(insetValue: number): Inset;
}
export {};
