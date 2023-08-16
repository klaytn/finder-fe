import { ReactNode } from 'react'
import styled from 'styled-components'

import { colors, typos } from '@klaytn/slush'

import { getThemeColor } from '../../functions/colorMap'
import { extractProp } from '../../functions/Functions'

type CodeCardProps = {
    title: ReactNode
    description?: string
    children: ReactNode
    marginTop?: number
}

export const CodeCard = ({ title, description, children, marginTop = 37 }: CodeCardProps) => {
    return (
        <CodeCardContainer marginTop={marginTop}>
            <CodeCardHeaderRow>
                <CodeCardTitle>
                    {title} {!!description && <CodeCardDesc>{description}</CodeCardDesc>}
                </CodeCardTitle>
            </CodeCardHeaderRow>
            {children}
        </CodeCardContainer>
    )
}

const CodeCardContainer = styled.div<{ marginTop: number }>`
    display: flex;
    flex-direction: column;
    gap: 17px;
    margin-top: ${extractProp('marginTop')}px;
`

const CodeCardHeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const CodeCardTitle = styled.div`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_900']};
`

const CodeCardDesc = styled.span`
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.black[500])};
`
