import { Annotation, CommentMarkerAnnotation, HighlightAnnotation, InkAnnotation, LineAnnotation, RectangleAnnotation, EllipseAnnotation, PolygonAnnotation, PolylineAnnotation, LinkAnnotation, NoteAnnotation, SquiggleAnnotation, StampAnnotation, StrikeOutAnnotation, TextAnnotation, TextMarkupAnnotation, UnderlineAnnotation, UnknownAnnotation, ShapeAnnotation, ImageAnnotation, WidgetAnnotation } from './models/annotations';
import RedactionAnnotation from './models/annotations/RedactionAnnotation';
import { FormField, ButtonFormField, CheckBoxFormField, ChoiceFormField, ComboBoxFormField, ListBoxFormField, RadioButtonFormField, TextFormField, SignatureFormField, FormFieldValue } from './models/form-fields';
import { Action, GoToAction, GoToEmbeddedAction, GoToRemoteAction, HideAction, JavaScriptAction, LaunchAction, NamedAction, ResetFormAction, SubmitFormAction, URIAction } from './models/actions';
import Bookmark from './models/Bookmark';
import Color from './models/Color';
import CustomOverlayItem from './models/CustomOverlayItem';
import FormOption from './models/FormOption';
import InstantClient from './models/InstantClient';
import PageInfo from './models/PageInfo';
import TextLine from './models/TextLine';
import ViewState from './models/ViewState';
import Comment from './models/comments/Comment';
import Font from './models/Font';
import { List } from "../immutable/dist/immutable-nonambient";
import { load, preloadWorker as actualPreloadWorker } from './load';
import { Point, DrawingPoint, Rect, Size, Inset } from './models/geometry';
import { serializeAnnotation, serializePreset, unserializePreset } from './lib/serializers/utils';
import { unload } from './unload';
import { viewStateFromOpenParameters } from './utils/viewStateFromOpenParameters';
import Instance from './Instance';
import SearchResult from './models/search/SearchResult';
import SearchState from './models/search/SearchState';
import { generateInstantId } from './models/InstantID';
declare const PSPDFKit: {
    Immutable: {
        List: typeof List;
    };
    version: string;
    Geometry: {
        Point: typeof Point;
        DrawingPoint: typeof DrawingPoint;
        Rect: typeof Rect;
        Size: typeof Size;
        Inset: typeof Inset;
    };
    Actions: {
        Action: typeof Action;
        GoToAction: typeof GoToAction;
        GoToEmbeddedAction: typeof GoToEmbeddedAction;
        GoToRemoteAction: typeof GoToRemoteAction;
        HideAction: typeof HideAction;
        JavaScriptAction: typeof JavaScriptAction;
        LaunchAction: typeof LaunchAction;
        NamedAction: typeof NamedAction;
        ResetFormAction: typeof ResetFormAction;
        SubmitFormAction: typeof SubmitFormAction;
        URIAction: typeof URIAction;
    };
    Annotations: {
        Annotation: typeof Annotation;
        CommentMarkerAnnotation: typeof CommentMarkerAnnotation;
        HighlightAnnotation: typeof HighlightAnnotation;
        InkAnnotation: typeof InkAnnotation;
        ShapeAnnotation: typeof ShapeAnnotation;
        LineAnnotation: typeof LineAnnotation;
        RectangleAnnotation: typeof RectangleAnnotation;
        EllipseAnnotation: typeof EllipseAnnotation;
        PolygonAnnotation: typeof PolygonAnnotation;
        PolylineAnnotation: typeof PolylineAnnotation;
        LinkAnnotation: typeof LinkAnnotation;
        NoteAnnotation: typeof NoteAnnotation;
        MarkupAnnotation: typeof TextMarkupAnnotation;
        RedactionAnnotation: typeof RedactionAnnotation;
        SquiggleAnnotation: typeof SquiggleAnnotation;
        StampAnnotation: typeof StampAnnotation;
        StrikeOutAnnotation: typeof StrikeOutAnnotation;
        TextAnnotation: typeof TextAnnotation;
        UnderlineAnnotation: typeof UnderlineAnnotation;
        ImageAnnotation: typeof ImageAnnotation;
        UnknownAnnotation: typeof UnknownAnnotation;
        WidgetAnnotation: typeof WidgetAnnotation;
        toSerializableObject: typeof serializeAnnotation;
        fromSerializableObject: (annotation: Object) => Annotation;
    };
    AnnotationPresets: {
        toSerializableObject: typeof serializePreset;
        fromSerializableObject: typeof unserializePreset;
    };
    Comment: typeof Comment;
    Bookmark: typeof Bookmark;
    CustomOverlayItem: typeof CustomOverlayItem;
    FormFields: {
        FormField: typeof FormField;
        ButtonFormField: typeof ButtonFormField;
        CheckBoxFormField: typeof CheckBoxFormField;
        ChoiceFormField: typeof ChoiceFormField;
        ComboBoxFormField: typeof ComboBoxFormField;
        ListBoxFormField: typeof ListBoxFormField;
        RadioButtonFormField: typeof RadioButtonFormField;
        TextFormField: typeof TextFormField;
        SignatureFormField: typeof SignatureFormField;
    };
    FormFieldValue: typeof FormFieldValue;
    FormOption: typeof FormOption;
    Color: typeof Color;
    Instance: typeof Instance;
    preloadWorker: typeof actualPreloadWorker;
    load: typeof load;
    unload: typeof unload;
    Error: (messageOrError: string | Error) => void;
    SaveError: (messageOrError: string | Error) => void;
    ViewState: typeof ViewState;
    PageInfo: typeof PageInfo;
    TextLine: typeof TextLine;
    InstantClient: typeof InstantClient;
    TextSelection: {
        new (): {
            [x: string]: any;
            startTextLineId: number;
            startPageIndex: number;
            startNode: Text;
            startOffset: number;
            endTextLineId: number;
            endPageIndex: number;
            endNode: Text;
            endOffset: number;
            getText: () => Promise<string>;
            getSelectedTextLines: () => Promise<List<TextLine>>;
            getBoundingClientRect: () => Promise<Rect>;
            getSelectedRectsPerPage: () => Promise<List<{
                pageIndex: number;
                rects: List<Rect>;
            }>>;
        };
        [x: string]: any;
    };
    SearchResult: typeof SearchResult;
    SearchState: typeof SearchState;
    AutoSaveMode: {
        IMMEDIATE: string;
        INTELLIGENT: string;
        DISABLED: string;
    };
    SignatureSaveMode: {
        ALWAYS: string;
        NEVER: string;
        USING_UI: string;
    };
    LayoutMode: {
        SINGLE: string;
        DOUBLE: string;
        AUTO: string;
    };
    PrintMode: {
        DOM: string;
        EXPORT_PDF: string;
    };
    ScrollMode: {
        CONTINUOUS: string;
        PER_SPREAD: string;
        DISABLED: string;
    };
    ZoomMode: {
        AUTO: string;
        FIT_TO_WIDTH: string;
        FIT_TO_VIEWPORT: string;
        CUSTOM: string;
    };
    InteractionMode: {
        TEXT_HIGHLIGHTER: string;
        INK: string;
        INK_SIGNATURE: string;
        STAMP_PICKER: string;
        STAMP_CUSTOM: string;
        SHAPE_LINE: string;
        SHAPE_RECTANGLE: string;
        SHAPE_ELLIPSE: string;
        SHAPE_POLYGON: string;
        SHAPE_POLYLINE: string;
        INK_ERASER: string;
        NOTE: string;
        COMMENT_MARKER: string;
        TEXT: string;
        PAN: string;
        SEARCH: string;
        DOCUMENT_EDITOR: string;
        MARQUEE_ZOOM: string;
        REDACT_TEXT_HIGHLIGHTER: string;
        REDACT_SHAPE_RECTANGLE: string;
    };
    SidebarMode: {
        ANNOTATIONS: string;
        BOOKMARKS: string;
        DOCUMENT_OUTLINE: string;
        THUMBNAILS: string;
    };
    SidebarPlacement: {
        START: string;
        END: string;
    };
    ShowSignatureValidationStatusMode: {
        IF_SIGNED: string;
        HAS_WARNINGS: string;
        HAS_ERRORS: string;
        NEVER: string;
    };
    NoteIcon: {
        COMMENT: string;
        RIGHT_POINTER: string;
        RIGHT_ARROW: string;
        CHECK: string;
        CIRCLE: string;
        CROSS: string;
        INSERT: string;
        NEW_PARAGRAPH: string;
        NOTE: string;
        PARAGRAPH: string;
        HELP: string;
        STAR: string;
        KEY: string;
    };
    Theme: {
        LIGHT: string;
        DARK: string;
        AUTO: string;
    };
    ToolbarPlacement: {
        TOP: string;
        BOTTOM: string;
    };
    I18n: {
        locales: any;
        messages: {};
        preloadLocalizationData: (locale: string, options?: {
            baseUrl?: string;
        }) => Promise<void>;
    };
    baseUrl: any;
    DocumentIntegrityStatus: {
        ok: string;
        tampered_document: string;
        failed_to_retrieve_signature_contents: string;
        failed_to_retrieve_byterange: string;
        failed_to_compute_digest: string;
        failed_retrieve_signing_certificate: string;
        failed_retrieve_public_key: string;
        failed_encryption_padding: string;
        general_failure: string;
    };
    SignatureValidationStatus: {
        valid: string;
        warning: string;
        error: string;
    };
    CertificateChainValidationStatus: {
        ok: string;
        ok_but_self_signed: string;
        untrusted: string;
        expired: string;
        not_yet_valid: string;
        invalid: string;
        revoked: string;
        failed_to_retrieve_signature_contents: string;
        general_validation_problem: string;
    };
    AnnotationsWillChangeReason: {
        DRAW_START: string;
        DRAW_END: string;
        TEXT_EDIT_START: string;
        TEXT_EDIT_END: string;
        SELECT_START: string;
        SELECT_END: string;
        MOVE_START: string;
        MOVE_END: string;
        RESIZE_START: string;
        RESIZE_END: string;
        DELETE_START: string;
        DELETE_END: string;
        PROPERTY_CHANGE: string;
    };
    viewStateFromOpenParameters: typeof viewStateFromOpenParameters;
    readonly defaultToolbarItems: {
        type: import("./models/ToolbarItem").DefaultToolbarItemType;
    }[];
    readonly defaultAnnotationPresets: any;
    readonly defaultStampAnnotationTemplates: (ImageAnnotation | StampAnnotation)[];
    defaultEditableAnnotationTypes: readonly (typeof WidgetAnnotation | typeof CommentMarkerAnnotation)[];
    Options: {
        MIN_TEXT_ANNOTATION_SIZE: number;
        MIN_INK_ANNOTATION_SIZE: number;
        MIN_SHAPE_ANNOTATION_SIZE: number;
        MIN_IMAGE_ANNOTATION_SIZE: number;
        MIN_STAMP_ANNOTATION_SIZE: number;
        ENABLE_INK_SMOOTH_LINES: boolean;
        INK_EPSILON_RANGE_OPTIMIZATION: number;
        SIGNATURE_SAVE_MODE: string;
        INITIAL_DESKTOP_SIDEBAR_WIDTH: number;
        IGNORE_DOCUMENT_PERMISSIONS: boolean;
        SELECTION_OUTLINE_PADDING: (viewportSize: Size) => number;
        RESIZE_ANCHOR_RADIUS: (viewportSize: Size) => number;
        SELECTION_STROKE_WIDTH: number;
        TEXT_ANNOTATION_AUTOFIT_TEXT_ON_EXPORT: boolean;
        TEXT_ANNOTATION_AUTOFIT_BOUNDING_BOX_ON_EDIT: boolean;
        DISABLE_KEYBOARD_SHORTCUTS: boolean;
        DEFAULT_INK_ERASER_CURSOR_WIDTH: number;
        COLOR_PRESETS: import("./models/Colors").ColorPreset[];
        LINE_CAP_PRESETS: string[];
        LINE_WIDTH_PRESETS: number[];
        HIGHLIGHT_COLOR_PRESETS: import("./models/Colors").ColorPreset[];
        TEXT_MARKUP_COLOR_PRESETS: import("./models/Colors").ColorPreset[];
        NOTE_COLOR_PRESETS: import("./models/Colors").ColorPreset[];
        PDF_JAVASCRIPT: boolean;
    };
    SearchPattern: {
        CREDIT_CARD_NUMBER: string;
        DATE: string;
        TIME: string;
        EMAIL_ADDRESS: string;
        INTERNATIONAL_PHONE_NUMBER: string;
        IP_V4: string;
        IP_V6: string;
        MAC_ADDRESS: string;
        NORTH_AMERICAN_PHONE_NUMBER: string;
        SOCIAL_SECURITY_NUMBER: string;
        URL: string;
        US_ZIP_CODE: string;
        VIN: string;
    };
    SearchType: {
        TEXT: string;
        PRESET: string;
        REGEX: string;
    };
    generateInstantId: typeof generateInstantId;
    Font: typeof Font;
};
export default PSPDFKit;
