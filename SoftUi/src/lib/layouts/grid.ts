import { LibBase } from "../Abase"

class Grid extends LibBase {
    defaultClasses: Record<string, Record<string, string>> = {
        grid: {
            display: 'grid'
        }
    }

    private createGridGap = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        if (isNaN(v) || v < 1 || v > 20) {
            return {}
        }

        return {
            gap: `${v * .25}rem`
        }
    }

    private createGridColumns = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        if (v < 1 || v > 12) {
            return {}
        }

        return {
            'grid-template-columns': `repeat(${v}, 1fr)`
        }
    }

    private createGridRows = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        if (v < 1 || v > 12) {
            return {}
        }

        return {
            'grid-template-rows': `repeat(${v}, 1fr)`
        }
    }

    private createGridSpanColumns = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        if (v < 1 || v > 12) {
            return {}
        }

        return {
            'grid-column': `span ${v}`
        }
    }

    private createGridSpanRows = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        if (v < 1 || v > 12) {
            return {}
        }

        return {
            'grid-row': `span ${v}`
        }
    }

    public handler(): Record<string, Record<string, any>> {
        if (this.defaultClasses[this.className]) {
            return {
                [this.className]: this.defaultClasses[this.className]
            };
        }

        let result = {}
        let splitted = this.className.split('__')

        splitted.pop()

        const type = splitted.join('__')
        const opts: Record<string, () => Record<string, string>> = {
            'grid__gap': this.createGridGap,
            'grid__columns': this.createGridColumns,
            'grid__rows': this.createGridRows,
            'grid__span__columns': this.createGridSpanColumns,
            'grid__span__rows': this.createGridSpanRows
        }

        if (opts[type]) {
            result = {
                [this.className]: opts[type]()
            }
        }

        return result
    }
}

export { Grid }