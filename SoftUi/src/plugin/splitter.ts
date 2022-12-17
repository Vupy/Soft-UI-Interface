
import { Colors } from "../lib/colors/colors";
import { Cursors } from "../lib/cursors/cursors";
import { Fonts } from "../lib/fonts/fonts";
import { Layouts } from "../lib/layouts/layouts";
import { Opacity } from "../lib/opacity/opacity";
import { Rounders } from "../lib/rounders/rounders";
import { Shadows } from '../lib/shadows/shadows';
import { Sizes } from "../lib/sizes/sizes";
import { Spaces } from "../lib/spaces/spaces";
import { Transitions } from "../lib/transitions/transitions";
import { SplitterOptions } from "../types/splitter";


const effects: Record<string, string> = {
    hover: ':hover',
    focus: ':focus',
    invalid: ':invalid',
    valid: ':valid',
    required: ':required',
    active: ':active',
    checked: ':checked',
}

const applyEffect = (
    data: Record<string, Record<string, any>>,
    prefix: string,
    sufix: string
): Record<string, Record<string, any>> => {
    const keys: string[] = Object.keys(data)
    const result: Record<string, Record<string, any>> = {}

    for (const i of keys) {
        const name = i.replace("/", "\\/").replace(".", "\\.")
        result[`.${prefix}${name}${sufix}`] = data[i]
    }

    return result
}

const getEffect = (className: string): string[] => {
    let prefix = ""
    let sufix = ""

    if (className.includes(':')) {
        const effectClass = className.split(':')

        if (!effects[effectClass[0]]) {
            return ['', '', '']
        }

        className = className.replace(`${effectClass[0]}:`, '')
        prefix = effectClass[0] + '\\:'
        sufix = effects[effectClass[0]]
    }

    return [className, prefix, sufix]
}

const splitter = (opts: SplitterOptions): Record<string, Record<string, any>> => {
    let data = {}

    const alloweds = Array.from(new Set(opts.alloweds));
    const cls = [
        new Colors(),
        new Layouts(),
        new Sizes(),
        new Spaces(),
        new Fonts(),
        new Opacity(),
        new Transitions(),
        new Rounders(),
        new Cursors(),
        new Shadows(),
    ]

    for (const i of alloweds) {
        const [className, prefix, sufix] = getEffect(i)

        for (const j of cls) {
            j.setClassName(className)
            let result = j.handler()

            if (Object.keys(result).length > 0) {
                result = applyEffect(
                    result,
                    prefix,
                    sufix
                )
                data = { ...data, ...result }
                break
            }
        }
    }

    return data
}

export { splitter };