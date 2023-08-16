import { FC, isValidElement, ReactChild, ReactFragment, ReactPortal } from 'react'

export function findChildComponent<T>(targetComponent: FC<T>) {
    return function (child: ReactChild | ReactFragment | ReactPortal) {
        if (!isValidElement(child)) {
            return false
        }

        return child.type === targetComponent
    }
}

export function filterChildComponent<T>(targetComponent: FC<T>) {
    return function (child: ReactChild | ReactFragment | ReactPortal) {
        if (!isValidElement(child)) {
            return true
        }

        if (child.type !== targetComponent) {
            return true
        }

        return false
    }
}
