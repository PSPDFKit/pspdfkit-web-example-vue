import { $Keys } from "../../../utility-types/dist/index";
import Annotation from './Annotation';
import Color from '../Color';
import { AnnotationCtorProps } from './Annotation';
declare type StampKind = 'Approved' | 'NotApproved' | 'Draft' | 'Final' | 'Completed' | 'Confidential' | 'ForPublicRelease' | 'NotForPublicRelease' | 'ForComment' | 'Void' | 'PreliminaryResults' | 'InformationOnly' | 'Rejected' | 'Accepted' | 'InitialHere' | 'SignHere' | 'Witness' | 'AsIs' | 'Departmental' | 'Experimental' | 'Expired' | 'Sold' | 'TopSecret' | 'Revised' | 'RejectedWithText' | 'Custom';
export declare type StampKindProperties = {
    includeDate?: boolean;
    includeTime?: boolean;
    color?: Color;
};
export declare const allowedTypes: {
    [key: string]: StampKindProperties;
};
export declare const predefinedToStandardMap: {
    [key: string]: string;
};
export declare const getMappedStampType: (stampType: $Keys<typeof allowedTypes>) => string;
declare class StampAnnotation extends Annotation {
    stampType: StampKind;
    title: string | null | undefined;
    subtitle: string | null | undefined;
    color: Color | null | undefined;
    static defaultValues: any;
    static readableName: string;
    constructor(args?: AnnotationCtorProps & {
        stampType?: (string | StampKind) | null | undefined;
        title?: string | null | undefined;
        subtitle?: string | null | undefined;
        color?: Color | null | undefined;
    });
}
export default StampAnnotation;
