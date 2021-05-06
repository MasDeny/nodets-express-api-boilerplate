export class Error422 extends Error {
    message: string
    constructor(message: string) {
        super(message)
        this.message = message
    }
}