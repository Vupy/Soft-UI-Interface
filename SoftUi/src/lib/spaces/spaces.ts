import { LibBase } from "../Abase";


class Spaces extends LibBase {
    positions: string[] = [
        "all",
        "left",
        "right",
        "top",
        "bottom",
        "horizontal",
        "vertical"
    ]
    types: Record<string, string> = {
        mar: "margin",
        pad: "padding",
    }
    styles: string[] = ["rem", 'em', 'px', 'vw', 'vh']

    private isValidSpace = (): boolean => {
        const splitted = this.className.split("__")

        if (!['mar', 'pad'].includes(splitted[0])) {
            return false
        }

        if (!this.positions.includes(splitted[1])) {
            return false
        }

        if (!this.className.match(/\d+/)) {
            return false
        }

        const v = Number(this.className.match(/\d+/))

        if (!this.styles.includes(this.className.split(v.toString())[1] || 'rem')) {
            return false
        }

        if (this.className.includes(".") && [25, 50, 75].includes(v)) {
            return true
        }

        if (v < 0 || v > 48) {
            return false
        }

        return true
    }

    private generateSpace = (v: number): Record<string, string> => {
        const splitted = this.className.split("__")
        const n = Number(this.className.match(/\d+/))
        const style = this.className.split(n.toString())[1] || 'rem'

        if (this.className.includes("__horizontal__")) {
            return {
                [this.types[splitted[0]] + '-left']: v + style,
                [this.types[splitted[0]] + '-right']: v + style,
            }
        }

        if (this.className.includes("__vertical__")) {
            return {
                [this.types[splitted[0]] + '-top']: v + style,
                [this.types[splitted[0]] + '-bottom']: v + style,
            }
        }

        if (this.className.includes("__all__")) {
            return {
                [this.types[splitted[0]]]: v + style,
            }
        }

        return {
            [this.types[splitted[0]] + "-" + splitted[1]]: v + style,
        }
    }

    private generateSpaceUnderOne = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        return this.generateSpace(
            v / 100
        )
    }

    private generateSpaceOneEight = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        return this.generateSpace(
            v / 4 + 0.75
        )
    }

    private generateSpaceEightSixteen = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        return this.generateSpace(
            (v - 8) / 2 + 2.5
        )
    }

    private generateSpaceThirtythree = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        return this.generateSpace(
            (v - 32) * 2 + 22
        )
    }

    private generateSpaceSeventeenThirtytwo = (): Record<string, string> => {
        const v = Number(this.className.match(/\d+/))

        return this.generateSpace(
            (v - 16) + 6
        )
    }

    private getSpaceFn = (v: Number): () => (Record<string, string>) => {
        let fn = this.generateSpaceOneEight

        if (v < 1) {
            fn = this.generateSpaceUnderOne
        } else if (v > 32) {
            fn = this.generateSpaceThirtythree
        } else if (v > 16) {
            fn = this.generateSpaceSeventeenThirtytwo
        } else if (v > 8) {
            fn = this.generateSpaceEightSixteen
        }

        return fn
    }

    public handler = (): Record<string, Record<string, any>> => {
        if (!this.isValidSpace()) {
            return {}
        }

        let v = Number(this.className.match(/\d+/))

        if (this.className.includes(".")) {
            v /= 100
        }

        const fn = this.getSpaceFn(v)

        return {
            [this.className]: fn()
        }
    }
}

export { Spaces }