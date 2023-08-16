import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, Flex, FormText, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { extractProp } from '../../../functions/Functions'

type FormItemProps = {
    label: string
    required?: boolean
    children: ReactNode
    requiredError?: boolean
    description?: string
    labelMarginBottom?: number
    additionalDescription?: ReactNode
}

export const FormItem = ({
    label,
    required = false,
    requiredError = false,
    description,
    labelMarginBottom = 0,
    additionalDescription,
    children,
}: FormItemProps) => {
    return (
        <FormItemContainer>
            <FormItemLabelText labelMarginBottom={labelMarginBottom}>
                {label}
                {required && <FormItemRequired>*</FormItemRequired>}
            </FormItemLabelText>
            {description && <FormItemDescription>{description}</FormItemDescription>}
            {additionalDescription}
            {children}
            {requiredError && <FormText errorMessage="Required" valid={false} />}
        </FormItemContainer>
    )
}

const FormItemContainer = styled(Flex).attrs({
    direction: 'column',
})`
    gap: 8px;
    flex-basis: 100%;
`

const FormItemLabelText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['14.18_900'],
    }),
)<{ labelMarginBottom: number }>`
    margin-bottom: ${extractProp('labelMarginBottom')}px;
`

const FormItemRequired = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.red[500],
        typo: typos.suit['14.18_900'],
    }),
)`
    margin-left: 4px;
`

const FormItemDescription = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.black[400],
        typo: typos.suit['12.16_400'],
    }),
)``
