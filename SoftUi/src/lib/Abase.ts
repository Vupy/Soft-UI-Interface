interface ILibBase {
    className: string;
    handler(): Record<string, Record<string, any | string>>
}


abstract class LibBase implements ILibBase {
    className: string = ''

    constructor(className: string = '') {
        this.className = className
    };

    public setClassName(className: string) {
        this.className = className
    }

    handler(): Record<string, Record<string, any>> {
        throw new Error("Method not implemented.")
    }
}

export { LibBase }