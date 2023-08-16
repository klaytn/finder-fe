import styled from 'styled-components'

import { colors, FaceSadIcon, Flex, Text, typos } from '@klaytn/slush'

import { useResources } from '../../../context/configProvider'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import InputGuide from './inputGuide'

const NotFoundAccount = () => {
    const whiteColor = useFinderThemeColor(colors.white)
    const { keyCurrency } = useResources()

    return (
        <Flex direction="column">
            <Flex>
                <FaceSadIcon size={44} color={whiteColor} />
                <TitleText typo={typos.suit['24.32_900']} color={whiteColor}>
                    Sorry,
                    <br />
                    address <br />
                    is not found.
                </TitleText>
                <DescriptionText typo={typos.suit['14.18_400']} color={whiteColor}>
                    The address you searched for does not exist (yet) in {keyCurrency.name}. Please double check your
                    search keyword.
                </DescriptionText>
            </Flex>

            <InputGuide />
        </Flex>
    )
}

const TitleText = styled(Text)`
    margin-top: 12px;
`

const DescriptionText = styled(Text)`
    margin-top: 28px;
`

export default NotFoundAccount
