import { LibBase } from "../Abase"


class Opacity extends LibBase {
    private isValidOpacity = (): boolean => {
        if (!this.className.match(/\d+/) || !this.className.startsWith("opacity__")) {
            return false
        }

        const v = Number(this.className.match(/\d+/))

        if (v < 0 || v > 20) {
            return false
        }

        return true
    }

    public handler = (): Record<string, Record<string, any>> => {
        if (!this.isValidOpacity()) {
            return {}
        }

        const v = Number(this.className.match(/\d+/))

        return {
            [this.className]: {
                'opacity': (v * 5) / 100
            }
        }
    }
}

export { Opacity }