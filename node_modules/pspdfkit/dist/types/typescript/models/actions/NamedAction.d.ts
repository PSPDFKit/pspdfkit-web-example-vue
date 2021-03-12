import Action from './Action';
declare class NamedAction extends Action {
    action: string;
    static defaultValues: any;
    constructor(args?: {
        action?: string;
    });
}
export default NamedAction;
