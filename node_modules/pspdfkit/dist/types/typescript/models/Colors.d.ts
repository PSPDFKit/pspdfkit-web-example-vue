import Color from './Color';
export declare type AvailableColor = {
    id: string;
    color: Color;
} | {
    id: 'none';
    color: null;
};
export declare type ColorPreset = {
    color: Color | null;
    localization: {
        id: string;
        defaultMessage?: string;
        description?: string;
    };
};
declare const Colors: Array<ColorPreset>;
export default Colors;
