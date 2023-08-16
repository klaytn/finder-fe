import { FC } from 'react'

type IfProps = {
    condition: boolean
}

export const If: FC<IfProps> = ({ condition, children }) => {
    if (!condition) {
        return null
    }

    return <>{children}</>
}
