import styled from 'styled-components'

import { colors, Flex, If, Label, Text, Toast, typos, useToggle } from '@klaytn/slush'

import { useAccount } from '../../../api/account'
import { toPascalCase } from '../../../functions/string'
import TitleRow from '../common/titleRow'

type AccountTitleProps = {
    address: string
}

const AccountTitle = ({ address }: AccountTitleProps) => {
    const { subType, displayTitle, governanceCouncil } = useAccount(address)
    const toastState = useToggle()

    const icon = governanceCouncil?.thumbnail

    return (
        <>
            <HeaderRow>
                <TitleRow
                    title={displayTitle.replace('(GovernanceCouncil)', '(GC)')}
                    marginBottom={0}
                    leftItem={icon && <IconImg src={icon} />}
                />
                <If condition={!!subType}>
                    <LabelContainer>
                        <LabelText>{subType}</LabelText>
                    </LabelContainer>
                </If>
            </HeaderRow>
            {!!governanceCouncil && (
                <HeaderRow>
                    <Label size="large" color="black">
                        {toPascalCase(governanceCouncil.contractType)}
                    </Label>
                </HeaderRow>
            )}

            <Toast message="Hash copied" onClose={toastState.off} show={toastState.isShow} top={60} />
        </>
    )
}

const HeaderRow = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
    margin-bottom: 12px;
`

const LabelContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    padding: 3px 10px;
    border-radius: 8px;
    background-color: ${colors.blue[600]};
    align-items: center;
`

const LabelText = styled(Text).attrs({
    typo: typos.suit['12.16_400'],
    color: colors.white,
})``

const IconImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
`

export default AccountTitle
