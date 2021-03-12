import Color from './Color';
import Rect from './geometry/Rect';
declare const _default: {};
export default _default;
declare type Rotation = 0 | 90 | 180 | 270;
declare type AddPageConfiguration = {
    backgroundColor: Color;
    pageWidth: number;
    pageHeight: number;
    rotateBy: Rotation;
    insets?: Rect;
};
declare type AddPageConfigurationJSON = {
    backgroundColor: string;
    pageWidth: number;
    pageHeight: number;
    rotateBy: Rotation;
    insets?: Array<number>;
};
declare type OperationAttachment = string | File | Blob;
declare type min = number;
declare type max = number;
declare type Range = [min, max];
declare type ImportPageIndex = Array<number | Range>;
declare type DocumentMetadata = {
    title?: string;
    author?: string;
};
declare type NonSerializableDocumentOperations = {
    type: 'removePages';
    pageIndexes: Array<number>;
} | {
    type: 'duplicatePages';
    pageIndexes: Array<number>;
} | {
    type: 'movePages';
    pageIndexes: Array<number>;
    afterPageIndex: number;
} | {
    type: 'movePages';
    pageIndexes: Array<number>;
    beforePageIndex: number;
} | {
    type: 'rotatePages';
    pageIndexes: Array<number>;
    rotateBy: Rotation;
} | {
    type: 'keepPages';
    pageIndexes: Array<number>;
} | {
    type: 'importDocument';
    afterPageIndex: number;
    treatImportedDocumentAsOnePage: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
} | {
    type: 'importDocument';
    beforePageIndex: number;
    treatImportedDocumentAsOnePage: boolean;
    document: OperationAttachment;
    importedPageIndexes?: ImportPageIndex;
} | {
    type: 'applyInstantJson';
    instantJson: Object;
    dataFilePath: OperationAttachment;
} | {
    type: 'applyXfdf';
    xfdf: string;
    dataFilePath: OperationAttachment;
} | {
    type: 'flattenAnnotations';
    pageIndexes?: Array<number>;
} | {
    type: 'setPageLabel';
    pageIndexes?: Array<number>;
    pageLabel?: string;
} | {
    type: 'performOcr';
    pageIndexes?: Array<number> | 'all';
    language: string;
} | {
    type: 'applyRedactions';
} | {
    type: 'updateMetadata';
    metadata: DocumentMetadata;
};
export declare type DocumentOperation = (AddPageConfiguration & {
    type: 'addPage';
    afterPageIndex: number;
}) | (AddPageConfiguration & {
    type: 'addPage';
    beforePageIndex: number;
}) | NonSerializableDocumentOperations;
export declare type DocumentOperationJSON = (AddPageConfigurationJSON & {
    type: 'addPage';
    afterPageIndex: number;
}) | (AddPageConfigurationJSON & {
    type: 'addPage';
    beforePageIndex: number;
}) | NonSerializableDocumentOperations;
export declare function validateDocumentOperations(operations: Array<DocumentOperation>): Array<DocumentOperation> | null | undefined;
