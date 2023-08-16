import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {
    colors,
    Expander,
    ExpanderContents,
    ExpanderDescription,
    ExpanderHeader,
    Flex,
    Label,
    Text,
    typos,
} from '@klaytn/slush'

import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import { AddressVO } from '../../../vo/address'
import Address from '../common/address'

type AccountItemBoxProps = {
    account: AddressVO
}

const AccountItemBox = ({ account: { displayName, address, accountType }, account }: AccountItemBoxProps) => {
    return (
        <Container>
            <Expander>
                <ExpanderHeader>
                    <HeaderRow>
                        <NoneStyleLink to={`/accounts/${address}`}>
                            <TitleText>{displayName}</TitleText>
                        </NoneStyleLink>
                    </HeaderRow>
                </ExpanderHeader>

                <ExpanderDescription>
                    <DescriptionContainer>
                        <Row>
                            <Address address={account} grow={1} showHash />
                        </Row>
                    </DescriptionContainer>
                </ExpanderDescription>

                <ExpanderContents>
                    <ContentsContainer>
                        <LabelText>Account type</LabelText>
                        <Row>
                            <Label size="medium" color="black">
                                {accountType}
                            </Label>
                        </Row>
                    </ContentsContainer>
                </ExpanderContents>
            </Expander>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`

const HeaderRow = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const NoneStyleLink = styled(Link)`
    font-size: 0;
`

const TitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

const DescriptionContainer = styled(Flex)`
    margin-top: 12px;
`

const LabelText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[400],
    }),
)`
    margin-bottom: 8px;
`

const Row = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const ContentsContainer = styled(Flex)`
    margin-top: 28px;
`

export default AccountItemBox
