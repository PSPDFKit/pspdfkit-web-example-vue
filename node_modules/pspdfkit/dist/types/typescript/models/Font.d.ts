import { FontCallback } from './FontCallback';
declare const Font_base: any;
export default class Font extends Font_base {
    constructor(args: {
        name: string;
        callback: FontCallback;
    });
}
export declare const validate: (item: Font) => void;
export {};
