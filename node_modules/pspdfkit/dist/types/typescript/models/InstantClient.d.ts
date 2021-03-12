import Client from '../lib/ClientsPresence/models/Client';
export default class InstantClient {
    clientId: string;
    userId: string | null | undefined;
}
export declare function createInstantClient(client: Client): InstantClient;
