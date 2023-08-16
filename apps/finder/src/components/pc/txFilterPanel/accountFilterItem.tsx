import { ChangeEventHandler } from 'react'
import styled from 'styled-components'

import { colors, Input, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import FilterItemBox from './filterItemBox'

type AccountFilterItemProps = {
    from: string
    onFromChange: ChangeEventHandler<HTMLInputElement>
    onFromClear: () => void
    to: string
    onToChange: ChangeEventHandler<HTMLInputElement>
    onToClear: () => void
    feePayer: string
    onFeePayerChange: ChangeEventHandler<HTMLInputElement>
    onFeePayerClear: () => void
}

const AccountFilterItem = ({
    from,
    to,
    feePayer,
    onFromChange,
    onToChange,
    onFeePayerChange,
    onFromClear,
    onToClear,
    onFeePayerClear,
}: AccountFilterItemProps) => {
    return (
        <FilterItemBox
            title="Account"
            description="Address filters are applied with ‘AND’ conditional statements."
            required
        >
            <Container>
                <InputRow
                    label="From"
                    placeholder="from address"
                    value={from}
                    onChange={onFromChange}
                    onClear={onFromClear}
                />
                <InputRow label="To" placeholder="to address" value={to} onChange={onToChange} onClear={onToClear} />
                <InputRow
                    label="Fee payer"
                    placeholder="fee payer address"
                    value={feePayer}
                    onChange={onFeePayerChange}
                    onClear={onFeePayerClear}
                />
            </Container>
        </FilterItemBox>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

type InputRowProps = {
    label: string
    value: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLInputElement>
    onClear: () => void
}

const InputRow = ({ label, value, onChange, onClear }: InputRowProps) => {
    return (
        <InputRowContainer>
            <InputRowLabelText>{label}</InputRowLabelText>
            <Input value={value} onChange={onChange} hasClearButton onClear={onClear} outerStyle={{ width: 254 }} />
        </InputRowContainer>
    )
}

const InputRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;
`

const InputRowLabelText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.black[400],
        typo: typos.suit['14.18_400'],
    }),
)`
    width: 70px;
`

export default AccountFilterItem
