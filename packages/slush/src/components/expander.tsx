import { Children, FC } from 'react'
import styled from 'styled-components'

import { useToggle } from '../hooks/useToggle'
import { useTheme } from '../themes/provider'
import { findChildComponent } from '../utils/react'
import { Box, Flex } from './box'
import { ChevronBottomIcon, ChevronTopIcon } from './icon'

export const ExpanderHeader: FC = ({ children }) => {
    return <>{children}</>
}

export const ExpanderHeaderDecorator: FC = ({ children }) => {
    return <>{children}</>
}

export const ExpanderDescription: FC = ({ children }) => {
    return <>{children}</>
}

export const ExpanderContents: FC = ({ children }) => {
    return <>{children}</>
}

type ExpanderProps = {
    onChange?: (expand: boolean) => void
}

export const Expander: FC<ExpanderProps> = ({ children, onChange }) => {
    const childList = Children.toArray(children)
    const header = childList.find(findChildComponent(ExpanderHeader))
    const headerDecorator = childList.find(findChildComponent(ExpanderHeaderDecorator))
    const description = childList.find(findChildComponent(ExpanderDescription))
    const contents = childList.find(findChildComponent(ExpanderContents))
    const { isShow, toggle } = useToggle()
    const { expander } = useTheme()

    const handleToggle = () => {
        onChange?.(!isShow)
        toggle()
    }

    const ChevronIcon = isShow ? ChevronTopIcon : ChevronBottomIcon

    return (
        <Container direction="column" round={16} backgroundColor={expander.background} justifyContent="space-between">
            <HeaderRow direction="row" onClick={handleToggle}>
                <HeaderBox>{header}</HeaderBox>
                {headerDecorator}
                <IconBox>
                    <ChevronIcon size={16} color={expander.icon} />
                </IconBox>
            </HeaderRow>
            {description}
            {isShow && contents}
        </Container>
    )
}

const Container = styled(Flex)`
    padding: 16px;
`

const HeaderRow = styled(Flex)`
    align-items: center;
`

const HeaderBox = styled(Flex)`
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
`

const IconBox = styled(Box)`
    cursor: pointer;
    user-select: none;
`
