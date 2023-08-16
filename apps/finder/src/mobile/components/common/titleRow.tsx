import { ReactNode } from 'react'
import styled from 'styled-components'

import { Button, colors, Flex, RefreshIcon, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

type TitleRowProps = {
    title: string
    onRefresh?: () => void
    description?: string
    marginBottom?: number
    leftItem?: ReactNode
}

const TitleRow = ({ title, description, onRefresh, marginBottom = 20, leftItem }: TitleRowProps) => {
    const iconColor = useFinderThemeColor(colors.blue[400])

    return (
        <Container marginBottom={marginBottom}>
            {leftItem}
            <TitleText>{title}</TitleText>
            {onRefresh && (
                <IconButton onClick={onRefresh}>
                    <RefreshIcon size={14} color={iconColor} />
                </IconButton>
            )}
            {description && <DescriptionText>{description}</DescriptionText>}
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
})<{ marginBottom: number }>`
    align-items: center;
    margin-bottom: ${({ marginBottom }) => marginBottom}px;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['20.28_900'],
        color: colors.white,
    }),
)`
    margin-right: 3px;
`

const DescriptionText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['20.28_900'],
        color: colors.blue[300],
    }),
)`
    margin-left: 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const IconButton = styled(Button).attrs({
    size: 28,
    buttonType: 'third',
})`
    border-radius: 10px;
    width: 28px; ;
`

export default TitleRow
