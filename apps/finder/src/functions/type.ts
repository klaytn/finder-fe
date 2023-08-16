export type NotString<T> =
    // eslint-disable-next-line @typescript-eslint/ban-types
    | Extract<T, Function>
    | Extract<T, null>
    | Extract<T, number>
    | Extract<T, undefined>
    | Extract<T, boolean>
    | Extract<T, Array<unknown>>
    | Extract<T, Map<unknown, unknown>>
    | Extract<T, Set<unknown>>

export type DeepStringOnly<T> = T extends { [K in keyof T]: NotString<T[K]> }
    ? never
    : T extends { [K in keyof T]: string | DeepStringOnly<T[K]> }
    ? T
    : never
