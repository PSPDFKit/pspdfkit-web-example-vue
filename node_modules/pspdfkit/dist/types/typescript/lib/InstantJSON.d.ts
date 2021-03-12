export declare type InstantJSON = {
    format: 'https://pspdfkit.com/instant-json/v1';
    pdfId?: {
        permanent: string;
        changing: string;
    };
    skippedPdfObjectIds?: number[];
    annotations?: Object[];
    formFields?: Object[];
    skippedPdfFormFieldIds?: number[];
    formFieldValues?: Object[];
    attachments?: {
        [key: string]: {
            binary: string;
            contentType: string;
        };
    };
    skippedPdfBookmarkIds?: string[];
    bookmarks?: Object[];
};
