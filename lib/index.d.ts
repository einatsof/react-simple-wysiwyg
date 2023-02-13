/// <reference types="react" />
/* eslint-disable react/prop-types */
import * as React from "react";
import { HTMLAttributes } from "react";
/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
declare const ContentEditable: React.MemoExoticComponent<React.ForwardRefExoticComponent<ContentEditableProps & React.RefAttributes<HTMLElement>>>;
type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
    target: {
        name?: string;
        value: string;
    };
};
interface ContentEditableProps extends React.HTMLAttributes<HTMLElement> {
    disabled?: boolean;
    contentEditableRef?: (el: HTMLElement) => void;
    name?: string;
    onChange?: (event: ContentEditableEvent) => void;
    tagName?: string;
    value?: string;
}
declare function Editor({ children, onSelect, ...rest }: EditorProps): JSX.Element;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps extends ContentEditableProps {
}
declare function DefaultEditor(props: EditorProps): JSX.Element;
declare const EditorContext: React.Context<EditorState>;
declare function EditorProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;
declare function useEditorState(): EditorState;
interface EditorState {
    update(attrs: Partial<EditorState>): void;
    $el?: HTMLElement;
    $selection?: Node;
    htmlMode: boolean;
}
declare function HtmlEditor({ ...rest }: {
    [x: string]: any;
}): JSX.Element;
declare const BtnBold: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnBulletList: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnClearFormatting: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnItalic: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnLink: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnNumberedList: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnRedo: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnUnderline: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnUndo: {
    (props: HTMLAttributes<HTMLButtonElement>): JSX.Element;
    displayName: string;
};
declare const BtnStyles: typeof Dropdown;
declare function Dropdown({ items, selected, ...inputProps }: DropdownProps): JSX.Element;
type DropDownItem = [
    string,
    string | ((editorState: EditorState) => void),
    string
];
interface DropdownProps extends HTMLAttributes<HTMLSelectElement> {
    selected?: number;
    items?: DropDownItem[];
}
declare function HtmlButton({ ...rest }: {
    [x: string]: any;
}): JSX.Element;
declare function Separator(): JSX.Element;
declare function Toolbar(props: HTMLAttributes<HTMLDivElement>): JSX.Element;
export { ContentEditable, ContentEditableEvent, ContentEditableProps, DefaultEditor, Editor, EditorProps, EditorContext, EditorProvider, useEditorState, EditorState, HtmlEditor, BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnUnderline, BtnUndo, BtnStyles, Dropdown, DropDownItem, DropdownProps, HtmlButton, Separator, Toolbar };
