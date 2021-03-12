import { List } from "../../../immutable/dist/immutable-nonambient";
import { Rect } from '../geometry';
declare const SearchResult_base: any;
export default class SearchResult extends SearchResult_base {
    pageIndex: number;
    previewText: string;
    locationInPreview: number;
    lengthInPreview: number;
    rectsOnPage: List<Rect>;
    isAnnotation: boolean;
    annotationRect: Rect | null | undefined;
}
export {};
