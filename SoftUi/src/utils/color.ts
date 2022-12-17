import { twoNumbers } from './formatter'

const shades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];


const shadeColor = (color: string, percent: number, alpha: number): string => {
    color = color.slice(1)

    const p = (percent - 500) / -5

    const r = parseInt(color.slice(0, 2), 16)
    const g = parseInt(color.slice(2, 4), 16)
    const b = parseInt(color.slice(4, 6), 16)

    let c = "rgba("
    const positions = []

    for (const i of [r, g, b]) {
        positions.push(parseInt(twoNumbers((0 | (1 << 8) + i + (256 - i) * p / 100).toString(16).slice(1)), 16))
    }

    return c + positions.join(', ') + ', ' + alpha + ')'
}

export {
    shadeColor,
    shades
}