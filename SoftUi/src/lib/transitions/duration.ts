import { LibBase } from "../Abase";

class Duration extends LibBase {
    private isValidDuration = (): boolean => {
        const v = Number(this.className.match(/\d+/))

        if (this.className.includes(".") && [25, 50, 75].includes(v)) {
            return true;
        }

        if (v > 21 || v < 1) {
            return false;
        }

        return true;
    };
    public handler(): Record<string, Record<string, any>> {
        if (!this.isValidDuration()) {
            return {}
        }

        const v = Number(this.className.match(/\d+/))

        if (this.className.includes(".")) {
            return {
                [this.className]: {
                    'transition-duration': v + 'ms'
                }
            }
        }

        return {
            [this.className]: {
                'transition-duration': 50 * v + 50 + 'ms'
            }
        }
    }
}

export { Duration }