import { LibBase } from "../Abase";
import { Delay } from "./delay";
import { Duration } from "./duration";
import { Timing } from "./timing";


class Transitions extends LibBase {
    alloweds: string[] = ['timing', 'duration', 'delay']

    private isValidTransition = (): boolean => {
        const splitted = this.className.split("__")

        return this.alloweds.includes(splitted[0])
    }

    public handler(): Record<string, Record<string, any>> {
        if (!this.isValidTransition()) {
            return {}
        }

        const splitted = this.className.split("__")

        const opts: Record<string, LibBase> = {
            'timing': new Timing(this.className),
            'duration': new Duration(this.className),
            'delay': new Delay(this.className),
        }

        return opts[splitted[0]].handler()
    }
}

export { Transitions }