import styled from 'styled-components'

import { colors, typos } from '@klaytn/slush'

import { getThemeColor } from '../../functions/colorMap'
import { extractProp, withCommas } from '../../functions/Functions'

type ListCountProps = {
    totalCount?: number
    limitCount?: number
    hideTotalCount?: boolean
    marginBottom?: number
}

const ListCount = ({ totalCount, limitCount, hideTotalCount, marginBottom = 0 }: ListCountProps) => {
    const hasTotalCount = totalCount !== undefined
    const hasLimitCount = limitCount !== undefined
    const hasBothCount = hasTotalCount && hasLimitCount

    const showLast = hasBothCount && totalCount >= limitCount
    const showDisplay =
        !hideTotalCount && ((hasTotalCount && !hasLimitCount) || (hasBothCount && totalCount < limitCount))
    const showCount = showLast || showDisplay

    if (!showCount) {
        return null
    }

    const count = showLast ? limitCount : totalCount || 0
    const showingText = showLast ? 'Showing the last ' : 'Displaying '

    return (
        <Container marginBottom={marginBottom}>
            <Description>
                {showingText}
                <NumberDescription>{withCommas(count)}</NumberDescription> records
            </Description>
        </Container>
    )
}

const Container = styled.div<{ marginBottom: number }>`
    display: flex;
    flex-direction: row;
    margin-bottom: ${extractProp('marginBottom')}px;
`

const Description = styled.span`
    color: ${getThemeColor(colors.black[400])};
    ${typos.suit['14.18_400']};
`

const NumberDescription = styled(Description)`
    ${typos.suit['14.18_900']};
    color: ${getThemeColor(colors.blue[400])};
`

export default ListCount
