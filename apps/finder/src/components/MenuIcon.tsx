import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Icon, typos } from '@klaytn/slush'

import { extractProp } from '../functions/Functions'

interface IMenuIconProps {
    name: string
    color: string
    icon: Icon
    link: string
}

const MenuIcon = ({ link, color, icon, name }: IMenuIconProps) => {
    const IconComponent = icon

    return (
        <Container to={link}>
            <div>
                <IconComponent color={color} size={20} />
            </div>
            <InnerContainer color={color}>{name}</InnerContainer>
        </Container>
    )
}

const Container = styled(Link)`
    display: flex;
    cursor: pointer;
`

const InnerContainer = styled.div<{ color: string }>`
    margin-left: 6px;
    color: ${extractProp('color')};
    ${typos.suit['14.18_900']};
`

export default MenuIcon
