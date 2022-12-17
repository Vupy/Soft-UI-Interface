import { LibBase } from "../Abase";

class Timing extends LibBase {
    alloweds: Record<string, string> = {
        ease: "ease",
        ease__in: "ease-in",
        ease__out: "ease-out",
        ease__in__out: "ease-in-out",
        linear: "linear",
        step__start: "step-start",
        step__end: "step-end",
    }

    private isValidTiming = (): boolean => {
        const t = this.className.split("__").slice(1).join("__");

        return Object.keys(this.alloweds).includes(t)
    }

    public handler(): Record<string, Record<string, any>> {
        if (!this.isValidTiming()) {
            return {}
        }

        const t = this.className.split("__").slice(1).join("__");

        return {
            [this.className]: {
                'transition-timing-function': this.alloweds[t]
            }
        }
    }
}

export { Timing }