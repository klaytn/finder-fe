import { useNavigate } from 'react-router'
import styled from 'styled-components'

import { Button, colors, FaceSadIcon, Flex, Text, typos, ArrowLeftIcon } from '@klaytn/slush'

import { ErrorComponentProps } from '../../../components/PageError'
import { useResources } from '../../../context/configProvider'
import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import { ErrorContents } from '../../../types/errorBoundary'
import InputGuide from './inputGuide'

const AccountErrorDesc = () => {
    const { keyCurrency } = useResources()
    return (
        <>
            The account address you searched for does not exist (yet) in {keyCurrency.name}.
            <br />
            Please double check your search keyword.
        </>
    )
}

const TxErrorDesc = () => {
    const { keyCurrency } = useResources()

    return (
        <>
            The transaction address you searched for does not exist (yet) in {keyCurrency.name}.
            <br />
            Please double check your search keyword.
        </>
    )
}

const BlockErrorDesc = () => {
    const { keyCurrency } = useResources()

    return (
        <>
            The block number you searched for does not exist (yet) in {keyCurrency.name}. Please double check your
            search keyword.
        </>
    )
}

const TokenErrorDesc = () => {
    const { keyCurrency } = useResources()

    return (
        <>
            The token you searched for does not exist (yet) in {keyCurrency.name}.
            <br />
            Please double check your search keyword.
        </>
    )
}

const NftErrorDesc = () => {
    const { keyCurrency } = useResources()

    return (
        <>
            The NFT you searched for does not exist (yet) in {keyCurrency.name}.
            <br />
            Please double check your search keyword.
        </>
    )
}

export const MOBILE_ERROR_CONTENT: ErrorContents = {
    COMMON_ERROR: {
        title: () => <>Failed to load content</>,
        desc: () => (
            <>
                Sorry, there was an error.
                <br />
                Please try again later.
            </>
        ),
    },
    ACCOUNT: {
        title: ({ id }: Record<string, string>) => <TitleAddress type="Account address" id={id} />,
        desc: AccountErrorDesc,
    },
    TX: {
        title: ({ id }: Record<string, string>) => <TitleAddress type="Transaction" id={id} />,
        desc: TxErrorDesc,
    },
    BLOCK: {
        title: ({ id }: Record<string, string>) => <TitleNumber type="Block" id={`#${id}`} />,
        desc: BlockErrorDesc,
    },
    TOKEN: {
        title: ({ id }: Record<string, string>) => <TitleAddress type="Token" id={id} />,
        desc: TokenErrorDesc,
    },
    NFT: {
        title: ({ id }: Record<string, string>) => <TitleAddress type="NFT" id={id} />,
        desc: NftErrorDesc,
    },
    NFT_ITEM: {
        title: ({ id, symbol }: Record<string, string>) => <TitleAddress type={`NFT ${symbol}`} id={`#${id}`} />,
        desc: NftErrorDesc,
    },
    PAGE: {
        title: () => (
            <>
                404 error
                <br />
                Sorry, page is not found.
            </>
        ),
        desc: () => (
            <>
                The page you are looking for has been removed
                <br />
                or does not exist.
            </>
        ),
    },
} as const

const TitleAddress = ({ id, type }: { id: string; type: string }) => {
    return (
        <>
            Sorry,
            <br />
            {type}
            <Address>{id}</Address>
            is not found
        </>
    )
}

const Address = styled.div`
    ${typos.suit['20.28_900']}
    margin-top: 8px;
    color: ${getThemeColor(colors.blue[300])};
    overflow-wrap: break-word;
`

const TitleNumber = ({ id, type }: { id: string; type: string }) => {
    return (
        <>
            Sorry,
            <br />
            {type} <Number>{id}</Number>
            <br />
            is not found
        </>
    )
}

const Number = styled.span`
    ${typos.suit['24.32_900']}
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${getThemeColor(colors.blue[300])};
`

const NotFound = ({ content, hasDesc, titleProps = {} }: ErrorComponentProps) => {
    const navigate = useNavigate()
    const colorSet = useFinderThemeColorSet({
        blue: colors.blue[300],
        white: colors.white,
        gray: colors.black[400],
    })

    const { title: Title, desc } = content

    return (
        <Flex direction="column">
            <Flex>
                <FaceSadIcon size={44} color={colorSet.white} />
                <TitleText typo={typos.suit['24.32_900']} color={colorSet.white}>
                    <Title {...titleProps} />
                </TitleText>
                <DescriptionText typo={typos.suit['14.18_400']} color={colorSet.white}>
                    {desc}
                </DescriptionText>
            </Flex>
            {hasDesc && <InputGuide />}
            <Section>
                <Button buttonType="third" onClick={() => navigate(-1)} leftIcon={ArrowLeftIcon}>
                    Back
                </Button>
            </Section>
        </Flex>
    )
}

const Section = styled.div`
    margin-top: 48px;
`

const TitleText = styled(Text)`
    margin-top: 12px;
`

const DescriptionText = styled(Text)`
    margin-top: 16px;
`

export default NotFound
