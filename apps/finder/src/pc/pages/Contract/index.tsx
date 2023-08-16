import { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { colors, typos } from '@klaytn/slush'

import ContractIcon from '../../../components/commons/icons/address/contractIcon'
import { useResources } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import { useWalletManager } from '../../../hooks/useWalletManager'
import { contractCodeQuery } from '../../../states/contract'
import SignOff from './signOff'
import SignOn from './signOn'

const ContractTitle = () => {
    useRecoilValue(contractCodeQuery)
    const { contactLink = 'mailto:support@klaytnfinder.io' } = useResources()
    const whiteColor = useFinderThemeColor(colors.white)
    const { isConnected } = useWalletManager()

    return (
        <>
            <div>
                <ContractIcon color={whiteColor} size={44} />
            </div>
            <Title>Contract Submission Request</Title>
            <TitleDesc>
                To submit a code,
                <br />
                {isConnected ? (
                    <>
                        contract creator must submit the below form.
                        <br />
                    </>
                ) : (
                    <>
                        contract creator must sign up with wallet.
                        <br />
                    </>
                )}
                If you have any additional question, please contact{' '}
                {!!contactLink && <MailLink href={contactLink}>{contactLink.replace('mailto:', '')}</MailLink>}
            </TitleDesc>
            <BottomMargin />
        </>
    )
}

const Title = styled.div`
    margin-top: 12px;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['32.44_900']};
`

const TitleDesc = styled.div`
    margin-top: 16px;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['20.28_400']};
`

const MailLink = styled.a`
    color: ${getThemeColor(colors.white)};
    &:hover {
        text-decoration: underline;
    }
`

const BottomMargin = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 35px;
`

const ContractForm = () => {
    const { isConnected } = useWalletManager()

    return (
        <FormContainer>
            <Suspense fallback={null}>
                <ContractTitle />
                {!isConnected ? <SignOff /> : <SignOn />}
            </Suspense>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    margin: auto;
    margin-top: 120px;
    width: 952px;
`

export default ContractForm
