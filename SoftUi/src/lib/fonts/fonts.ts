import { LibBase } from "../Abase"


class Fonts extends LibBase {
    defaultClasses: Record<string, Record<string, string>> = {
        font__size__xs: {
            "font-size": "0.75rem",
            "line-height": "1rem"
        },
        font__size__sm: {
            "font-size": '0.875rem',
            'line-height': '1.25rem'
        },
        font__size__base: {
            "font-size": '1rem',
            'line-height': '1.5rem'
        },
        font__size__lg: {
            "font-size": '1.125rem',
            'line-height': '1.75rem'
        },
        font__size__xl: {
            "font-size": '1.25rem',
            'line-height': '1.75rem'
        },
        font__size__2xl: {
            "font-size": '1.5rem',
            'line-height': '2rem'
        },
        font__size__3xl: {
            "font-size": '1.875rem',
            'line-height': '2.25rem'
        },
        font__size__4xl: {
            "font-size": '2.25rem',
            'line-height': '2.5rem'
        },
        font__size__5xl: {
            "font-size": '3rem',
            'line-height': '1'
        },
        font__size__6xl: {
            "font-size": '3.75rem',
            'line-height': '1'
        },
        font__size__7xl: {
            "font-size": '4.5rem',
            'line-height': '1'
        },
        font__size__8xl: {
            "font-size": '6rem',
            'line-height': '1'
        },
        font__size__9xl: {
            "font-size": '8rem',
            'line-height': '1'
        },
        break__normal: {
            "overflow-wrap": 'normal',
            'word-break': 'normal'
        },
        break__words: {
            "overflow-wrap": 'break-word'
        },
        break__all: {
            "word-break": 'break-all'
        },
        break__keep: {
            "word-break": 'keep-all'
        },
        white__space__normal: {
            "white-space": 'normal'
        },
        white__space__nowrap: {
            "white-space": 'nowrap'
        },
        white__space__pre: {
            "white-space": 'pre',
        },
        white__space__pre__line: {
            "white-space": 'pre-line'
        },
        white__space__pre__wrap: {
            "white-space": 'pre-wrap',
        },
        text__overflow__truncate: {
            "overflow": 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap'
        },
        text__overflow__ellipsis: {
            "text-overflow": 'ellipsis'
        },
        text__overflow__clip: {
            "text-overflow": 'clip'
        }
    }

    private isValidFontWeight = (): boolean => {
        if (this.className.match(/\d+/) && this.className.startsWith('font__weight__')) {
            const v = Number(this.className.match(/\d+/)) / 100

            if (v < 1 || v > 9) {
                return false
            }
        }

        return true
    }

    private isValidFontLine = (): boolean => {
        if (this.className.match(/\d+/) && this.className.startsWith('line__height__')) {
            const v = Number(this.className.match(/\d+/))

            if (v < 1 || v > 11) {
                return false
            }
        }

        return true
    }

    private isValidFontText = (): boolean => {
        const splitted = this.className.split('__')

        return this.className.startsWith("text") && ![
            'left',
            'center',
            'right',
            'justify',
            'start',
            'end'
        ].includes(splitted.at(-1)!)
    }

    private isValidFont = (): boolean => {
        if (!['font__weight__', 'line__height__', 'text__align__'].some(e => this.className.startsWith(e))) {
            return false
        }

        return !this.isValidFontText() && this.isValidFontLine() && this.isValidFontWeight()
    }

    private generateTextClassName = (): Record<string, any> => ({
        'text-align': this.className.split('__').at(-1)
    })

    private generateLineClassName = (): Record<string, any> => ({
        'line-height': .25 * Number(this.className.match(/\d+/)) + '.rem'
    })

    private generateFontClassName = (): Record<string, any> => ({
        'font-weight': Number(this.className.match(/\d+/))
    })

    public handler = (): Record<string, Record<string, any>> => {
        if (this.defaultClasses[this.className]) {
            return {
                [this.className]: this.defaultClasses[this.className]
            }
        }

        if (!this.isValidFont()) {
            return {}
        }

        const splitted = this.className.split('__')
        const opts: Record<string, () => Record<
            string,
            Record<string, any>
        >> = {
            'text': this.generateTextClassName,
            'font': this.generateFontClassName,
            'line': this.generateLineClassName
        }

        return {
            [this.className]: opts[splitted[0]]()
        }
    }
}

export { Fonts }