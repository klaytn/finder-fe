export class DeferredPromise<T = void> implements Promise<T> {
    private readonly _promise

    private _resolve?: (value: T) => void
    private _reject?: (reason: unknown) => void

    constructor() {
        this._promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve
            this._reject = reject
        })
    }

    resolve(value: T) {
        this._resolve?.(value)
    }

    reject(reason: unknown) {
        this._reject?.(reason)
    }

    then<TResult1 = T, TResult2 = never>(
        onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
        onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null | undefined,
    ): Promise<TResult1 | TResult2> {
        return this._promise.then(onFulfilled, onRejected)
    }

    catch<TResult = never>(
        onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null | undefined,
    ): Promise<T | TResult> {
        return this._promise.catch(onRejected)
    }

    finally(onFinally?: (() => void) | null | undefined): Promise<T> {
        return this._promise.finally(onFinally)
    }

    get [Symbol.toStringTag]() {
        return this._promise[Symbol.toStringTag]
    }
}
