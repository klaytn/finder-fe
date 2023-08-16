import { Component } from 'react'
import styled, { ThemeConsumer } from 'styled-components'

import { colors, FaceSadIcon, Flex, neumorphism, Theme } from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'
import { PageSubTitle, PageTitle } from './pc/pages'

class TabErrorBoundary extends Component {
    state = {
        hasError: false,
    }
    static getDerivedStateFromError(error: unknown) {
        return { hasError: !!error }
    }

    render() {
        const { hasError } = this.state
        return hasError ? (
            <ThemeConsumer>
                {({ slush }) => (
                    <BoundaryContainer>
                        <FaceSadIcon color={slush === Theme.dark ? colors.white : colors.black[900]} size={44} />
                        <PageTitle style={{ marginTop: 16 }}>Failed to load content</PageTitle>
                        <PageSubTitle textAlign="center">
                            Sorry, there was an error.
                            <br />
                            Please try again later.
                        </PageSubTitle>
                    </BoundaryContainer>
                )}
            </ThemeConsumer>
        ) : (
            this.props.children
        )
    }
}

const BoundaryContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    align-items: center;
    height: 684px;
    background: ${getThemeColor(colors.black[850])};
    border-radius: 30px;
    margin-top: 40px;
    padding: 32px 40px;
    ${({ theme }) => (theme.slush === Theme.dark ? neumorphism.black1 : neumorphism.white1)};
`

export default TabErrorBoundary
