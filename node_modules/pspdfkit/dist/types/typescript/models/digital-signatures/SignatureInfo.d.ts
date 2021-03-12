import { $Keys } from "../../../utility-types/dist/index";
declare const _default: {};
export default _default;
export declare type SignatureInfo = {
    type: 'pspdfkit/signature-info';
    signerName: string | null | undefined;
    creationDate: Date | null | undefined;
    signatureReason: string | null | undefined;
    signatureLocation: string | null | undefined;
    documentIntegrityStatus: DocumentIntegrityStatusType;
    certificateChainValidationStatus: CertificateChainValidationStatusType;
    signatureValidationStatus: SignatureValidationStatusType;
    isTrusted: boolean;
    isSelfSigned: boolean;
    isExpired: boolean;
    documentModifiedSinceSignature: boolean;
    signatureFormFQN: string;
};
export declare const DocumentIntegrityStatus: {
    ok: string;
    tampered_document: string;
    failed_to_retrieve_signature_contents: string;
    failed_to_retrieve_byterange: string;
    failed_to_compute_digest: string;
    failed_retrieve_signing_certificate: string;
    failed_retrieve_public_key: string;
    failed_encryption_padding: string;
    general_failure: string;
};
export declare type DocumentIntegrityStatusType = $Keys<typeof DocumentIntegrityStatus>;
export declare const CertificateChainValidationStatus: {
    ok: string;
    ok_but_self_signed: string;
    untrusted: string;
    expired: string;
    not_yet_valid: string;
    invalid: string;
    revoked: string;
    failed_to_retrieve_signature_contents: string;
    general_validation_problem: string;
};
export declare type CertificateChainValidationStatusType = $Keys<typeof CertificateChainValidationStatus>;
export declare const SignatureValidationStatus: {
    valid: string;
    warning: string;
    error: string;
};
export declare type SignatureValidationStatusType = $Keys<typeof SignatureValidationStatus>;
