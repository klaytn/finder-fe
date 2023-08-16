import { FC, Suspense } from 'react'
import styled from 'styled-components'

import {
    ChevronBottomIcon,
    ChevronTopIcon,
    colors,
    CubeIcon,
    FaceSmileyIcon,
    FireIcon,
    Flex,
    Icon,
    Text,
    typos,
    useToggle,
} from '@klaytn/slush'

import { useFeatures, useResources } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import AdditionalInfos from './additionalInfos'
import BlockHeight from './blockHeight'
import ChainStatus from './chainStatus'
import KlaytnPrice from './klaytnPrice'
import TotalBurnt from './totalBurnt'

const HomeStatus = () => {
    const { showBlockBurnt } = useFeatures()
    const { keyCurrency } = useResources()
    const { isShow, toggle } = useToggle()
    const colorSet = useFinderThemeColorSet({
        background: colors.black[870],
        icon: colors.white,
    })

    const ExpanderIcon = isShow ? ChevronTopIcon : ChevronBottomIcon

    return (
        <Container direction="column" round={20} backgroundColor={colorSet.background} justifyContent="stretch">
            <Row icon={FaceSmileyIcon} title="Chain Status">
                <ChainStatus />
            </Row>
            <Row icon={CubeIcon} title="Block Height">
                <BlockHeight />
            </Row>
            <Row icon={keyCurrency.icon} title={`${keyCurrency.unit} Price`}>
                <KlaytnPrice />
            </Row>
            {showBlockBurnt && (
                <Row icon={FireIcon} title="Total Burnt">
                    <TotalBurnt />
                </Row>
            )}

            <Suspense fallback={null}>{isShow && <AdditionalInfos />}</Suspense>

            <ExpanderRow direction="row" justifyContent="center" onClick={toggle}>
                <ExpanderIcon size={16} color={colorSet.icon} />
            </ExpanderRow>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 20px;
    padding: 16px;
`

type RowProps = {
    icon: Icon
    title: string
}

const Row: FC<RowProps> = ({ icon: RowIcon, title, children }) => {
    const iconColor = useFinderThemeColor(colors.blue[400])

    return (
        <RowContainer direction="row" justifyContent="space-between">
            <TitleContainer direction="row">
                <RowIconContainer>
                    <RowIcon size={16} color={iconColor} />
                </RowIconContainer>
                <TitleText>{title}</TitleText>
            </TitleContainer>
            {children}
        </RowContainer>
    )
}

const RowContainer = styled(Flex)`
    align-items: center;
    margin-bottom: 16px;
`

const TitleContainer = styled(Flex)`
    align-items: center;
`

const RowIconContainer = styled(Flex)`
    margin-right: 4px;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.blue[400],
    }),
)``

const ExpanderRow = styled(Flex)`
    margin-top: 10px;
`

export default HomeStatus
