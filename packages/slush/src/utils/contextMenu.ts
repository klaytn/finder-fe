type Position = 'left' | 'right'

type PartialRect = {
    bottom: number
    left: number
    width: number
}

const DEFAULT_PARENT_DOM_RECT: PartialRect = {
    bottom: 0,
    left: 0,
    width: 0,
}

type GetContextMenuPositionParams = {
    position: Position
    contextMenuWidth: number
    parentDomRect?: PartialRect
    margin?: number
}

export const getContextMenuPosition = ({
    position,
    contextMenuWidth,
    parentDomRect,
    margin = 0,
}: GetContextMenuPositionParams) => {
    const { bottom, left, width } = parentDomRect || DEFAULT_PARENT_DOM_RECT

    return {
        left: position === 'left' ? left : left + width - contextMenuWidth,
        top: bottom + margin,
    }
}
