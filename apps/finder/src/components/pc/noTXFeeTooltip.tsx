import styled from 'styled-components'

import { colors } from '@klaytn/slush'

import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'
import InfoTooltip from '../commons/infoTooltip'

const NoTXFeeTooltip = () => {
    const methodColor = useFinderThemeColor(colors.white)

    return (
        <InfoTooltip
            marginLeft={5.5}
            marginTop={1}
            size={16}
            color={methodColor}
            message={<MessageContainer>There is no TX fee</MessageContainer>}
        />
    )
}

const MessageContainer = styled.div`
    text-align: center;
`

export default NoTXFeeTooltip
