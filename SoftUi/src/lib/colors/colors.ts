import { shadeColor, shades } from '../../utils/color';
import { colors } from "../../vars/colors";
import { LibBase } from "../Abase";


class Colors extends LibBase {
    alloweds: Record<string, string> = {
        'bg': 'background-color',
        'text': 'color',
        'border': 'border-color',
    };

    private isValidColor = (): boolean => {
        const splitted = this.className.split('__')
        let colorName = this.className.split('__').slice(1).join('__')

        if (!this.alloweds[splitted[0]]) {
            return false
        }

        if (this.className.match(/\d+/g)) {
            const numbers = this.className.match(/\d+/g) as string[]
            const v = Number(numbers[0])

            if (!shades.includes(v)) {
                return false
            }

            if (numbers.length > 1) {
                const alpha = Number(numbers[1])

                if (alpha > 100 || alpha < 0) {
                    return false
                }

                colorName = colorName.replace(`__${v}/${numbers[1]}`, '')
            }

            colorName = colorName.replace(`__${v}`, '')
        }

        if (!colors[colorName]) {
            return false
        }

        return true
    }

    private getColor = (colorName: string): string => {
        let v = 500;
        let alpha = 100

        if (this.className.match(/\d+/g)) {
            const numbers = this.className.match(/\d+/g) as string[]
            v = Number(numbers[0])
            alpha = Number(numbers[1] ?? 100)

            if (!shades.includes(v)) {
                return '';
            }

            if (numbers.length > 1) {
                colorName = colorName.replace(`__${v}/${numbers[1]}`, '')
            }

            colorName = colorName.replace(`__${v}`, '')
        }

        return shadeColor(colors[colorName], v, alpha / 100);
    }

    public handler = (): Record<string, Record<string, string>> => {
        const splited = this.className.split('__');

        if (!this.isValidColor()) {
            return {}
        }

        return {
            [this.className]: {
                [this.alloweds[splited[0]]]: this.getColor(
                    splited.slice(1).join('__')
                )
            }
        }
    }
}


export { Colors }