export const toPascalCase = (str: string, forceLowerCase = true) => {
    if (!str) {
        return str
    }

    const first = str[0].toUpperCase()
    const rest = forceLowerCase ? str.slice(1, str.length).toLowerCase() : str.slice(1, str.length)

    return `${first}${rest}`
}
