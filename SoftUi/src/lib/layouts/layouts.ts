import { LibBase } from "../Abase"
import { Flex } from "./flex"
import { Grid } from "./grid"


class Layouts extends LibBase {
    private isValidLayout = (): boolean => {
        const splitted = this.className.split('__')

        if (!['grid', 'flex'].includes(splitted[0])) {
            return false
        }

        return true
    }

    public handler = (): Record<string, Record<string, any>> => {
        if (!this.isValidLayout()) {
            return {};
        }

        const splitted = this.className.split('__')
        const opts: Record<string, LibBase> = {
            'grid': new Grid(this.className),
            'flex': new Flex(this.className),
        }

        return opts[splitted[0]].handler()
    }
}

export { Layouts }