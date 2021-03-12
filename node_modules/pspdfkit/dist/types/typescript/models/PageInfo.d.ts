import Page from './Page';
export default class PageInfo {
    index: number;
    label: string;
    height: number;
    width: number;
    rotation: number;
}
export declare function createPageInfo(page: Page): PageInfo;
