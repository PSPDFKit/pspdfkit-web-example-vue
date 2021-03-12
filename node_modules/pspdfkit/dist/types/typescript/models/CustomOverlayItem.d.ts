import { Point } from './geometry';
export declare type CustomOverlayItemID = string;
declare const CustomOverlayItem_base: any;
export default class CustomOverlayItem extends CustomOverlayItem_base {
    disableAutoZoom: boolean;
    id: CustomOverlayItemID;
    node: Node;
    noRotate: boolean;
    pageIndex: number;
    position: Point;
    onAppear: Function | null | undefined;
    onDisappear: Function | null | undefined;
    constructor(args: {
        disableAutoZoom?: boolean;
        id: CustomOverlayItemID;
        node: Node;
        noRotate?: boolean;
        pageIndex: number;
        position: Point;
        onAppear?: Function;
        onDisappear?: Function;
    });
}
export declare const validate: (item: CustomOverlayItem) => void;
export {};
