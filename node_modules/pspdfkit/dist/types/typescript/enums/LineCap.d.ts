import { $Keys } from "../../utility-types/dist/index";
export declare const LineCap: {
    square: string;
    circle: string;
    diamond: string;
    openArrow: string;
    closedArrow: string;
    butt: string;
    reverseOpenArrow: string;
    reverseClosedArrow: string;
    slash: string;
};
export declare const LineCapValues: Array<string>;
export declare type LineCapType = $Keys<typeof LineCap>;
export declare type LineCapsType = {
    start?: LineCapType | null | undefined;
    end?: LineCapType | null | undefined;
};
