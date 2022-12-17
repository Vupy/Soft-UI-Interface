import { LibBase } from "../Abase";


class Sizes extends LibBase {
    allowedsSizes: Record<string, string> = {
        w: "width",
        wmax: "max-width",
        wmin: "min-width",
        h: "height",
        hmax: "max-height",
        hmin: "min-height",
    }
    styles: string[] = ["rem", 'em', 'px', 'vw', 'vh']

    private generatePercentages = (): string[] => {
        const results = [
            "2/3",
            "2/5",
            "2/7",
            "4/7",
            "6/7",
            "2/9",
            "4/9",
            "8/9",
        ]

        for (let i = 2; i < 13; i++) {
            for (let j = 1; j < i; j++) {
                if (
                    (
                        i % j != 0 ||
                        j == 1
                    ) &&
                    j >> 1 << 1 != j
                ) {
                    results.push(`${j}/${i}`)
                }
            }
        }

        return results
    }

    private generateSizeUnderOne = (v: number, format: string, style: string): Record<string, string> => ({
        [format]: v / 100 + style,
    })

    private generateSizeOneSixteen = (v: number, format: string, style: string): Record<string, string> => ({
        [format]: v + style,
    })

    private generateSizeSeventeenThirtytwo = (v: number, format: string, style: string): Record<string, string> => ({
        [format]: .25 * (v - 16) * 8 + 16 + style,
    })

    private generateSizeThirtythree = (v: number, format: string, style: string): Record<string, string> => ({
        [format]: .25 * (v - 32) * 16 + 48 + style,
    })

    private getSizerFn = (v: number): (v: number, format: string, style: string) => (Record<string, string>) => {
        let fn = this.generateSizeOneSixteen

        if (v < 1) {
            fn = this.generateSizeUnderOne
        } else if (v > 32) {
            fn = this.generateSizeThirtythree
        } else if (v > 16) {
            fn = this.generateSizeSeventeenThirtytwo
        }

        return fn
    }

    private isValidSize = (): boolean => {
        if (!this.className.match(/\d+/)) {
            return false
        }

        const v = Number(this.className.match(/\d+/))
        const style = this.className.split(v.toString())[1] || 'rem'

        if (this.className.includes(".") && [25, 50, 75].includes(v)) {
            return true
        }

        if (v < 0 || v > 49) {
            return false
        }

        if ((style == 'vw' || style == 'vh') && v > 45) {
            return false
        }

        return true
    }

    public handler = (): Record<string, Record<string, any>> => {
        const splitted = this.className.split("__")
        const matches = this.className.match(/\d+/g)

        if (!matches || !this.allowedsSizes[splitted[0]]) {
            return {}
        }

        const style = this.className.split(matches.join('/'))[1] || 'rem'

        if (!this.styles.includes(style)) {
            return {}
        }

        if (matches && matches.length > 1) {
            if (!this.generatePercentages().includes(matches.join('/'))) {
                return {}
            }

            return {
                [this.className]: this.generateSizeOneSixteen(
                    Number(eval(matches.join('/'))) * 100,
                    this.allowedsSizes[splitted[0]],
                    "%",
                )
            }
        }

        if (!this.isValidSize()) {
            return {}
        }

        let v = Number(matches[0])

        if (this.className.includes(".")) {
            v /= 100
        }

        const fn = this.getSizerFn(v)

        return {
            [this.className]: fn(
                Number(matches[0]),
                this.allowedsSizes[splitted[0]],
                style,
            )
        }
    }
}

export { Sizes }