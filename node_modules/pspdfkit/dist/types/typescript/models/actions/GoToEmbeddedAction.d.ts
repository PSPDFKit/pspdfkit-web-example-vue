import Action from './Action';
declare class GoToEmbeddedAction extends Action {
    newWindow: boolean;
    relativePath: string;
    targetType: 'parent' | 'child';
    static defaultValues: any;
    constructor(args?: {
        newWindow?: boolean;
        relativePath?: string;
        targetType?: 'parent' | 'child';
    });
}
export default GoToEmbeddedAction;
