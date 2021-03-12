declare const Color_base: any;
export default class Color extends Color_base {
    r: number;
    g: number;
    b: number;
    constructor(args?: {
        r?: number;
        g?: number;
        b?: number;
    });
    static BLACK: Color;
    static GREY: Color;
    static WHITE: Color;
    static DARK_BLUE: Color;
    static RED: Color;
    static PURPLE: Color;
    static PINK: Color;
    static GREEN: Color;
    static ORANGE: Color;
    static YELLOW: Color;
    static LIGHT_BLUE: Color;
    static LIGHT_RED: Color;
    static LIGHT_GREEN: Color;
    static LIGHT_YELLOW: Color;
    static BLUE: Color;
    lighter(percent: number): Color;
    darker(percent: number): Color;
    equals(color: Color | {
        r: number;
        g: number;
        b: number;
    }): boolean;
    saturate(percent: number): Color;
    sRGBToRGBComponent(RGBComponent: number): number;
    relativeLuminance(): number;
    contrastRatio(color: Color): number;
    toCSSValue(): string;
    toHex(): string;
}
export declare type ColorSet = {
    color: Color;
    backgroundColor: Color | null | undefined;
};
export {};
