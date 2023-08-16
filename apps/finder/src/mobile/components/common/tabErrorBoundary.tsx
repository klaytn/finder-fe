import { Component } from 'react'
import styled from 'styled-components'

import { colors, FaceSadIcon, Flex, Text, typos } from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import InnerBox from './innerBox'

type ErrorBoundaryProps = {
    marginTop?: number
    pathname: string
}

type ErrorBoundaryState = {
    hasError: boolean
    error: unknown
}

class TabErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        hasError: false,
        error: null,
    }

    static getDerivedStateFromError(error: unknown) {
        return {
            hasError: true,
            error,
        }
    }

    shouldComponentUpdate(nextProps: ErrorBoundaryProps, nextState: ErrorBoundaryState) {
        if (nextState.hasError !== this.state.hasError) {
            return true
        }
        if (this.props.pathname !== nextProps.pathname) {
            return true
        }
        return false
    }

    render() {
        const { marginTop = 0 } = this.props
        if (this.state.hasError) {
            return (
                <ErrorBoundaryContainer marginTop={marginTop}>
                    <InnerErrorPage />
                </ErrorBoundaryContainer>
            )
        }
        return this.props.children
    }
}

const ErrorBoundaryContainer = styled.div<{ marginTop: number }>`
    margin-top: ${({ marginTop }) => marginTop}px;
`

const InnerErrorPage = () => {
    const iconColor = useFinderThemeColor(colors.white)

    return (
        <InnerBox>
            <ErrorContainer>
                <FaceSadIcon size={44} color={iconColor} />
                <ErrorTitleText>Failed to load content.</ErrorTitleText>
                <ErrorDescText>
                    Sorry, there was an error.
                    <br />
                    Please try again later.
                </ErrorDescText>
            </ErrorContainer>
        </InnerBox>
    )
}

const ErrorContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    height: 356px;
    align-items: center;
    gap: 16px;
`

const ErrorTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['18.24_900'],
        color: colors.white,
    }),
)``

const ErrorDescText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    text-align: center;
`

export default TabErrorBoundary
