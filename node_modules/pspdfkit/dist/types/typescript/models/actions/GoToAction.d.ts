import Action from './Action';
declare class GoToAction extends Action {
    pageIndex: number;
    static defaultValues: any;
    constructor(args?: {
        pageIndex?: number;
    });
}
export default GoToAction;
