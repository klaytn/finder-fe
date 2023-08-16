import styled from 'styled-components'

import { ArrowSquareOutIcon, colors, Flex, If } from '@klaytn/slush'

import { useToken } from '../../../../api/token'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import { OverviewRow, OverviewValueText } from '../../common/overviewRows'

type AdditionalInfoProps = {
    address: string
}

const AdditionalInfo = ({ address }: AdditionalInfoProps) => {
    const {
        info: { decimal },
        officialSite,
    } = useToken(address)

    const arrowIconColor = useFinderThemeColor(colors.blue[500])

    return (
        <Container>
            <OverviewRow title="Decimal" marginBottom={16}>
                <OverviewValueText>{decimal}</OverviewValueText>
            </OverviewRow>

            <If condition={!!officialSite}>
                <OverviewRow title="Official Site" marginBottom={18}>
                    <LinkContainer>
                        <OverviewValueText>{officialSite}</OverviewValueText>

                        <LinkIconContainer>
                            <a href={officialSite} target="_blank" rel="noreferrer">
                                <ArrowSquareOutIcon size={20} color={arrowIconColor} />
                            </a>
                        </LinkIconContainer>
                    </LinkContainer>
                </OverviewRow>
            </If>
        </Container>
    )
}

const Container = styled(Flex)`
    margin-top: 24px;
`

const LinkContainer = styled(Flex).attrs({
    direction: 'row',
})`
    align-items: center;
`

const LinkIconContainer = styled(Flex)`
    margin-left: 8px;
`

export default AdditionalInfo
