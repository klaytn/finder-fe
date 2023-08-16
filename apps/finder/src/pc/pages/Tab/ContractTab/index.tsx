import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { colors, FaceSadIcon, Flex } from '@klaytn/slush'

import { getAccountContractCode } from '../../../../api/account'
import ButtonGroup, { ButtonGroupItem } from '../../../../components/buttonGroup'
import FinderLink from '../../../../components/commons/finderLink'
import { ROUTES } from '../../../../constants/routes'
import { getThemeColor } from '../../../../functions/colorMap'
import { useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'
import { useSubTab } from '../../../../hooks/useSubTab'
import { ContractCodeVO } from '../../../../vo/contractCode'
import ReadContractSubTab from './readContractSubTab'
import ViewCodeSubTab from './viewCodeSubTab'
import WriteContractSubTab from './writeContractSubTab'

const DEFAULT_SUB_TABS: ButtonGroupItem[] = [
    {
        title: 'View Code',
        value: 'viewCode',
    },
    {
        title: 'Read Contract',
        value: 'readContract',
    },
    {
        title: 'Write Contract',
        value: 'writeContract',
    },
]

const PROXY_SUB_TABS: ButtonGroupItem[] = [
    {
        title: 'Read Contract',
        value: 'readContractAsProxy',
        decorator: 'as Proxy',
    },
    {
        title: 'Write Contract',
        value: 'writeContractAsProxy',
        decorator: 'as Proxy',
    },
]

export interface IContractTabProps {
    address: string
}

const ContractTab = ({ address }: IContractTabProps) => {
    const [haveNotContractCode, setHaveNotContractCode] = useState(false)
    const [contractCode, setContractCode] = useState<ContractCodeVO>()

    const fetchAccountContractCode = async (address: string) => {
        try {
            const { data } = await getAccountContractCode(address)
            const contractCodeVO = new ContractCodeVO(data, address)
            setContractCode(contractCodeVO)
        } catch {
            setHaveNotContractCode(true)
        }
    }

    useEffect(() => {
        fetchAccountContractCode(address)
    }, [address])

    const { implementationContractCode, implementationContractType, proxyContractCode } = contractCode || {}

    const subTabs = useMemo(() => {
        if (implementationContractCode) {
            return [...DEFAULT_SUB_TABS, ...PROXY_SUB_TABS]
        }

        if (implementationContractType && !proxyContractCode) {
            return [
                DEFAULT_SUB_TABS[0],
                ...DEFAULT_SUB_TABS.slice(1, DEFAULT_SUB_TABS.length).map((item) => ({
                    ...item,
                    disableMessage: 'There is no specific proxy contract.',
                })),
            ]
        }
        return DEFAULT_SUB_TABS
    }, [implementationContractCode, implementationContractType, proxyContractCode])

    const { subTab, handleSubTabChange } = useSubTab(DEFAULT_SUB_TABS[0].value)

    if (haveNotContractCode) {
        return <ContractNotFound />
    }

    if (contractCode === undefined) {
        return null
    }

    const hasImplementationContractCode = !!contractCode.implementationContractCode

    return (
        <div>
            <ButtonGroupContainer>
                <ButtonGroup buttons={subTabs} selectedValue={subTab} onChange={handleSubTabChange} />
            </ButtonGroupContainer>
            {subTab === 'viewCode' && <ViewCodeSubTab contractCode={contractCode} />}
            {subTab === 'readContract' && <ReadContractSubTab contractCode={contractCode} />}
            {subTab === 'writeContract' && <WriteContractSubTab contractCode={contractCode} />}
            {subTab === 'readContractAsProxy' && hasImplementationContractCode && (
                <ReadContractSubTab contractCode={contractCode.implementationContractCode} />
            )}
            {subTab === 'writeContractAsProxy' && hasImplementationContractCode && (
                <WriteContractSubTab contractCode={contractCode.implementationContractCode} />
            )}
        </div>
    )
}

const ButtonGroupContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    margin-bottom: 32px;
`

const ContractNotFound = () => {
    const colorSet = useFinderThemeColorSet({
        white: colors.white,
        link: colors.black[30],
    })

    return (
        <NotFoundContainer>
            <div className="flex_center">
                <FaceSadIcon size={40} color={colorSet.white} />
            </div>
            <NotFoundTitle style={{ marginTop: 20 }}>This Contract is not submitted.</NotFoundTitle>
            <NotFoundTitle>Contract information is unavailable.</NotFoundTitle>
            <NotFoundDesc style={{ marginTop: 16 }}>The contract owner should submit this contract</NotFoundDesc>
            <NotFoundDesc>
                through the
                <FinderLink to={ROUTES.CONTRACT.INPUT} style={{ color: colorSet.link }}>
                    &apos;contract submission request&apos;
                </FinderLink>{' '}
                menu
            </NotFoundDesc>
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`
    margin-top: 105px;
    margin-bottom: 98px;
`

const NotFoundTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.0075em;
    color: ${getThemeColor(colors.white)};
`

const NotFoundDesc = styled.div`
    display: flex;
    justify-content: center;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: ${getThemeColor(colors.white)};
`

export default ContractTab
