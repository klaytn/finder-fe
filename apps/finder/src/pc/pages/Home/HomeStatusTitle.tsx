import styled from 'styled-components'

import { colors, Icon, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

interface IHomeSectionTitleProps {
    icon: Icon
    title: string
}

const HomeStatusTitle = (props: IHomeSectionTitleProps) => {
    const IconComponent = props.icon
    const iconColor = useFinderThemeColor(colors.blue[400])

    return (
        <Container>
            <IconComponent color={iconColor} size={20} />
            <TitleText>{props.title}</TitleText>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 9px;
    align-items: center;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['16.24_900'],
        color: colors.blue[400],
    }),
)``

export default HomeStatusTitle
