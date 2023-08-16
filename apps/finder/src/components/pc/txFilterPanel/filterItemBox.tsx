import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Text, typos, withAlpha } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'

type FilterItemBoxProps = {
    title: string
    children: ReactNode
    required?: boolean
    decorator?: ReactNode
    description?: string
}

const FilterItemBox = ({ title, children, required = false, decorator, description }: FilterItemBoxProps) => {
    return (
        <Container>
            <TitleRow>
                <TitleCell>
                    <TitleText>{title}</TitleText>
                    {required && <RequiredText>*</RequiredText>}
                </TitleCell>
                {decorator}
            </TitleRow>
            {description && <DescRow>{description}</DescRow>}
            <ContentsRow>{children}</ContentsRow>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const TitleRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TitleCell = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['16.20_900'],
    }),
)``

const RequiredText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.red[500],
        typo: typos.suit['14.18_900'],
    }),
)``

const DescRow = styled.div`
    display: flex;
    margin-top: -8px;
    color: ${getThemeColor(withAlpha(colors.white, 35))};
    ${typos.suit['12.16_400']};
`

const ContentsRow = styled.div`
    display: flex;
    flex-direction: column;
`

export default FilterItemBox
