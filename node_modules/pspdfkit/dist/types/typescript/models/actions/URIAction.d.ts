import Action from './Action';
declare class URIAction extends Action {
    uri: string;
    static defaultValues: any;
    constructor(args?: {
        uri?: string;
    });
}
export default URIAction;
