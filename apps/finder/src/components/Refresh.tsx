import styled from 'styled-components'

import { Button, RefreshIcon, Tooltip } from '@klaytn/slush'

export interface IRefreshProps {
    callback: () => void
}

const Refresh = ({ callback }: IRefreshProps) => {
    return (
        <Tooltip message="refresh">
            <BlockButton leftIcon={RefreshIcon} buttonType="forth" size={36} onClick={callback} />
        </Tooltip>
    )
}

const BlockButton = styled(Button)`
    border-radius: 10px;
    margin-left: 12px;
`

export default Refresh
