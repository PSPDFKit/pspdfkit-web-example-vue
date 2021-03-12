import { $Keys } from "../../../utility-types/dist/index";
import { SignatureInfo } from './SignatureInfo';
declare const _default: {};
export default _default;
export declare type SignaturesInfo = {
    status: DocumentValidationStatusType;
    checkedAt: Date;
    signatures?: Array<SignatureInfo>;
    documentModifiedSinceSignature?: boolean;
};
export declare const DocumentValidationStatus: {
    valid: string;
    warning: string;
    error: string;
    not_signed: string;
};
export declare type DocumentValidationStatusType = $Keys<typeof DocumentValidationStatus>;
