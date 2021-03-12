import Bookmark from '../../models/Bookmark';
import { ID } from '../../models/Bookmark';
export declare function toJSON(bookmark: Bookmark): {
    id: string;
    v: number;
    pdfBookmarkId: string;
    type: string;
    name: string;
    sortKey: number;
    action: Object;
};
export declare function fromJSON(id: ID | null | undefined, json: Object): Bookmark;
