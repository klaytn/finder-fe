import {
    Children,
    cloneElement,
    createContext,
    ReactNode,
    isValidElement,
    useContext,
    MutableRefObject,
    UIEventHandler,
} from 'react'
import styled, { css, CSSProperties } from 'styled-components'

import { ChevronBottomIcon, ChevronTopIcon, colors, Flex, Tooltip, typos, withAlpha } from '@klaytn/slush'

import { Layout, Table as TableSize } from '../../../constants/layout'
import { getThemeColor } from '../../../functions/colorMap'
import { extractProp } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import EllipsisTooltip from '../ellipsisTooltip'
import ListCount from '../listCount'

type TableContextProps = {
    columnSizeList: number[]
}

const TableContext = createContext<TableContextProps>({
    columnSizeList: [],
})

export const useTableContext = () => {
    return useContext(TableContext)
}

const resizeForHideColumn = (columnSizeList: number[], hideColumnIndexList?: number[]) => {
    if (!hideColumnIndexList || hideColumnIndexList.length === 0) {
        return columnSizeList
    }

    const sumOfHideColumnSize = hideColumnIndexList.reduce(
        (prev, currentIndex) => prev + columnSizeList[currentIndex] + TableSize.gapWithColumn,
        0,
    )

    const showColumnCount = columnSizeList.length - hideColumnIndexList.length
    const marginSize = sumOfHideColumnSize / showColumnCount
    return columnSizeList.map((currentSize, currentIndex) =>
        hideColumnIndexList.includes(currentIndex) ? 0 : currentSize + marginSize,
    )
}

type TableProps = {
    children: ReactNode
    columnSizeList: number[]
    hideColumnIndexList?: number[]
    totalCount?: number
    limitCount?: number
    hideTotalCount?: boolean
    paddingTop?: number
    gapWithCount?: number
    decorator?: ReactNode
}
export const Table = ({
    children,
    columnSizeList,
    paddingTop = 32,
    totalCount,
    limitCount,
    hideTotalCount = false,
    gapWithCount = 40,
    hideColumnIndexList,
    decorator,
}: TableProps) => {
    const context: TableContextProps = {
        columnSizeList: resizeForHideColumn(columnSizeList, hideColumnIndexList),
    }

    return (
        <TableContext.Provider value={context}>
            <TableContainer>
                <TableTotalCountContainer paddingTop={paddingTop}>
                    <ListCount
                        marginBottom={gapWithCount}
                        hideTotalCount={hideTotalCount}
                        limitCount={limitCount}
                        totalCount={totalCount}
                    />
                    {decorator}
                </TableTotalCountContainer>
                {children}
            </TableContainer>
        </TableContext.Provider>
    )
}

const TableTotalCountContainer = styled.div<{ paddingTop: number }>`
    display: flex;
    flex-direction: row;
    padding-top: ${extractProp('paddingTop')}px;
    align-items: center;
    justify-content: space-between;
`

const TableContainer = styled(Flex)`
    width: ${Layout.innerWidth}px;
`

type TableHeadersProps = {
    children: ReactNode
}
export const TableHeaders = ({ children }: TableHeadersProps) => {
    return (
        <TableHeadersContainer direction="row">
            {Children.map(children, (child, order) => {
                if (isValidElement<TableHeaderProps>(child)) {
                    return cloneElement(child, { order })
                }

                return child
            })}
        </TableHeadersContainer>
    )
}

const TableHeadersContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    width: ${TableSize.width}px;
    gap: ${TableSize.gapWithColumn}px;
    border-bottom: 1px solid ${getThemeColor(withAlpha(colors.white, 35))};
`

type TableRowProps = {
    children: ReactNode
    failed?: boolean
    failMessage?: ReactNode
    expandedContents?: ReactNode
    isOpen?: boolean
    onToggle?: () => void
    segmentLastRow?: boolean
    newSegmentRow?: boolean
}
export const TableRow = ({
    children,
    failed = false,
    failMessage = '',
    expandedContents,
    isOpen,
    onToggle,
    segmentLastRow = false,
    newSegmentRow = false,
}: TableRowProps) => {
    const ToggleIcon = isOpen ? ChevronTopIcon : ChevronBottomIcon
    const iconColor = useFinderThemeColor(colors.white)

    const hasToggle = !!onToggle && !!expandedContents

    return (
        <TableRowOuterContainer newSegmentRow={newSegmentRow} segmentLastRow={segmentLastRow}>
            <TableRowContainer>
                {failed && (
                    <TableRowDecoratorContainer>
                        <Tooltip message={failMessage}>
                            <TableRowErrorIcon />
                        </Tooltip>
                    </TableRowDecoratorContainer>
                )}
                {Children.map(children, (child, order) => {
                    if (isValidElement<TableCellProps>(child)) {
                        return cloneElement(child, { order })
                    }

                    return child
                })}
                {hasToggle && (
                    <TableToggleButton tabIndex={-1} onClick={onToggle}>
                        <ToggleIcon size={20} color={iconColor} />
                    </TableToggleButton>
                )}
            </TableRowContainer>
            {isOpen && expandedContents}
        </TableRowOuterContainer>
    )
}

const TableRowContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    width: ${TableSize.width}px;
    height: ${TableSize.height}px;
    gap: ${TableSize.gapWithColumn}px;
    height: 52px;
    flex-shrink: 0;
`

