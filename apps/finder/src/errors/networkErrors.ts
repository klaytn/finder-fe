import { FinderError } from './commonErrors'

export class NetworkError extends FinderError {
    get name() {
        return 'Network Error'
    }
}

export class NotFoundError extends NetworkError {
    constructor(readonly path: string) {
        super()
    }

    get name() {
        return 'Notfound error'
    }
}
