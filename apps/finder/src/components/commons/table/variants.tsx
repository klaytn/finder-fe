import BigNumber from 'bignumber.js'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'
import styled, { CSSProperties, FlattenSimpleInterpolation } from 'styled-components'

import { ArrowRightIcon, colors, Flex, typos, Text, Tooltip, ScrollIndicator, useScrollIndicator } from '@klaytn/slush'

import { AddressInfo } from '../../../api/api'
import { getThemeColor } from '../../../functions/colorMap'
import { extractProp, formatDatetime, klay, transactionType, withCommas } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import TimesAgo from '../../../mobile/components/common/timesAgo'
import Address from '../../Address'
import Copy from '../Copy'
import EllipsisNumber from '../ellipsisNumber'
import { TableCell, TableHeader } from './basic'

type TableCellBasicProps = {
    order?: number
    color?: string
    align?: CSSProperties['textAlign']
    padding?: number
}

type TableNumberCellProps = TableCellBasicProps & {
    value: number | string | BigNumber
    fractionColor?: string
}
export const TableNumberCell = ({ value, align = 'right', color, fractionColor, ...props }: TableNumberCellProps) => {
    return (
        <TableCell {...props} align={align}>
            <TableNumberCellInnerWrapper>
                <EllipsisNumber
                    value={withCommas(value)}
                    integerColor={color || colors.white}
                    fractionColor={fractionColor || color || colors.black[400]}
                    additionalCss={typos.suit['14.18_400']}
                />
            </TableNumberCellInnerWrapper>
        </TableCell>
    )
}

const TableNumberCellInnerWrapper = styled.div``

type TableTimesAgoCellProps = TableCellBasicProps & {
    value: string | Date
    format?: 'short' | 'long'
}
export const TableTimesAgoCell = ({
    value,
    color = colors.black[400],
    align = 'left',
    format = 'short',
    ...props
}: TableTimesAgoCellProps) => {
    const themeColor = useFinderThemeColor(color)
    const datetime = typeof value === 'string' ? new Date(value) : value

    return (
        <TableCell {...props} align={align} color={themeColor}>
            <TableTimesAgoContainer align={align}>
                <Tooltip message={formatDatetime(datetime)} containerAlign={align}>
                    <TimesAgo datetime={datetime} short={format === 'short'} />
                </Tooltip>
            </TableTimesAgoContainer>
        </TableCell>
    )
}

const TableTimesAgoContainer = styled.div<{ align: CSSProperties['textAlign'] }>`
    display: flex;
    justify-content: ${extractProp('align')};
`

type KlayBoxProps = {
    value: number | string | BigNumber
    length?: number
    symbol?: string
    isUnlimited?: boolean
    marginRight?: number
} & Pick<TableCellBasicProps, 'align'>

export const KlayBox = ({ align, value, length, symbol, isUnlimited = false, marginRight = 0 }: KlayBoxProps) => {
    return (
        <KlayCellContainer align={align} marginRight={marginRight}>
            <KlayContainer align={align}>
                {isUnlimited ? (
                    <Tooltip message={klay(value, length)}>Unlimited</Tooltip>
                ) : (
                    <EllipsisNumber
                        alwaysShowFraction
                        value={klay(value, length)}
                        integerColor={colors.white}
                        fractionColor={colors.black[400]}
                        additionalCss={typos.suit['14.18_400']}
                    />
                )}
            </KlayContainer>
            {!!symbol && <SymbolContainer>{symbol}</SymbolContainer>}
        </KlayCellContainer>
    )
}

type TableKlayCellProps = TableCellBasicProps & KlayBoxProps

export const TableKlayCell = ({
    value,
    length,
    symbol,
    align,
    marginRight = 0,
    isUnlimited = false,
    ...props
}: TableKlayCellProps) => {
    return (
        <TableCell {...props} align={align}>
            <KlayBox
                value={value}
                length={length}
                symbol={symbol}
                align={align}
                marginRight={marginRight}
                isUnlimited={isUnlimited}
            />
        </TableCell>
    )
}

