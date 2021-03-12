import { $Keys } from "../../utility-types/dist/index";
export declare const BlendMode: {
    normal: string;
    multiply: string;
    screen: string;
    overlay: string;
    darken: string;
    lighten: string;
    colorDodge: string;
    colorBurn: string;
    hardLight: string;
    softLight: string;
    difference: string;
    exclusion: string;
};
export declare type BlendModeType = $Keys<typeof BlendMode>;
