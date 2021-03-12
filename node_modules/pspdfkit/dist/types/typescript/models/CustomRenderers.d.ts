import Annotation from './annotations/Annotation';
import Comment from './comments/Comment';
import { RendererConfiguration } from '../components/CustomRendererComponent';
declare const _default: {};
export default _default;
export declare type CustomRenderers = {
    Annotation?: (arg0: {
        annotation: Annotation;
    }) => RendererConfiguration | null | undefined;
    CommentAvatar?: (arg0: {
        comment: Comment;
    }) => RendererConfiguration | null | undefined;
};
export declare function validateCustomRenderers(customRenderers: CustomRenderers): CustomRenderers | null | undefined;
