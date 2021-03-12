import { $Keys } from "../../utility-types/dist/index";
export declare const NoteIcon: {
    COMMENT: string;
    RIGHT_POINTER: string;
    RIGHT_ARROW: string;
    CHECK: string;
    CIRCLE: string;
    CROSS: string;
    INSERT: string;
    NEW_PARAGRAPH: string;
    NOTE: string;
    PARAGRAPH: string;
    HELP: string;
    STAR: string;
    KEY: string;
};
export declare type NoteIconType = $Keys<typeof NoteIcon>;
export declare const iconToString: {
    [x: string]: string;
};
export declare const stringToIcon: {
    [key: string]: string;
};
