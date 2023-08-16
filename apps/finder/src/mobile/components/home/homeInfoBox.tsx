import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, typos } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'

type HomeInfoBoxProps = {
    title: string
    contents: ReactNode
    description?: string
}

const HomeInfoBox = ({ title, contents, description }: HomeInfoBoxProps) => {
    return (
        <Container>
            <Title>
                {title}
                {!!description && <Description>{description}</Description>}
            </Title>
            <Contents>{contents}</Contents>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 16px;
    height: 104px;

    background: ${getThemeColor(colors.black[850])};
    border-radius: 12px;
    flex-grow: 1;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    ${typos.suit['10.14_900']};
    color: ${getThemeColor(colors.blue[400])};
`

const Description = styled.div`
    display: flex;
    ${typos.suit['10.14_400']};
    color: ${getThemeColor(colors.black[200])};
`

const Contents = styled.div`
    display: flex;
    ${typos.suit['14.18_900']};
    color: ${getThemeColor(colors.white)};
`

export default HomeInfoBox
