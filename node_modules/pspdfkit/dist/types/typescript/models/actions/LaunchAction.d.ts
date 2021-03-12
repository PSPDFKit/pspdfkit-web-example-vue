import Action from './Action';
declare class LaunchAction extends Action {
    filePath: string;
    static defaultValues: any;
    constructor(args?: {
        filePath?: string;
    });
}
export default LaunchAction;
