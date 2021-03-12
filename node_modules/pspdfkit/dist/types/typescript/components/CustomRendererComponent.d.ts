import Annotation from '../models/annotations/Annotation';
import Comment from '../models/comments/Comment';
declare type RendererStyles = {
    position?: 'absolute' | 'relative' | 'static' | 'fixed' | 'inherit' | 'initial';
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    pointerEvents?: 'none' | 'all';
    transform?: string;
    transformOrigin?: string;
};
declare const _default: any;
export default _default;
export declare type RenderableEntity = 'Annotation' | 'CommentAvatar';
export declare type RendererConfiguration = {
    node: Node;
    append: boolean | null | undefined;
    noZoom: boolean | null | undefined;
    onDisappear: (arg0: Node | null) => void | null | undefined;
};
declare type AnnotationProps = {
    annotation: Annotation;
};
declare type CommentAvatarProps = {
    comment: Comment;
};
export declare const mapPropsAndStateToPublicProps: {
    Annotation: (props: AnnotationProps) => AnnotationProps;
    CommentAvatar: (props: CommentAvatarProps) => CommentAvatarProps;
};
export declare const perRendererStyles: {
    Annotation: (rendererProps: AnnotationProps, noZoom: boolean, notCSSScaled: boolean, zoomLevel: number) => RendererStyles;
    CommentAvatar: any;
};
