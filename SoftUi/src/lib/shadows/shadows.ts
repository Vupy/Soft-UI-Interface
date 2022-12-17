import { shadeColor, shades } from '../../utils/color';
import { colors } from '../../vars/colors';
import { LibBase } from '../Abase';

class Shadows extends LibBase {
    alloweds: Record<string, number[]> = {
        none: [],
        sm: [0, 1, 2, 0],
        no: [0, 1, 3, 0],
        md: [0, 4, 6, -1],
        lg: [0, 10, 15, -3],
        xl: [0, 20, 25, -5],
        '2xl': [0, 25, 50, -12],
        '3xl': [0, 35, 55, -15],
        '4xl': [0, 50, 60, -18],
    }

    positions: Record<string, number[]> = {
        center: [0, 0, -1],
        left: [-1, 0, 1],
        right: [1, 0, 1],
        top: [0, -1, 1],
        bottom: [0, 1, 1],
        topleft: [-1, -1, 1],
        topright: [1, -1, 1],
        bottomleft: [-1, 1, 1],
        bottomright: [1, 1, 1],
    }

    private getAlphaColorName = (numbers: string[], colorName: string): [string, number] => {
        let alpha = 100

        if (numbers.length > 1) {
            alpha = Number(numbers[1])

            if (alpha > 100 || alpha < 0) {
                return ['', 0]
            }

            colorName = colorName.replace(`__${numbers[0]}/${numbers[1]}`, '')
        }

        return [colorName, alpha]
    }

    private getColor = (): [string, number, number] => {
        const splitted = this.className.split("__");

        if (splitted.length < 3) {
            return ['black', 500, 1];
        }

        let colorName = splitted.slice(3).join("__")
        let v = 500
        let alpha = 100

        if (colorName.match(/\d+/g)) {
            const numbers = colorName.match(/\d+/g) as string[]
            v = Number(numbers[0])
            alpha = Number(numbers[1] ?? 100)

            if (!shades.includes(v)) {
                return ['', 0, 0];
            }

            [colorName, alpha] = this.getAlphaColorName(numbers, colorName)

            colorName = colorName.replace(`__${v}`, '')
        }

        return [colorName, v, alpha / 100];
    }
    
    private isValidShadow = (): boolean => {
        const splitted = this.className.split("__");

        if (!this.className.startsWith("shadow")) {
            return false;
        }

        const type = splitted[1] ?? 'no';
        const position = splitted[2] ?? 'bottom';
        const color = this.getColor()

        if (!this.alloweds[type]) {
            return false;
        }

        if (!this.positions[position]) {
            return false;
        }

        if (!colors[color[0]]) {
            return false;
        }

        return true;
    }

    private generateShadow = (): Record<string, Record<string, any>> => {
        const splitted = this.className.split("__");
        const type = splitted[1] ?? 'no';
        const position = this.positions[splitted[2] ?? 'bottom'];
        const [colorName, percent, alpha] = this.getColor();

        console.log(this.getColor());
        
        const color = shadeColor(colors[colorName], percent, alpha);

        if (type === 'none') {
            return {
                [this.className]: {
                    'box-shadow': 'none'
                }
            }
        }

        let sizes = this.alloweds[type]

        sizes[0] = sizes[1] * position[0]
        sizes[1] = sizes[1] * position[1]
        sizes[3] = sizes[3] * position[2]

        console.log(sizes.join('px ') + 'px ' + color);
        

        return {
            [this.className]: {
                'box-shadow': sizes.join('px ') + 'px ' + color
            }
        }
    }

    public handler(): Record<string, Record<string, any>> {
        if (!this.isValidShadow()) {
            return {}
        }

        return this.generateShadow()
    }
}

export { Shadows }