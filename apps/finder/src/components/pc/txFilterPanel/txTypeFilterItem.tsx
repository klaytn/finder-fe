import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { Button, ContextMenuItem, RefreshIcon, Select } from '@klaytn/slush'

import { transactionTypeMultipleQuery } from '../../../states/transaction'
import FilterItemBox from './filterItemBox'

type TxTypeFilterItemProps = {
    values: ContextMenuItem[]
    onChange: (values: ContextMenuItem[]) => void
    onReset: () => void
}

const TxTypeFilterItem = ({ values, onChange, onReset }: TxTypeFilterItemProps) => {
    const transactionTypeMultiple = useRecoilValue(transactionTypeMultipleQuery)

    const handleChange = useCallback(
        (...items: ContextMenuItem[]) => {
            onChange(items)
        },
        [onChange],
    )

    return (
        <FilterItemBox
            title="Transaction Type"
            decorator={<Button size={28} buttonType="forth" leftIcon={RefreshIcon} onClick={onReset} />}
        >
            <Select
                items={transactionTypeMultiple}
                multiple
                values={values}
                onChange={handleChange}
                placeholder="Please select TX type"
            />
        </FilterItemBox>
    )
}

export default TxTypeFilterItem