const TableRowOuterContainer = styled(Flex).attrs<{ newSegmentRow: boolean; segmentLastRow: boolean }>({
    direction: 'column',
})<{ newSegmentRow: boolean; segmentLastRow: boolean }>`
    width: ${TableSize.width}px;

    ${({ segmentLastRow }) =>
        segmentLastRow
            ? ''
            : css`
                  border-bottom: 1px solid ${getThemeColor(withAlpha(colors.white, 10))};
              `}

    ${({ newSegmentRow }) =>
        newSegmentRow
            ? css`
                  border-top: 1px solid ${getThemeColor(withAlpha(colors.white, 35))};
              `
            : ''}

    transition: background-color 300ms ease-out;
    &:hover {
        background: ${getThemeColor(withAlpha(colors.white, 5))};
    }
`

const TableRowDecoratorContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    margin-right: -24px;
`

const TableToggleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
`

const TableRowErrorIcon = () => {
    const errorIconColor = useFinderThemeColor(colors.red[600])

    return (
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="12" height="18" rx="6" fill={errorIconColor} />
            <path
                d="M6.69464 4.3503C6.69464 3.85883 6.36715 3.41979 5.91797 3.41979C5.46879 3.41979 5.1413 3.85883 5.1413 4.3503V9.55379C5.1413 10.0453 5.46879 10.4843 5.91797 10.4843C6.36715 10.4843 6.69464 10.0453 6.69464 9.55379V4.3503ZM5.91797 14.4843C6.531 14.4843 7.02797 13.9873 7.02797 13.3743C7.02797 12.7613 6.531 12.2643 5.91797 12.2643C5.30493 12.2643 4.80797 12.7613 4.80797 13.3743C4.80797 13.9873 5.30493 14.4843 5.91797 14.4843Z"
                fill={colors.white}
                stroke={colors.white}
                strokeWidth="0.22"
            />
        </svg>
    )
}

type TableHeaderProps = {
    align?: CSSProperties['textAlign']
    order?: number
    width?: number
    paddingLeft?: number
    children?: ReactNode
    alignItems?: CSSProperties['alignItems']
}

export const TableHeader = ({ children, align, order, paddingLeft, alignItems }: TableHeaderProps) => {
    const { columnSizeList } = useContext(TableContext)

    const width = columnSizeList[order || 0]

    if (!width) {
        return null
    }

    return (
        <TableHeaderContainer align={align} width={width} paddingLeft={paddingLeft} alignItems={alignItems}>
            {children}
        </TableHeaderContainer>
    )
}
const TableHeaderContainer = styled(Flex).attrs<TableHeaderProps>(({ align = 'left' }) => ({
    direction: 'row',
    justifyContent: align,
}))<TableHeaderProps>`
    text-align: ${extractProp('align')};
    width: ${({ paddingLeft = 0, width }) => (width === undefined ? undefined : width - paddingLeft)}px;
    padding-bottom: 24px;
    padding-left: ${extractProp('paddingLeft')}px;
    color: ${getThemeColor(colors.white)};
    flex-shrink: 0;
    align-items: ${extractProp('alignItems')};
    ${typos.suit['14.18_400']};
`

type TableCellProps = {
    order?: number
    align?: CSSProperties['textAlign']
    children?: ReactNode
    color?: string
    bold?: boolean
    padding?: number
    tooltip?: boolean
    scroll?: boolean
}
export const TableCell = <T extends HTMLElement>({
    children,
    align,
    order,
    color,
    bold,
    padding = 0,
    tooltip = false,
    scroll = false,
    scrollAreaRef,
    onScroll,
}: TableCellProps & { scrollAreaRef?: MutableRefObject<T>; onScroll?: UIEventHandler<T> }) => {
    const { columnSizeList } = useContext(TableContext)

    const width = (columnSizeList[order || 0] || 0) - padding
    if (!width) {
        return null
    }

    return (
        <TableCellContainer width={width}>
            <TableCellSpan
                color={color}
                align={align}
                bold={bold}
                scroll={scroll}
                ref={scrollAreaRef}
                onScroll={onScroll}
            >
                {tooltip ? <EllipsisTooltip>{children}</EllipsisTooltip> : children}
            </TableCellSpan>
        </TableCellContainer>
    )
}

type TableCellContainer = {
    align?: CSSProperties['textAlign']
    width: number
}
const TableCellContainer = styled(Flex).attrs({
    justifyContent: 'center',
})<TableCellProps>`
    width: ${extractProp('width')}px;
    flex-shrink: 0;
    text-align: ${extractProp('align')};
`

const TableCellSpan = styled.span<TableCellProps>`
    text-align: ${extractProp('align')};
    ${({ bold }) => (bold ? typos.suit['14.18_900'] : typos.suit['14.18_400'])};
    color: ${extractProp('color')};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    overflow-x: ${({ scroll }) => (scroll ? 'scroll' : 'inherit')};
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
        display: none;
    }
`

export const TableTop = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'end',
})`
    margin-top: -16px;
    margin-bottom: 21px;
    flex-grow: 1;
`
