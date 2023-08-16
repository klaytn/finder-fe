import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowRightIcon, colors, Divider, ErrorIcon, Flex, If, Text, typos } from '@klaytn/slush'

import { useAccount } from '../../../../api/account'
import { useFeatures, useResources } from '../../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { klay, withCommas } from '../../../../functions/Functions'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import Address from '../../common/address'
import Hash from '../../common/hash'
import { OverviewDescText, OverviewRow, OverviewValueText } from '../../common/overviewRows'

type BasicInfoProps = {
    address: string
}

const BasicInfo = ({ address }: BasicInfoProps) => {
    const {
        balance,
        info,
        subType,
        hasName,
        tokenLink,
        totalTransactionCount,
        contractCreator,
        contractCreatorTransactionHash,
        memo,
    } = useAccount(address)
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()

    const errorIconColor = useFinderThemeColor(colors.yellow[500])

    return (
        <Container>
            {showGasPrice && (
                <OverviewRow title="Balance" marginTop={24}>
                    <BalanceContainer>
                        <OverviewValueText marginRight={4}>{klay(balance)}</OverviewValueText>
                        <OverviewDescText>{keyCurrency.unit}</OverviewDescText>
                    </BalanceContainer>
                </OverviewRow>
            )}

            {subType && (
                <>
                    <OverviewRow title={`${subType} info`} marginTop={16} marginBottom={24}>
                        <DetailContainer>
                            <If condition={hasName}>
                                <DetailIconImg src={info?.icon} />
                            </If>
                            <DetailLink to={tokenLink}>
                                <OverviewValueText>{info?.name || `view ${subType} detail`}</OverviewValueText>
                            </DetailLink>
                            <If condition={!hasName}>
                                <LinkIconContainer>
                                    <ArrowRightIcon size={12} color={colors.white} />
                                </LinkIconContainer>
                            </If>
                        </DetailContainer>
                    </OverviewRow>

                    <Divider />
                </>
            )}

            <OverviewRow title="Total TXs" marginTop={16} marginBottom={16}>
                <OverviewValueText>{withCommas(totalTransactionCount)}</OverviewValueText>
            </OverviewRow>

            {!!contractCreator && (
                <>
                    <OverviewRow title="Contract Creator" marginBottom={8} />
                    <CreatorRow>
                        <Address address={contractCreator} grow={1} />
                        <TextContainer>
                            <MiddleFixText>at TX</MiddleFixText>
                        </TextContainer>
                        <Hash
                            hash={contractCreatorTransactionHash || ''}
                            link={`/tx/${contractCreatorTransactionHash}`}
                            basis={0}
                        />
                    </CreatorRow>
                </>
            )}

            {!!memo && (
                <NullAccountRow>
                    <NullIconContainer>
                        <ErrorIcon size={16} color={errorIconColor} />
                    </NullIconContainer>
                    <MemoText>{memo}</MemoText>
                </NullAccountRow>
            )}
        </Container>
    )
}

const Container = styled(Flex)``

const BalanceContainer = styled(Flex).attrs({
    direction: 'row',
})``

const DetailLink = styled(Link)`
    font-size: 0;
`

const DetailContainer = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const DetailIconImg = styled.img`
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    margin-right: 4px;
`

const LinkIconContainer = styled.span`
    margin-left: 4px;
`

const CreatorRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})`
    align-items: center;
    margin-bottom: 16px;
`

const TextContainer = styled(Flex)`
    margin: 0px 11px;
    align-items: center;
`

const MiddleFixText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.white,
    }),
)`
    width: 32px;
`

const NullAccountRow = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 8px;
    margin-bottom: 16px;
`

const NullIconContainer = styled(Flex)`
    padding-top: 1px;
`

const MemoText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_400'],
        color: colors.black[500],
    }),
)``
export default BasicInfo
