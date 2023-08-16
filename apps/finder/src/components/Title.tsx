import BigNumber from 'bignumber.js'
import { MouseEventHandler, ReactNode, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ChevronLeftIcon, ChevronRightIcon, colors, Flex, If } from '@klaytn/slush'

import { Layout } from '../constants/layout'
import { useFinderThemeColor } from '../hooks/useFinderThemeColor'
import ContractButton from './ContractButton'
import { PageTitle } from './pc/pages'
import Refresh from './Refresh'

type TitleProps = {
    icon?: string
    alt: string
    title: string
    types: string[]
    tokenId?: string
    showTokenIdOnly?: boolean
}

export const ItemTitle = ({ icon, alt, title, types, tokenId, showTokenIdOnly = false }: TitleProps) => {
    const tokenIdColor = useFinderThemeColor(colors.blue[300])

    return (
        <ItemTitleContainer>
            <IconBox>
                {icon === undefined && <Unknown />}
                {icon !== undefined && <Icon src={icon} alt={alt} />}
            </IconBox>
            {title && <PageTitle style={{ marginLeft: 12 }}>{title}</PageTitle>}
            <If condition={showTokenIdOnly}>
                {tokenId ? (
                    <TitleTokenId style={{ color: tokenIdColor }}>#{tokenId}</TitleTokenId>
                ) : (
                    <div className="flex">
                        {types.map((type) => (
                            <ContractButtonContainer key={type}>
                                <ContractButton title={type} />
                            </ContractButtonContainer>
                        ))}
                    </div>
                )}
            </If>
            <If condition={!showTokenIdOnly}>
                {tokenId && <TitleTokenId style={{ color: tokenIdColor }}>#{tokenId}</TitleTokenId>}
                <div className="flex">
                    {types.map((type) => (
                        <ContractButtonContainer key={type}>
                            <ContractButton title={type} />
                        </ContractButtonContainer>
                    ))}
                </div>
            </If>
        </ItemTitleContainer>
    )
}

const TitleTokenId = styled(PageTitle)`
    margin-left: 4px;
    max-width: ${Layout.innerWidth}px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

type ListTitleProps = {
    onRefresh(): void
    title: string
    types: string[]
    decorator?: ReactNode
}

export const ListTitle = ({ onRefresh, title, types, decorator }: ListTitleProps) => {
    return (
        <ListTitleContainer>
            <LeftContainer>
                <PageTitle>{title}</PageTitle>
                <div className="flex">
                    {types.map((type) => (
                        <ContractButtonContainer key={type}>
                            <ContractButton title={type} />
                        </ContractButtonContainer>
                    ))}
                </div>
                <Refresh callback={onRefresh} />
            </LeftContainer>
            <RightContainer>{decorator}</RightContainer>
        </ListTitleContainer>
    )
}

const IconBox = styled.div`
    width: 36px;
    height: 36px;
`

const Unknown = styled.div`
    width: 28px;
    height: 28px;
    background-color: #d8d8d8;
    border-radius: 50%;
`

const ListTitleContainer = styled(Flex).attrs({
    justifyContent: 'space-between',
    direction: 'row',
})`
    align-items: center;
    width: 100%;
`

const ItemTitleContainer = styled(Flex).attrs({
    justifyContent: 'flex-start',
    direction: 'row',
})`
    align-items: center;
`

const LeftContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    direction: row;
    align-items: center;
`

const RightContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    direction: row;
    align-items: center;
`

const Icon = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #ffffff;
`

const ContractButtonContainer = styled.div`
    margin-left: 8px;
`

type BlockTitleProps = {
    id: BigNumber
    isGenesisBlock: boolean
}

export const BlockTitle = ({ id, isGenesisBlock }: BlockTitleProps) => {
    const titleDescColor = useFinderThemeColor(colors.blue[300])
    const handleMoveToPrevBlock: MouseEventHandler = useCallback(
        (event) => {
            if (isGenesisBlock) {
                event.preventDefault()
                return
            }
        },
        [isGenesisBlock],
    )

    return (
        <BlockTitleContainer>
            <BlockTitleChevronLeftContainer>
                <Link to={`/block/${id.minus(1)}`} onClick={handleMoveToPrevBlock}>
                    <ChevronLeftIcon color={titleDescColor} size={22} />
                </Link>
            </BlockTitleChevronLeftContainer>
            <PageTitle>
                {isGenesisBlock ? (
                    'Genesis Block'
                ) : (
                    <>
                        Block
                        <span style={{ color: titleDescColor, marginLeft: 4 }}>#{id.toString()}</span>
                    </>
                )}
            </PageTitle>
            <BlockTitleChevronRightContainer>
                <Link to={`/block/${id.plus(1)}`}>
                    <ChevronRightIcon color={titleDescColor} size={22} />
                </Link>
            </BlockTitleChevronRightContainer>
        </BlockTitleContainer>
    )
}

const BlockTitleContainer = styled.div`
    display: flex;
    transform: translateX(-40px);
`
const BlockTitleChevronLeftContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 11px;
    margin-right: 7px;

    > a {
        font-size: 0;
    }
`

const BlockTitleChevronRightContainer = styled(BlockTitleChevronLeftContainer)`
    margin-left: 7px;
    margin-right: 11px;
`

type DetailTitleProps = {
    title: string
}

export const DetailTitle = ({ title }: DetailTitleProps) => {
    return (
        <DetailTitleContainer>
            <PageTitle>{title}</PageTitle>
        </DetailTitleContainer>
    )
}

const DetailTitleContainer = styled.div``
