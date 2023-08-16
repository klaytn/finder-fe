import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ChevronRightIcon, colors, Flex, Text, typos } from '@klaytn/slush'

import { useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'

type TransactionTitleProps = {
    hash: string
    simpleView?: boolean
}

const TransactionTitle = ({ hash, simpleView = false }: TransactionTitleProps) => {
    const linkText = simpleView ? 'Developer view' : 'Simple view'
    const linkTo = simpleView ? `/tx/${hash}` : `/tx/${hash}/simple`

    const colorSet = useFinderThemeColorSet({
        title: colors.white,
        viewLink: colors.blue[500],
        hashText: colors.white,
    })

    return (
        <Container direction="column">
            <TopContainer direction="row" justifyContent="space-between">
                <Text color={colorSet.title} typo={typos.suit['20.28_900']}>
                    Transaction
                </Text>
                <Link to={linkTo}>
                    <LinkContainer direction="row">
                        <LinkText color={colorSet.viewLink} typo={typos.suit['12.16_900']}>
                            {linkText}
                        </LinkText>
                        <ChevronRightIcon color={colorSet.viewLink} size={14} />
                    </LinkContainer>
                </Link>
            </TopContainer>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 14px;
`

const TopContainer = styled(Flex)`
    align-items: center;
    margin-bottom: 12px;
`

const LinkContainer = styled(Flex)`
    align-items: center;
`

const LinkText = styled(Text)`
    margin-right: 5px;
`

export default TransactionTitle