const KlayCellContainer = styled(Flex).attrs<{ align: CSSProperties['textAlign']; marginRight: number }>(
    ({ align }) => ({
        direction: 'row',
        justifyContent: align,
    }),
)<{ align: CSSProperties['textAlign']; marginRight: number }>`
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    margin-right: ${extractProp('marginRight')}px;
`

const KlayContainer = styled.div<{ align: CSSProperties['textAlign'] }>`
    justify-content: ${extractProp('align')};
    display: flex;
    flex-shrink: 1;
    flex-grow: 1;
    color: ${getThemeColor(colors.white)};
`

const SymbolContainer = styled(Flex)`
    margin-left: 8px;
    color: ${getThemeColor(colors.black[400])};
    ${typos.suit['14.18_400']};
    flex-shrink: 0;
`

type TableHashCellProps = Pick<TableCellBasicProps, 'order'> & {
    value: string | AddressInfo
    icon?: boolean
    failed?: boolean
    noLink?: boolean
}
export const TableHashCell = ({ value, order, icon = false, failed, noLink = false }: TableHashCellProps) => {
    return (
        <TableCell order={order} align="left" padding={failed ? 16 : 0}>
            <Address value={value} noIcon={!icon} failed={failed} noLink={noLink} />
        </TableCell>
    )
}

type TableLinkCellProps = Pick<TableCellBasicProps, 'order' | 'padding'> & {
    value: number | string
    link: string
}
export const TableLinkCell = ({ value, link, ...props }: TableLinkCellProps) => {
    const themeColor = useFinderThemeColor(colors.white)

    return (
        <TableCell {...props} color={themeColor}>
            <TableLink to={link}>{value}</TableLink>
        </TableCell>
    )
}

const TableLink = styled(Link)`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_900']};
    &:hover {
        text-decoration: underline;
    }
`

type TableBlockIdCellProps = Pick<TableCellBasicProps, 'order' | 'padding'> & {
    value: number | string
}
export const TableBlockIdCell = ({ value, ...props }: TableBlockIdCellProps) => {
    return <TableLinkCell value={`#${value}`} link={`/block/${value}`} {...props} />
}

const formatKeyword = (name: string, keyword: string) => {
    return keyword === ''
        ? name
        : reactStringReplace(name, keyword, (match, index) => (
              <SearchMatchedSpan key={index}>{match}</SearchMatchedSpan>
          ))
}

type NameWithIconProps = {
    name: ReactNode
    link: string
    iconUri?: string
    iconAlt?: string
    keyword?: string
    justifyContent?: CSSProperties['justifyContent']
    openInNewPage?: boolean
}

export const NameWithIcon = ({
    name,
    link,
    iconUri,
    iconAlt,
    keyword = '',
    justifyContent,
    openInNewPage = false,
}: NameWithIconProps) => {
    const searchName = typeof name === 'string' ? formatKeyword(name, keyword) : name

    const target = openInNewPage ? '_blank' : undefined

    return (
        <TableNameWithIconCellContainer justifyContent={justifyContent}>
            <IconLink to={link} target={target}>
                {iconUri ? <IconImg src={iconUri} alt={iconAlt} /> : <DummyIcon />}
            </IconLink>
            <NameLink to={link} target={target}>
                {searchName}
            </NameLink>
        </TableNameWithIconCellContainer>
    )
}

type TableNameWithIconCellProps = Pick<TableCellBasicProps, 'order'> & NameWithIconProps

export const TableNameWithIconCell = ({
    name,
    link,
    iconUri,
    iconAlt,
    keyword,
    openInNewPage,
    ...props
}: TableNameWithIconCellProps) => {
    return (
        <TableCell {...props} align="left">
            <NameWithIcon
                name={name}
                link={link}
                iconUri={iconUri}
                iconAlt={iconAlt}
                keyword={keyword}
                openInNewPage={openInNewPage}
            />
        </TableCell>
    )
}

const TableNameWithIconCellContainer = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 12px;
    align-items: center;
