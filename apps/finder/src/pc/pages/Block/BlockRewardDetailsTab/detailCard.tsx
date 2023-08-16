import BigNumber from 'bignumber.js'
import styled, { css } from 'styled-components'

import { colors, typos, withAlpha } from '@klaytn/slush'

import EllipsisNumber from '../../../../components/commons/ellipsisNumber'
import { useResources } from '../../../../context/configProvider'
import { getThemeColor } from '../../../../functions/colorMap'
import { klay } from '../../../../functions/Functions'

type DetailCardProps = {
    title: string
    amount: BigNumber
    width: number
    hasBorder?: boolean
}
const DetailCard = ({ title, amount, width, hasBorder }: DetailCardProps) => {
    const {
        keyCurrency: { gasUnit },
    } = useResources()

    return (
        <Container width={width} hasBorder={hasBorder}>
            <Title>{title}</Title>
            <Contents>
                <EllipsisNumber value={klay(amount)} noEllipsis />
                <Unit>{gasUnit}</Unit>
            </Contents>
        </Container>
    )
}

type ContainerProps = {
    hasBorder?: boolean
    width: number
}

const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    gap: 9px;
    background-color: ${getThemeColor(withAlpha(colors.white, 5))};
    border-radius: 16px;
    padding: 12px 24px;
    width: ${({ width, hasBorder }) => width - 48 - (hasBorder ? 2 : 0)}px;

    ${({ hasBorder }) =>
        hasBorder
            ? css`
                  border: 1px solid ${getThemeColor(colors.blue[400])};
              `
            : ''};
`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    color: ${getThemeColor(colors.blue[300])};
    ${typos.suit['14.18_700']};
`

const Contents = styled.div`
    display: flex;
    flex-direction: row;
    color: ${getThemeColor(colors.black[500])};
    ${typos.suit['16.20_400']};
`

const Unit = styled.div`
    margin-left: 4px;
    display: flex;
    flex-direction: row;
    color: ${getThemeColor(colors.black[500])};
    ${typos.suit['16.20_400']};
`

export default DetailCard
