import Annotation from '../../models/annotations/Annotation';
import { AnnotationPreset } from '../../models/AnnotationPreset';
import { ID } from '../../models/annotations/Annotation';
export declare function serializeAnnotation<T extends Annotation>(annotation: T): Object;
export declare function deserializeAnnotation(id: ID | null | undefined, payload: Object, options?: Object): Annotation;
export declare function serializePreset(preset: AnnotationPreset): Object;
export declare function unserializePreset(presetJSON: Object): AnnotationPreset;
