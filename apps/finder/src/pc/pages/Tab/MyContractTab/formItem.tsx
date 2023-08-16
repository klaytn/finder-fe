import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { extractProp } from '../../../../functions/Functions'

type FormItemProps = {
    label: string
    children: ReactNode
    labelMarginBottom?: number
}

export const FormItem = ({ label, labelMarginBottom = 0, children }: FormItemProps) => {
    return (
        <FormItemContainer>
            <FormItemLabelText labelMarginBottom={labelMarginBottom}>{label}</FormItemLabelText>
            {children}
        </FormItemContainer>
    )
}

const FormItemContainer = styled(Flex).attrs({
    direction: 'column',
})`
    gap: 12px;
    flex-basis: 100%;
`

const FormItemLabelText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['14.18_400'],
    }),
)<{ labelMarginBottom: number }>`
    margin-bottom: ${extractProp('labelMarginBottom')}px;
`