`

const IconLink = styled(Link)`
    font-size: 1px;
`

const IconImg = styled.img`
    margin-top: 2px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${colors.white};
`

const DummyIcon = styled.div`
    margin-top: 2px;
    width: 28px;
    height: 28px;
    background-color: ${getThemeColor(colors.black[300])};
    border-radius: 50%;
`

const NameLink = styled(Link)`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_400']};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const SearchMatchedSpan = styled.span`
    font-weight: bold;
    color: ${getThemeColor(colors.blue[400])};
`

export const TableArrowHeader = ({ order }: Pick<TableCellBasicProps, 'order'>) => {
    const themeColor = useFinderThemeColor(colors.white)

    return (
        <TableHeader alignItems="baseline" order={order}>
            <ArrowRightIcon size={12} color={themeColor} />
        </TableHeader>
    )
}

type TableFromToHeaderProps = Pick<TableCellBasicProps, 'order'>

export const TableFromToHeader = ({ order }: TableFromToHeaderProps) => {
    const themeColor = useFinderThemeColor(colors.white)

    return (
        <TableHeader order={order} alignItems="baseline">
            <TableFromToHeaderContainer>
                <TableFromToHeaderTitle>From</TableFromToHeaderTitle>
                <ArrowRightIcon size={12} color={themeColor} />
                <TableFromToHeaderTitle>To</TableFromToHeaderTitle>
            </TableFromToHeaderContainer>
        </TableHeader>
    )
}

const TableFromToHeaderContainer = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
    gap: 12px;
    width: 100%;
`

const TableFromToHeaderTitle = styled(Flex)`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    padding-left: 24px;
`

type TableFromToCellProps = Pick<TableCellBasicProps, 'order'> & {
    from: string | AddressInfo
    to?: string | AddressInfo
    failed?: boolean
    selectedAddress?: string
    maxWidth?: number
}

export const TableFromToCell = ({ from, to, failed, selectedAddress, ...props }: TableFromToCellProps) => {
    const addressProps = {
        failed,
        leftLength: 6,
        rightLength: 4,
    } as const

    const arrowColor = failed ? colors.red[600] : colors.white
    const themeArrowColor = useFinderThemeColor(arrowColor)

    return (
        <TableCell {...props}>
            <TableFromToCellContainer>
                <Address value={from} {...addressProps} selectedAddress={selectedAddress} grow={1} basis={0} />
                {to ? (
                    <>
                        <ArrowRightIcon size={12} color={themeArrowColor} />
                        <Address value={to} {...addressProps} selectedAddress={selectedAddress} grow={1} basis={0} />
                    </>
                ) : (
                    <>
                        <TableFromToCellDummyIcon />
                        <TableFromToCellDummyArea />
                    </>
                )}
            </TableFromToCellContainer>
        </TableCell>
    )
}

const TableFromToCellContainer = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
    gap: 12px;
    width: 100%;
`

const TableFromToCellDummyIcon = styled.div`
    width: 12px;
`
const TableFromToCellDummyArea = styled.div`
    display: flex;
    flex-grow: 1;
