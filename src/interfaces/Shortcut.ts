import {Editor} from "../models/Editor";

export interface Shortcut {
    key: string,
    callback: (editor: Editor) => void;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
}

export type shortcutKey = ''