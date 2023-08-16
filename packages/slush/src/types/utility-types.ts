export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ValuesType<T extends ReadonlyArray<unknown> | ArrayLike<unknown> | Record<keyof T, unknown>> =
    T extends ReadonlyArray<unknown>
        ? T[number]
        : T extends ArrayLike<unknown>
        ? T[number]
        : T extends object
        ? T[keyof T]
        : never
