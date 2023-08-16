export class ValueObserver<T> {
    constructor(private readonly _callback: (value: T) => void) {}

    notify(value: T) {
        this._callback(value)
    }
}

export class ObservableValue<T> {
    private _value: T
    private readonly _observerSet = new Set<ValueObserver<T>>()

    constructor(value: T) {
        this._value = value
    }

    get() {
        return this._value
    }

    set(newValue: T) {
        if (this._value === newValue) {
            return
        }

        this._value = newValue
        this.notifyChanged()
    }

    observe(observer: ValueObserver<T>) {
        this._observerSet.add(observer)
    }

    unobserveAll() {
        this._observerSet.clear()
    }

    private notifyChanged() {
        this._observerSet.forEach((observer) => observer.notify(this._value))
    }
}
