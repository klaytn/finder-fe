import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, typos } from '@klaytn/slush'

import InfoButton from '../../../../components/commons/infoButton'
import { getThemeColor } from '../../../../functions/colorMap'

type RowProps = {
    title: ReactNode
    onClickInfo?: () => void
    additional?: ReactNode
    children?: ReactNode
}
const Row = ({ title, children, onClickInfo, additional }: RowProps) => {
    const info = onClickInfo ? <InfoButton onClick={onClickInfo} useQuestionIcon /> : null
    return (
        <RowContainer>
            <RowTitleContainer>
                <RowTitle>
                    {title}
                    {info}
                </RowTitle>
                {additional}
            </RowTitleContainer>
            {children}
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 48px;
`
const RowTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const RowTitle = styled.div`
    display: flex;
    flex-direction: row;
    ${typos.suit['14.18_700']};
    color: ${getThemeColor(colors.white)};
    gap: 6px;
`

export default Row
