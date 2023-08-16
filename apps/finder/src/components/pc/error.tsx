import styled from 'styled-components'

import { colors, Flex, typos } from '@klaytn/slush'

import { useResources } from '../../context/configProvider'
import { getThemeColor } from '../../functions/colorMap'
import { ErrorContents } from '../../types/errorBoundary'

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
            The block number you searched for does not exist (yet) in {keyCurrency.name}.
            <br />
            Please double check your search keyword.
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

export const ERROR_CONTENT: ErrorContents = {
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
        title: ({ id }: Record<string, string>) => <TitleNumber type="Token" id={id} />,
        desc: TokenErrorDesc,
    },
    NFT: {
        title: ({ id }: Record<string, string>) => <TitleNumber type="NFT" id={id} />,
        desc: NftErrorDesc,
    },
    NFT_ITEM: {
        title: ({ id, symbol }: Record<string, string>) => <TitleNumber type={`NFT ${symbol}`} id={`#${id}`} />,
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
    word-break: break-all;
`

const TitleNumber = ({ id, type }: { id: string; type: string }) => {
    return (
        <Flex direction="column">
            <div>Sorry,</div>
            <Flex direction="row">
                {type}
                <Number>{id}</Number>
            </Flex>
            <div>is not found</div>
        </Flex>
    )
}

const Number = styled.span`
    ${typos.suit['32.44_900']}
    color: ${getThemeColor(colors.blue[300])};
    max-width: 742px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    margin-left: 8px;
`
