import { List } from "../../../immutable/dist/immutable-nonambient";
import SearchResult from './SearchResult';
declare const SearchState_base: any;
export default class SearchState extends SearchState_base {
    isFocused: boolean;
    isLoading: boolean;
    term: string;
    focusedResultIndex: number;
    results: List<SearchResult>;
    minSearchQueryLength: number;
    constructor(args?: {
        isFocused?: boolean;
        isLoading?: boolean;
        term?: string;
        focusedResultIndex?: number;
        results?: List<SearchResult>;
        minSearchQueryLength?: number;
    });
}
export {};
