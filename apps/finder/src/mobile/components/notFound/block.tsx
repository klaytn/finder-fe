import { useParams } from 'react-router'
import styled from 'styled-components'

import { colors, FaceSadIcon, Flex, Text, typos } from '@klaytn/slush'

import { useResources } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import InputGuide from './inputGuide'

const NotFoundBlock = () => {
    const { blockId = '' } = useParams()
    const whiteColor = useFinderThemeColor(colors.white)
    const { keyCurrency } = useResources()

    return (
        <Flex direction="column">
            <Flex>
                <FaceSadIcon size={44} color={whiteColor} />
                <TitleText>
                    Sorry,
                    <br />
                    Block <BlockText>#{blockId}</BlockText>
                    <br />
                    is not found.
                </TitleText>
                <DescriptionText typo={typos.suit['14.18_400']} color={whiteColor}>
                    The block number you searched for does not exist (yet) in {keyCurrency.name}. Please double check
                    your search keyword.
                </DescriptionText>
            </Flex>

            <InputGuide />
        </Flex>
    )
}

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['24.32_900'],
        color: colors.white,
    }),
)`
    margin-top: 12px;
`

const DescriptionText = styled(Text)`
    margin-top: 28px;
`

const BlockText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['24.32_900'],
        color: colors.blue[300],
    }),
)``

export default NotFoundBlock
