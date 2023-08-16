import styled from 'styled-components'

import { colors, FaceSadIcon, Flex, Text, typos } from '@klaytn/slush'

import InnerBox from '../../common/innerBox'

const NotSubmitted = () => {
    return (
        <InnerBox backgroundColor={colors.black[870]}>
            <Container>
                <IconContainer>
                    <FaceSadIcon size={44} color={colors.white} />
                </IconContainer>

                <MainText>
                    This Contract is not submitted.
                    <br />
                    Contract information is unavailable.
                </MainText>

                <SubText>
                    {"The contract owner should submit this contract through the 'contract submission request' menu."}
                </SubText>
            </Container>
        </InnerBox>
    )
}

const Container = styled(Flex).attrs({
    justifyContent: 'center',
})`
    align-items: center;
    margin-top: 68px;
    margin-bottom: 88px;
`

const IconContainer = styled(Flex)`
    margin-bottom: 15px;
`

const MainText = styled(Text).attrs({
    typo: typos.suit['18.24_900'],
    color: colors.white,
})`
    text-align: center;
    margin-bottom: 15px;
`

const SubText = styled(Text).attrs({
    typo: typos.suit['12.16_400'],
    color: colors.white,
})`
    text-align: center;
`

export default NotSubmitted
