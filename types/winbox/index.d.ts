// Type definitions for winbox 0.2
// Project: https://nextapps-de.github.io/winbox/
// Definitions by: Piotr Błażejewicz <https://github.com/peterblazejewicz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace WinBox;

interface WinBox {
    // instance:
    body: HTMLElement;
    bottom: number;
    dom: Node;
    focused: boolean;
    full: boolean;
    header: number;
    height: number;
    hidden: boolean;
    id: string;
    index: number;
    left: number;
    max: boolean;
    maxheight: number;
    maxwidth: number;
    min: boolean;
    minheight: number;
    minwidth: number;
    onblur: (this: WinBox) => void | undefined;
    onclose: (this: WinBox, force: boolean) => boolean | undefined;
    onfocus: (this: WinBox) => void | undefined;
    onfullscreen: (this: WinBox) => void | undefined;
    onhide: (this: WinBox) => void | undefined;
    onmaximize: (this: WinBox) => void | undefined;
    onminimize: (this: WinBox) => void | undefined;
    onmove: (this: WinBox, x: number, y: number) => void | undefined;
    onresize: (this: WinBox, width: number, height: number) => void | undefined;
    onrestore: (this: WinBox) => void | undefined;
    onshow: (this: WinBox) => void | undefined;
    right: number;
    title: string;
    top: number;
    width: number;
    window: HTMLElement;
    
    // prototype:
    addClass(classname: string): WinBox;
    addControl(control: { classname:string, imageURL:string | undefined?, click: (this: WinBox, event: MouseEvent, self: WinBox) => void?, index:number? } | undefined): WinBox;
    blur(state?: boolean): WinBox;
    close(force?: boolean): boolean | void;
    focus(state?: boolean): WinBox;
    fullscreen(state?: boolean): WinBox;
    hasClass(classname: string): boolean;
    hide(state?: boolean): WinBox;
    maximize(state?: boolean): WinBox;
    minimize(state?: boolean): WinBox;
    mount(src?: Element): WinBox;
    move(x?: string | number, y?: string | number, skipUpdate?: boolean): WinBox;
    removeClass(classname: string): WinBox;
    removeControl(classname: string): WinBox;
    resize(w?: string | number, h?: string | number, skipUpdate?: boolean): WinBox;
    restore(): WinBox;
    setBackground(background: string): WinBox;
    setIcon(src?: Element): WinBox;
    setTitle(title: string): WinBox;
    setUrl(url: string): WinBox;
    show(state?: boolean): WinBox;
    toggleClass(classname: string): WinBox;
    unmount(dest?: Element): WinBox;
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
