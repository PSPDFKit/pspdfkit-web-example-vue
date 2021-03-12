import { Record } from "../../immutable/dist/immutable-nonambient";
import Action from './actions/Action';
import { toJSON } from '../lib/serializers/BookmarkSerializer';
export declare type ID = string;
export declare type BookmarkProps = {
    id: ID | null | undefined;
    pdfBookmarkId: ID | null | undefined;
    name: string | null | undefined;
    sortKey: number | null | undefined;
    action: Action;
};
declare const Bookmark_base: Record.Factory<{
    id: any;
    pdfBookmarkId: any;
    name: any;
    sortKey: any;
    action: any;
}>;
export default class Bookmark extends Bookmark_base {
    id: ID;
    pdfBookmarkId: ID | null | undefined;
    name: string | null | undefined;
    sortKey: number | null | undefined;
    action: Action;
    static toSerializableObject: typeof toJSON;
    static fromSerializableObject: (bookmark: Object) => Bookmark;
}
export declare const validate: (bookmark: Bookmark) => void;
export {};
