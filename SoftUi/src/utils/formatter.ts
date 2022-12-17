const twoNumbers = (c: number | string): string => c.toString().length == 1 ? `0${c}` : c.toString()

export {
    twoNumbers
}