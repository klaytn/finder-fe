import { AbiItem } from 'caver-js'

export const getMethodSignature = ({ name, inputs = [] }: AbiItem) => {
    const argTypes = inputs.map(({ type }) => type)

    return `${name}(${argTypes.join(',')})`
}
