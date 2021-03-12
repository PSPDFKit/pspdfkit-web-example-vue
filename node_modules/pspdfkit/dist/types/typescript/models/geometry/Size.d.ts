import TransformationMatrix from './TransformationMatrix';
declare const Size_base: any;
export default class Size extends Size_base {
    width: number;
    height: number;
    constructor(args?: {
        width?: number;
        height?: number;
    });
    scale(factor: number): Size;
    ceil(): Size;
    floor(): Size;
    apply(matrix: TransformationMatrix): Size;
}
export {};
