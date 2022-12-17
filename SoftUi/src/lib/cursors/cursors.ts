import { LibBase } from "../Abase";

class Cursors extends LibBase {
    alloweds: Record<string, string> = {
        alias: 'alias',
        all__scroll: 'all-scroll',
        ns__resize: 'ns-resize',
        col__resize: 'col-resize',
        no__drop: 'no-drop',
        context__menu: 'context-menu',
        not__allowed: 'not-allowed',
        e__resize: 'e-resize',
        ew__resize: 'ew-resize',
        n__resize: 'n-resize',
        s__resize: 's-resize',
        sw__resize: 'sw-resize',
        nesw__resize: 'nesw-resize',
        nw__resize: 'nw-resize',
        w__resize: 'w-resize',
        zoom__out: 'zoom-out',
        zoom__in: 'zoom-in',
        nwse__resize: 'nwse-resize',
        ne__resize: 'ne-resize',
        row__resize: 'row-resize',
        se__resize: 'se-resize',
        cell: 'cell',
        auto: 'auto',
        copy: 'copy',
        crosshair: 'crosshair',
        default: 'default',
        grab: 'grab',
        grabbing: 'grabbing',
        help: 'help',
        move: 'move',
        none: 'none',
        pointer: 'pointer',
        progress: 'progress',
        text: 'text',
        wait: 'wait',
    }

    private isValidCursor(): boolean {
        const cursor = this.className.split("__").slice(1).join('__')

        if (!this.className.startsWith("cursor__")) {
            return false
        }

        if (!this.alloweds[cursor]) {
            return false
        }

        return true
    }

    public handler(): Record<string, Record<string, any>> {
        const cursor = this.className.split("__").slice(1).join('__')

        if (!this.isValidCursor()) {
            return {}
        }

        return {
            [this.className]: {
                cursor: this.alloweds[cursor]
            }
        }
    }
}

export { Cursors }