// Type definitions for winbox 0.2
// Project: https://nextapps-de.github.io/winbox/
// Definitions by: Piotr Błażejewicz <https://github.com/peterblazejewicz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace WinBox;

interface WinBox {
    dom: Node;
    background: string;
    body: HTMLElement;
    border: string | number;

    class: string | string[];

    html: string;
    id: string | number;
    index: number;
    max: boolean;
    modal: boolean;
    root: Node;
    title: string;
    url: string;
    onfocus: (this: WinBox) => void;
    onblur: (this: WinBox) => void;
    onresize: (this: WinBox, width: number, height: number) => void;
    onmove: (this: WinBox, x: number, y: number) => void;
    onclose: (this: WinBox, force: boolean) => boolean;
    mount(src?: Element): WinBox;
    unmount(dest?: Element): WinBox;
    setTitle(title: string): WinBox;
    setBackground(background: string): WinBox;
    setUrl(url: string): WinBox;
    focus(): WinBox;
    hide(): WinBox;
    show(): WinBox;
    minimize(state?: boolean): WinBox;
    maximize(state?: boolean): WinBox;
    fullscreen(state?: boolean): WinBox;
    close(force?: boolean): boolean | void;
    move(x?: string | number, y?: string | number, skipUpdate?: boolean): WinBox;
    resize(w?: string | number, h?: string | number, skipUpdate?: boolean): WinBox;
    addClass(classname: string): WinBox;
    removeClass(classname: string): WinBox;
}
declare namespace WinBox {
    interface WinBoxConstructor {
        (title: string, params?: Params): WinBox;
        (params: Params): WinBox;
        new (title: string, params?: Params): WinBox;
        new (params: Params): WinBox;
    }

    interface Params {
        // configuration:
        index?: number | undefined;
        id?: string | number | undefined;
        root?: Node | undefined;
        class?: string | string[] | undefined;

        // appearance:
        title?: string | undefined;
        background?: string | undefined;
        border?: string | number | undefined;
        header?: string | number | undefined;
        icon?: boolean | undefined;

        // initial state:
        modal?: boolean | undefined;
        max?: boolean | undefined;
        min?: boolean | undefined;
        hidden?: boolean | undefined;

        // dimension:
        width?: string | number | undefined;
        height?: string | number | undefined;
        minwidth?: string | number | undefined;
        minheight?: string | number | undefined;
        maxwidth?: string | number | undefined;
        maxheight?: string | number | undefined;
        autosize?: boolean | undefined;

        // position:
        x?: "right" | "center" | string | number | undefined;
        y?: "bottom" | "center" | string | number | undefined;

        // viewport boundaries:
        right?: string | number | undefined;
        top?: string | number | undefined;
        bottom?: string | number | undefined;
        left?: string | number | undefined;

        // contents (choose from):
        url?: string | undefined;
        mount?: Node | undefined;
        html?: string | undefined;

        // callbacks:
        oncreate?: ((this: WinBox, options: Params) => void) | undefined;
        onshow?: ((this: WinBox) => void) | undefined;
        onhide?: ((this: WinBox) => void) | undefined;
        onfocus?: ((this: WinBox) => void) | undefined;
        onblur?: ((this: WinBox) => void) | undefined;
        onresize?: ((this: WinBox, width: number, height: number) => void) | undefined;
        onmove?: ((this: WinBox, x: number, y: number) => void) | undefined;
        onclose?: ((this: WinBox, force?: boolean) => boolean) | undefined;
        onfullscreen?: ((this: WinBox) => void) | undefined;
        onmaximize?: ((this: WinBox) => void) | undefined;
        onminimize?: ((this: WinBox) => void) | undefined;
        onrestore?: ((this: WinBox) => void) | undefined;
        
        template?: HTMLElement | undefined;
    }
}

declare const WinBox: WinBox.WinBoxConstructor & {
    new: ((title: string, params?: WinBox.Params) => WinBox) | ((params: WinBox.Params) => WinBox);
};

export = WinBox;
