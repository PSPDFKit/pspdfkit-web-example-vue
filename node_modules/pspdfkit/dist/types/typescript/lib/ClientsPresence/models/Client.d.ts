declare const Client_base: any;
export default class Client extends Client_base {
    clientId: string;
    userId: string | null | undefined;
    presenceContent: Object;
}
export {};
