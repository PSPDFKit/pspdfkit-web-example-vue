import Action from './Action';
declare class GoToRemoteAction extends Action {
    relativePath: string;
    namedDestination: string;
    static defaultValues: any;
    constructor(args?: {
        relativePath?: string;
        namedDestination?: string;
    });
}
export default GoToRemoteAction;
