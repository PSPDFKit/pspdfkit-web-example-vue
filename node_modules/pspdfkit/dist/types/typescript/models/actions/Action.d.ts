import { InheritableImmutableRecord } from '../../lib/InheritableImmutableRecord';
declare class Action extends InheritableImmutableRecord {
    constructor(...args: Array<any>);
}
export default Action;
export declare type ActionTriggerEventType = 'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPageOpen' | 'onPageClose' | 'onPageVisible' | 'onPageHidden';
export declare const ACTION_CHANGES_CREATED = 1;
export declare const ACTION_CHANGES_UPDATED = 1;
export declare const ACTION_CHANGES_DELETED = 2;
export declare const ACTION_CHANGES_SIDE_EFFECT = 3;
export declare const ACTION_CHANGES_JAVASCRIPT_EVENT = 4;
export declare type ActionChange = {
    change_type: 1 | 2 | 3 | 4;
    object: {
        [key: string]: any;
    };
};
