export function group<T>(arr: T[] | ReadonlyArray<T>, groupSize: number) {
    const result: T[][] = []

    let nextGroup: T[] = []
    for (const item of arr) {
        nextGroup.push(item)
        if (nextGroup.length >= groupSize) {
            result.push(nextGroup)
            nextGroup = []
        }
    }

    if (nextGroup.length !== 0 && nextGroup.length < groupSize) {
        result.push(nextGroup)
    }

    return result
}

export function split<T>(arr: T[] | ReadonlyArray<T>, count: number) {
    const clone = [...arr]
    const result: T[][] = []

    const itemCount = Math.floor(arr.length / count)
    let restCount = count

    while (clone.length) {
        const predictCount = clone.length / itemCount
        const currentItemCount = predictCount > restCount ? itemCount + 1 : itemCount
        result.push(clone.splice(0, currentItemCount))
        restCount--
    }

    return result
}
