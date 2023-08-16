import { FinderError } from './commonErrors'

export class KaikasError extends FinderError {
    get name() {
        return 'Kaikas Error'
    }
}
