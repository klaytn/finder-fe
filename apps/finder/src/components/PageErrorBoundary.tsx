import Axios from 'axios'
import { ReactNode, Component } from 'react'
import parseUA from 'ua-parser-js'

import { useNft } from '../api/nft'
import { FinderError } from '../errors/commonErrors'
import { NotFoundError } from '../errors/networkErrors'
import { MOBILE_ERROR_CONTENT } from '../mobile/components/notFound/notFound'
import { ErrorContent } from '../types/errorBoundary'
import { ErrorComponentProps } from './PageError'
import { ERROR_CONTENT } from './pc/error'

const {
    device: { type },
} = parseUA(window.navigator.userAgent)

const isMobile = ['mobile', 'tablet', 'wearable'].includes(type || '')

const ErrorContents = isMobile ? MOBILE_ERROR_CONTENT : ERROR_CONTENT

const createErrorProps = (content: ErrorContent, id: string) => ({
    hasError: true,
    hasDesc: true,
    content,
    titleProps: { id },
})

const NftItemErrorLayout = ({
    search,
    titleProps,
    fallback: FallbackUI,
}: {
    search: string
    titleProps: Record<string, string>
    fallback: (props: ErrorComponentProps) => JSX.Element
}) => {
    const {
        info: { symbol },
    } = useNft(search)

    return <FallbackUI content={ErrorContents.NFT_ITEM} hasDesc titleProps={{ ...titleProps, symbol }} />
}

type State = {
    hasError: boolean
    titleProps?: Record<string, string>
    search?: string
} & Partial<ErrorComponentProps>

type Props = {
    children: ReactNode
    pathname: string
    fallback: (props: ErrorComponentProps) => JSX.Element
}

class PageErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.pathname !== this.props.pathname) {
            this.setState({
                hasError: false,
            })
        }
    }

    static getDerivedStateFromError(error: unknown) {
        if (Axios.isAxiosError(error)) {
            return {
                hasError: true,
                hasDesc: false,
                content: ErrorContents.COMMON_ERROR,
            }
        }

        if (!(error instanceof FinderError)) {
            return {}
        }

        if (error instanceof NotFoundError) {
            if (error.path.startsWith('/transactions/')) {
                const [, txHash] = /\/transactions\/(0x[0-9a-z]+).*/.exec(error.path) || []
                return createErrorProps(ErrorContents.TX, txHash)
            }

            if (error.path.startsWith('/accounts/')) {
                const [, address] = /\/accounts\/(0x[0-9a-z]+).*/.exec(error.path) || []
                return createErrorProps(ErrorContents.ACCOUNT, address)
            }

            const [, blockId] = /\/blocks\/([0-9]+).*/.exec(error.path) || []
            if (blockId !== undefined) {
                return createErrorProps(ErrorContents.BLOCK, blockId)
            }

            if (error.path.startsWith('/tokens')) {
                const [, address] = /\/tokens\/(0x[0-9a-z]+).*/.exec(error.path) || []
                return createErrorProps(ErrorContents.TOKEN, address)
            }

            if (error.path.startsWith('/nfts') && error.path.includes('/tokenids')) {
                const [, address, tokenId] = /\/nfts\/(0x[0-9a-z]+)\/tokenids\/([0-9]+).*/.exec(error.path) || []
                return {
                    ...createErrorProps(ErrorContents.NFT_ITEM, tokenId),
                    search: address,
                }
            }

            if (error.path.startsWith('/nfts')) {
                const [, address] = /\/nfts\/(0x[0-9a-z]+).*/.exec(error.path) || []
                return {
                    ...createErrorProps(ErrorContents.NFT, address),
                    search: undefined,
                }
            }
        }
    }
    render() {
        const { hasError, hasDesc, content, titleProps = {}, search = '' } = this.state
        const { fallback: FallbackUI } = this.props

        if (hasError && content) {
            if (search) {
                return <NftItemErrorLayout search={search} titleProps={titleProps} fallback={FallbackUI} />
            }
            return <FallbackUI hasDesc={hasDesc} content={content} titleProps={titleProps} />
        }
        return this.props.children
    }
}

export default PageErrorBoundary
