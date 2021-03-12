import { Map } from "../immutable/dist/immutable-nonambient";
import Instance from './Instance';
import { Configuration, StandaloneConfiguration } from './Configuration';
export declare let unloadCallbacksRef: {
    current: Map<HTMLElement, () => void>;
};
export declare let mountedInstancesRef: {
    current: Map<Instance, () => void>;
};
export declare function preloadWorker(configuration: StandaloneConfiguration): Promise<void>;
export declare function load(configuration: Configuration): Promise<Instance>;
