import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { ArrowSquareOutIcon, colors, Flex, Label, typos } from '@klaytn/slush'

import { useAccount } from '../../../../api/account'
import InnerCopy from '../../../../components/commons/InnerCopy'
import { ROUTES } from '../../../../constants/routes'
import { getThemeColor } from '../../../../functions/colorMap'
import { toPascalCase } from '../../../../functions/string'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import { OverviewFullRow, OverviewRow } from '../../common/overviewRows'

type AddressInfoProps = {
    address: string
}

const AddressInfo = ({ address }: AddressInfoProps) => {
    const { address: hash, knsLink, displayName, displayNameTitle, governanceCouncil } = useAccount(address)
    const linkIconColor = useFinderThemeColor(colors.blue[500])

    return (
        <Container>
            {displayName && (
                <>
                    <OverviewRow title={displayNameTitle} marginBottom={8} />
                    <OverviewFullRow gap={13.5}>
                        <Label
                            size="medium"
                            color="black"
                            override={{
                                typo: typos.code['12.16_400'],
                            }}
                        >
                            {displayName}
                        </Label>
                        {knsLink && (
                            <KnsLink href={knsLink} target="_blank" rel="noopener noreferrer">
                                <ArrowSquareOutIcon size={13.5} color={linkIconColor} />
                            </KnsLink>
                        )}
                    </OverviewFullRow>
                </>
            )}
            <OverviewRow title="Address" marginTop={displayName ? 16 : 0} marginBottom={8} />

            {governanceCouncil ? (
                <>
                    {governanceCouncil.nodeContracts.map((hash, index, { length }) => (
                        <GCAddress
                            key={hash}
                            hash={hash}
                            currentHash={address}
                            type="NODE"
                            index={index}
                            count={length}
                        />
                    ))}
                    {governanceCouncil.stakingContracts.map((hash, index, { length }) => (
                        <GCAddress
                            key={hash}
                            hash={hash}
                            currentHash={address}
                            type="STAKING"
                            index={index}
                            count={length}
                        />
                    ))}
                    {governanceCouncil.rewardContracts.map((hash, index, { length }) => (
                        <GCAddress
                            key={hash}
                            hash={hash}
                            currentHash={address}
                            type="REWARD"
                            index={index}
                            count={length}
                        />
                    ))}
                </>
            ) : (
                <OverviewFullRow gap={13.5}>
                    <Label
                        size="medium"
                        color="black"
                        override={{
                            typo: typos.code['12.16_400'],
                        }}
                        display="inline-block"
                    >
                        {hash}
                    </Label>
                    <InnerCopy size={13.5} color={colors.blue[500]} value={hash} message="Hash Copied." />
                </OverviewFullRow>
            )}
        </Container>
    )
}

const Container = styled(Flex)`
    margin-bottom: 24px;
`

const KnsLink = styled.a`
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
`

type GCAddressProps = {
    type: string
    hash: string
    currentHash: string
    index: number
    count: number
}
const GCAddress = ({ type, hash, currentHash, index, count }: GCAddressProps) => {
    const order = count > 1 ? ` ${index + 1}` : ''
    const title = `${toPascalCase(type)}${order}`
    const navigate = useNavigate()

    const handleClick = useCallback(() => {
        if (hash === currentHash) {
            return
        }

        navigate(ROUTES.ACCOUNT.DETAIL.replace(':address', hash))
    }, [navigate, hash, currentHash])

    return (
        <OverviewFullRow gap={13.5} marginBottom={8}>
            <GCAddressType>{title}</GCAddressType>
            <GCAddressClickArea onClick={handleClick}>
                <Label
                    size="medium"
                    color="black"
                    override={{
                        typo: typos.code['12.16_400'],
                    }}
                    display="inline-block"
                >
                    {hash}
                </Label>
            </GCAddressClickArea>
            <InnerCopy size={13.5} color={colors.blue[500]} value={hash} message="Hash Copied." />
        </OverviewFullRow>
    )
}

const GCAddressClickArea = styled.div`
    display: flex;
    overflow: hidden;
`

const GCAddressType = styled.div`
    display: flex;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['12.16_400']};
    width: 51.5px;
    flex-shrink: 0;
`

export default AddressInfo
