import { useNavigate } from 'react-router'
import styled from 'styled-components'

import {
    ArrowcomboLeftrightIcon,
    ArrowLeftIcon,
    BookmarkBookIcon,
    Button,
    colors,
    CubeIcon,
    FaceSadIcon,
    Flex,
    typos,
} from '@klaytn/slush'

import { getThemeColor } from '../functions/colorMap'
import { useFinderThemeColorSet } from '../hooks/useFinderThemeColor'
import { ErrorContent } from '../types/errorBoundary'
import { PageSubTitle, PageTitle } from './pc/pages'

export type ErrorComponentProps = {
    hasDesc?: boolean
    symbol?: string
    content: ErrorContent
    titleProps?: Record<string, string>
}

const PageError = ({ hasDesc = false, content, titleProps = {} }: ErrorComponentProps) => {
    const colorSet = useFinderThemeColorSet({
        blue: colors.blue[300],
        white: colors.white,
        gray: colors.black[400],
    })
    const navigate = useNavigate()
    const descIconProps = {
        size: 20,
        color: colorSet.blue,
    }

    const { title: Title, desc: Desc } = content

    return (
        <div style={{ marginLeft: 202, marginTop: 139 }}>
            <div>
                <FaceSadIcon color={colorSet.white} size={44} />
            </div>
            <PageTitle style={{ marginTop: 16 }}>
                <Title {...titleProps} />
            </PageTitle>
            <PageSubTitle>
                <Desc />
            </PageSubTitle>
            {hasDesc && (
                <Section>
                    <DescContainer>
                        <DescIcon>
                            <CubeIcon {...descIconProps} />
                        </DescIcon>
                        <DescTitle>Blocks</DescTitle>
                        <DescDesc>Decimal numbers only</DescDesc>
                    </DescContainer>
                    <DescContainer>
                        <DescIcon>
                            <ArrowcomboLeftrightIcon {...descIconProps} />
                        </DescIcon>
                        <DescTitle>Transactions</DescTitle>
                        <DescDesc>66 characters long</DescDesc>
                    </DescContainer>
                    <DescContainer>
                        <DescIcon>
                            <BookmarkBookIcon {...descIconProps} />
                        </DescIcon>
                        <DescTitle>Contract</DescTitle>
                        <DescDesc>42 characters long</DescDesc>
                    </DescContainer>
                </Section>
            )}
            <Section>
                <Button buttonType="third" onClick={() => navigate(-1)} leftIcon={ArrowLeftIcon}>
                    Back
                </Button>
            </Section>
        </div>
    )
}

const DescContainer = styled(Flex).attrs({
    direction: 'row',
})`
    &:nth-child(n + 2) {
        margin-top: 14px;
    }
`

const Section = styled.div`
    margin-top: 48px;
`

const DescIcon = styled.div`
    width: 26px;
`

const DescTitle = styled.div`
    width: 100px;
    ${typos.suit['14.18_900']};
    color: ${getThemeColor(colors.blue[300])};
`

const DescDesc = styled.div`
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.blue[300])};
`

export default PageError
