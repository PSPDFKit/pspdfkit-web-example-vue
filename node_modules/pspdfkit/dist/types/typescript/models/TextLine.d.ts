import { Rect } from './geometry';
declare const TextLine_base: any;
export default class TextLine extends TextLine_base {
    id: number;
    pageIndex: number;
    boundingBox: Rect;
    contents: string;
}
export {};
