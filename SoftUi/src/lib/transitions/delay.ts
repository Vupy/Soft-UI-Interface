import { LibBase } from "../Abase";

class Delay extends LibBase {
    private isValidDalay = (): boolean => {
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
        if (!this.isValidDalay()) {
            return {}
        }

        const v = Number(this.className.match(/\d+/))

        if (this.className.includes(".")) {
            return {
                [this.className]: {
                    'transition-delay': v + 'ms'
                }
            }
        }

        return {
            [this.className]: {
                'transition-delay': 50 * v + 50 + 'ms'
            }
        }
    }
}

export { Delay }