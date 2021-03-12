import { Record, List, Set, OrderedSet } from "../../immutable/dist/immutable-nonambient";
import { Size } from './geometry';
import TextLine from './TextLine';
import { ID } from './annotations/Annotation';
import { CustomOverlayItemID } from './CustomOverlayItem';
export declare type TextLineScales = Map<number, {
    scaleX: number;
    scaleY: number;
}> | null | undefined;
declare const Page_base: Record.Factory<{
    pageSize: Size;
    pageIndex: number;
    pageLabel: string;
    rotation: number;
    inViewport: boolean;
    textLines: any;
    textLineScales: any;
    annotationIds: OrderedSet<any>;
    customOverlayItemIds: Set<any>;
}>;
export default class Page extends Page_base {
    pageSize: Size;
    pageIndex: number;
    pageLabel: string;
    rotation: 0 | 1 | 2 | 3;
    inViewport: boolean;
    textLines: List<TextLine> | null | undefined;
    textLineScales: TextLineScales;
    annotationIds: OrderedSet<ID>;
    customOverlayItemIds: Set<CustomOverlayItemID>;
}
export {};
