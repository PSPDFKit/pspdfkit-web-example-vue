import Action from './Action';
declare class JavaScriptAction extends Action {
    script: string;
    static defaultValues: any;
    constructor(args?: {
        script?: string;
    });
}
export default JavaScriptAction;
