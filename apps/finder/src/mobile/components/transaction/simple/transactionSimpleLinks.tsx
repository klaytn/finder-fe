import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { useTransaction } from '../../../../api/transaction'
import { ROUTES } from '../../../../constants/routes'
import { useResources } from '../../../../context/configProvider'
import { getThemeColor } from '../../../../functions/colorMap'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'

type TransactionSimpleLinksProps = {
    hash: string
}

const TransactionSimpleLinks = ({ hash }: TransactionSimpleLinksProps) => {
    const transactionHref = `/tx/${hash}`
    const { LogoComponent } = useResources()
    const { hasNftTransfer, hasTokenTransfer } = useTransaction(hash)

    const links = useMemo(() => {
        const result = [
            {
                title: 'Event logs',
                to: `${transactionHref}?tabId=eventLog`,
            },
            {
                title: 'Internal transactions',
                to: `${transactionHref}?tabId=internalTx`,
            },
            {
                title: 'Input data',
                to: `${transactionHref}?tabId=inputData`,
            },
        ]

        if (hasNftTransfer) {
            result.unshift({
                title: 'Nft transfers',
                to: `${transactionHref}?tabId=nftTransfer`,
            })
        }

        if (hasTokenTransfer) {
            result.unshift({
                title: 'Token transfers',
                to: `${transactionHref}?tabId=tokenTransfer`,
            })
        }

        return result
    }, [transactionHref, hasNftTransfer, hasTokenTransfer])

    const whiteColor = useFinderThemeColor(colors.white)

    return (
        <Container direction="column">
            <TitleText typo={typos.suit['14.18_900']} color={whiteColor}>
                Quick Links
            </TitleText>
            <LinkRow direction="row">
                <LinkItem title={links[0].title} to={links[0].to} />
                <LinkItem title={links[1].title} to={links[1].to} paddingLeft={21} />
            </LinkRow>
            <LinkRow direction="row">
                <LinkItem title={links[2].title} to={links[2].to} />
                {links[3] && <LinkItem title={links[3].title} to={links[3].to} paddingLeft={21} />}
            </LinkRow>
            {links[4] && (
                <LinkRow direction="row">
                    <LinkItem title={links[4].title} to={links[4].to} />
                </LinkRow>
            )}

            <BottomContainer direction="row" justifyContent="center">
                <CopyrightText typo={typos.suit['12.16_400']} color={whiteColor}>
                    Powered by
                </CopyrightText>
                <LogoLink to={ROUTES.HOME}>
                    <LogoComponent width={94} height={14} />
                </LogoLink>
            </BottomContainer>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 28px;
`

const TitleText = styled(Text)`
    margin-bottom: 16px;
`

const LinkRow = styled(Flex)`
    margin-bottom: 12px;
`

type LinkItemProps = {
    title: string
    to: string
    paddingLeft?: number
}
const LinkItem = ({ title, to, paddingLeft = 0 }: LinkItemProps) => {
    const color = useFinderThemeColor(colors.white)

    return (
        <LinkContainer direction="row" paddingLeft={paddingLeft}>
            <Point />
            <LinkWrapper to={to}>
                <LinkText typo={typos.suit['12.16_400']} color={color}>
                    {title}
                </LinkText>
            </LinkWrapper>
        </LinkContainer>
    )
}

const LinkContainer = styled(Flex)<{ paddingLeft: number }>`
    align-items: center;
    width: 50%;
    padding-left: ${({ paddingLeft }) => paddingLeft}px;
`

const Point = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 8px;
    padding: 0px;
    background-color: ${getThemeColor(colors.white)};
`

const LinkWrapper = styled(Link)`
    display: inline-flex;
`

const LinkText = styled(Text)`
    text-decoration: underline;
`

const BottomContainer = styled(Flex)`
    align-items: center;
    opacity: 0.5;
    margin-top: 28px;
`

const CopyrightText = styled(Text)`
    margin-right: 5px;
`

const LogoLink = styled(Link)`
    font-size: 0;
`

export default TransactionSimpleLinks
