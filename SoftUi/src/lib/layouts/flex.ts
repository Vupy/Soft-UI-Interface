import { LibBase } from "../Abase";

class Flex extends LibBase {
    defaultClasses: Record<string, Record<string, string>> = {
        flex: {
            display: 'flex'
        },
        flex__row: {
            'flex-direction': 'row'
        },
        flex__row__reverse: {
            'flex-direction': 'row-reverse'
        },
        flex__column: {
            'flex-direction': 'column'
        },
        flex__column__reverse: {
            'flex-direction': 'column-reverse'
        },
        flex__wrap: {
            'flex-wrap': 'wrap'
        },
        flex__nowrap: {
            'flex-wrap': 'nowrap'
        },
        flex__wrap__reverse: {
            'flex-wrap': 'wrap-reverse'
        },
        flex__align__baseline: {
            'align-items': 'baseline'
        },
        flex__justify__around: {
            'justify-content': 'space-around'
        },
        flex__justify__between: {
            'justify-content': 'space-between'
        },
        flex__justify__evenly: {
            'justify-content': 'space-evenly'
        },
        flex__justify__baseline: {
            'justify-content': 'baseline'
        }
    }

    opts: Record<string, string> = {
        'center': 'center',
        'flex-end': 'end',
        'flex-start': 'start'
    }

    public handler = (): Record<string, Record<string, any>> => {

        for (const i in this.opts) {
            this.defaultClasses[`flex__justify__${this.opts[i]}`] = {
                'justify-content': i
            }

            this.defaultClasses[`flex__align__${this.opts[i]}`] = {
                'align-items': i
            }
        }

        if (this.defaultClasses[this.className]) {
            return {
                [this.className]: this.defaultClasses[this.className]
            };
        }

        return {}
    }
}

export { Flex }