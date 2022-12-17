import { LibBase } from "../Abase"


class Rounders extends LibBase {
    sizes: Record<string, string> = {
        none: '0rem',
        sm: '.125rem',
        no: '.25rem',
        md: '.375rem',
        lg: '.5rem',
        xl: '.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
        full: '100%',
    }

    types: Record<string, string[]> = {
        all: ['border-radius'],
        top: ['border-top-left-radius', 'border-top-right-radius'],
        bottom: ['border-bottom-left-radius', 'border-bottom-right-radius'],
        left: ['border-bottom-left-radius', 'border-top-left-radius'],
        right: ['border-bottom-right-radius', 'border-top-right-radius'],
        topleft: ['border-top-left-radius'],
        topright: ['border-top-right-radius'],
        bottomleft: ['border-bottom-left-radius'],
        bottomright: ['border-bottom-right-radius'],
    }

    private isValidRounder(): boolean {
        const splitted = this.className.split("__");

        if (!this.className.startsWith("rounded")) {
            return false;
        }

        if (splitted.length >= 3 && (!this.types[splitted[1]] || !this.sizes[splitted[2]])) {
            return false;
        }

        if (splitted.length == 2 && !this.types[splitted[1]] && !this.sizes[splitted[1]]) {
            return false
        }

        return true
    }

    private generateRounder(): Record<string, string> {
        const splitted = this.className.split("__");
        let t = splitted[1] || 'all'
        let s = splitted[2] || 'no'

        if (splitted.length == 2) {
            if (this.sizes[splitted[1]]) {
                s = splitted[1]
                t = 'all'
            }
        }

        const data: Record<string, string> = {}

        for (const i of this.types[t]) {
            data[i] = this.sizes[s]
        }

        return data
    }

    public handler(): Record<string, Record<string, string>> {
        if (!this.isValidRounder()) {
            return {}
        }

        return {
            [this.className]: this.generateRounder()
        }
    }
}

export { Rounders }