import styled from 'styled-components'

import { colors, FaceSadIcon, Flex, Text, typos } from '@klaytn/slush'

import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

const NotFoundUnknown = () => {
    const whiteColor = useFinderThemeColor(colors.white)

    return (
        <Flex direction="column">
            <Flex>
                <FaceSadIcon size={44} color={whiteColor} />
                <TitleText typo={typos.suit['24.32_900']} color={whiteColor}>
                    404 error
                    <br />
                    Sorry, page is not found
                </TitleText>
                <DescriptionText typo={typos.suit['14.18_400']} color={whiteColor}>
                    The page you are looking for has been removed or does not exist.
                </DescriptionText>
            </Flex>
        </Flex>
    )
}

const TitleText = styled(Text)`
    margin-top: 12px;
`

const DescriptionText = styled(Text)`
    margin-top: 28px;
`

export default NotFoundUnknown
