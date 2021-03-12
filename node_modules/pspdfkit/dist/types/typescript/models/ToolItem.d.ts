export declare type ToolItemType = 'custom';
export declare type ToolItem = {
    type: ToolItemType;
    node?: Node;
    id?: string;
    title?: string;
    className?: string;
    icon?: string;
    onPress?: Function;
    selected?: boolean;
    disabled?: boolean;
};
export declare const validate: (item: ToolItem, assert?: (arg0: boolean, arg1: string) => void) => void;
