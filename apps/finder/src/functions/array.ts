export const removeItem = <T>(arr: T[], startIndex: number, removeCount = 1) => {
    const clone = [...arr]
    clone.splice(startIndex, removeCount)

    return clone
}

export const replaceItem = <T>(arr: T[], index: number, item: T) => {
    const clone = [...arr]
    clone.splice(index, 1, item)

    return clone
}
