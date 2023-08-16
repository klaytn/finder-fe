import { ChangeEventHandler } from 'react'
import styled from 'styled-components'

import { Radio } from '@klaytn/slush'

import FilterItemBox from './filterItemBox'

type StatusFilterItemProps = {
    status: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

const StatusFilterItem = ({ status, onChange }: StatusFilterItemProps) => {
    return (
        <FilterItemBox title="Status">
            <Container>
                <Radio label="All" value="all" checked={status === 'all'} onChange={onChange} />
                <Radio label="Success" value="success" checked={status === 'success'} onChange={onChange} />
                <Radio label="Fail" value="fail" checked={status === 'fail'} onChange={onChange} />
            </Container>
        </FilterItemBox>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 48px;
`

export default StatusFilterItem