`

type TableCopyCellProps = TableCellBasicProps & {
    value: string
    message: string
    justifyContent?: CSSProperties['justifyContent']
}

export const TableCopyCell = ({
    value,
    message,
    color = colors.white,
    justifyContent,
    ...props
}: TableCopyCellProps) => {
    const themeColor = useFinderThemeColor(color)

    return (
        <TableCell {...props}>
            <TableTokenIdCellContainer justifyContent={justifyContent}>
                <TableCopyCellText color={themeColor}>{value}</TableCopyCellText>
                <Copy value={value} message={message} />
            </TableTokenIdCellContainer>
        </TableCell>
    )
}

const TableCopyCellText = styled(Text).attrs<TableCellBasicProps>(({ color }) => ({
    color,
    typo: typos.suit['14.18_400'],
}))`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
`

type TokenIdBoxProps = Pick<TableCellBasicProps, 'align'> & {
    tokenId: string
    contractAddress: string
    copyButtonPosition: 'left' | 'right' | 'none'
    openInNewPage?: boolean
}

export const TokenIdBox = ({
    align = 'right',
    tokenId,
    contractAddress,
    copyButtonPosition,
    openInNewPage = false,
}: TokenIdBoxProps) => {
    return (
        <TableTokenIdCellContainer>
            {copyButtonPosition === 'left' && <Copy value={tokenId} message="Token ID copied." />}
            <TableTokenIdCellLink
                align={align}
                to={`/nft/${contractAddress}/${tokenId}`}
                target={openInNewPage ? '_blank' : undefined}
            >
                {tokenId}
            </TableTokenIdCellLink>
            {copyButtonPosition === 'right' && <Copy value={tokenId} message="Token ID copied." />}
        </TableTokenIdCellContainer>
    )
}

type TableTokenIdCellProps = Pick<TableCellBasicProps, 'order'> & TokenIdBoxProps

export const TableTokenIdCell = ({
    tokenId,
    contractAddress,
    align,
    copyButtonPosition,
    openInNewPage,
    ...props
}: TableTokenIdCellProps) => {
    return (
        <TableCell {...props}>
            <TokenIdBox
                align={align}
                tokenId={tokenId}
                contractAddress={contractAddress}
                copyButtonPosition={copyButtonPosition}
                openInNewPage={openInNewPage}
            />
        </TableCell>
    )
}

const TableTokenIdCellContainer = styled(Flex).attrs({
    direction: 'row',
})<{ justifyContent?: CSSProperties['justifyContent'] }>`
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent || 'flex-end'};
    overflow: hidden;
    white-space: nowrap;
    gap: 2px;
`

const TableTokenIdCellLink = styled(Link)<Pick<TableCellBasicProps, 'align'>>`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_900']};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1;
    text-align: ${extractProp('align')};

    &:hover {
        text-decoration: underline;
    }
`

type TableTxTypeCellProps = Pick<TableCellBasicProps, 'order'> & {
    type: string
}

export const TableTxTypeCell = ({ order, type }: TableTxTypeCellProps) => {
    const whiteColor = useFinderThemeColor(colors.white)
    const txType = transactionType(type)
    const isEllipsisTxType = txType.includes('...')

    return (
        <TableCell order={order} color={whiteColor}>
            <Tooltip message={isEllipsisTxType ? type : ''} containerAlign="flex-start">
                {txType}
            </Tooltip>
        </TableCell>
    )
}

type TableScrollCellProps = TableCellBasicProps & {
    children: ReactNode
    height: number
    paddingTop?: number
}

export const TableScrollCell = ({ children, height, paddingTop = 0, ...restProps }: TableScrollCellProps) => {
    const { handleScroll, indicatorState, indicatorWidth, scrollAreaRef } = useScrollIndicator<HTMLDivElement>()

    return (
        <TableCell {...restProps} scroll scrollAreaRef={scrollAreaRef} onScroll={handleScroll}>
            <TableScrollCellOuterContainer paddingTop={paddingTop}>
                <ScrollIndicator width={indicatorWidth} height={height} state={indicatorState} />
                <TableScrollCellContainer>{children}</TableScrollCellContainer>
            </TableScrollCellOuterContainer>
        </TableCell>
    )
}

const TableScrollCellContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const TableScrollCellOuterContainer = styled.div<{ paddingTop: number }>`
    padding-top: ${extractProp('paddingTop')}px;
`

type TableTextCellProps = TableCellBasicProps & {
    value: string
    typo: FlattenSimpleInterpolation
    color?: string
}
export const TableTextCell = ({ value, typo, color = colors.white, ...props }: TableTextCellProps) => {
    return (
        <TableCell {...props}>
            <TableTextCellSpan typo={typo} color={color}>
                {value}
            </TableTextCellSpan>
        </TableCell>
    )
}

const TableTextCellSpan = styled.span<{ typo: FlattenSimpleInterpolation; color: string }>`
    ${extractProp('typo')};
    color: ${getThemeColor(({ color }) => color)};
`
