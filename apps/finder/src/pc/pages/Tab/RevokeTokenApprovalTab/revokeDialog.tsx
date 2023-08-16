import BigNumber from 'bignumber.js'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import {
    Button,
    ChevronBottomIcon,
    ChevronTopIcon,
    CircleiconConfirmOnIcon,
    CircleiconWarningOnIcon,
    colors,
    Dialog,
    DialogButtons,
    Divider,
    ProgressInnerCircle,
    setTransition,
    Text,
    typos,
    useToggle,
    withAlpha,
} from '@klaytn/slush'

import Address from '../../../../components/Address'
import { KlayBox, NameWithIcon, TokenIdBox } from '../../../../components/commons/table/variants'
import { isGhostAddress } from '../../../../constants/address'
import { ROUTES } from '../../../../constants/routes'
import { getThemeColor, getThemeColorOnAttrs } from '../../../../functions/colorMap'
import {
    getAllowance,
    getApproved,
    isApprovedForAll,
    revokeNft,
    revokeNftById,
    revokeToken,
    waitForSaveTransaction,
} from '../../../../functions/rpc'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import usePublicCaver from '../../../../hooks/usePublicCaver'
import { useWalletManager } from '../../../../hooks/useWalletManager'
import TimesAgo from '../../../../mobile/components/common/timesAgo'
import { ContractSummaryVO, SpenderAccountVO } from '../../../../vo/approvedToken'

interface BaseRevokeDialogProps {
    open: boolean
    onClose: () => void
    type: string
    contractSummary?: ContractSummaryVO
    spenderAccount?: SpenderAccountVO
    lastUpdated?: Date
    refresh: () => void
}

interface TokenRevokeDialogProps extends BaseRevokeDialogProps {
    type: 'token'
    approvedAmount?: BigNumber
    isUnlimited?: boolean
}

export type TokenProps = Omit<TokenRevokeDialogProps, keyof BaseRevokeDialogProps> &
    Pick<BaseRevokeDialogProps, 'contractSummary' | 'spenderAccount' | 'lastUpdated'>

function isTokenType(props: BaseRevokeDialogProps): props is TokenRevokeDialogProps {
    return props.type === 'token'
}

interface NftRevokeDialogProps extends BaseRevokeDialogProps {
    type: 'nft'
}

export type NftProps = Pick<BaseRevokeDialogProps, 'contractSummary' | 'spenderAccount' | 'lastUpdated'>

interface NftTokenIdRevokeDialogProps extends BaseRevokeDialogProps {
    type: 'nft-token-id'
    tokenId?: string
}

export type NftTokenIdProps = Omit<NftTokenIdRevokeDialogProps, keyof BaseRevokeDialogProps> &
    Pick<BaseRevokeDialogProps, 'contractSummary' | 'spenderAccount' | 'lastUpdated'>

function isNftTokenIdType(props: BaseRevokeDialogProps): props is NftTokenIdRevokeDialogProps {
    return props.type === 'nft-token-id'
}

type RevokeDialogProps = TokenRevokeDialogProps | NftRevokeDialogProps | NftTokenIdRevokeDialogProps

const RevokeDialog = (props: RevokeDialogProps) => {
    const { type, contractSummary, spenderAccount, lastUpdated, onClose, open, refresh } = props

    const { approvedAmount, isUnlimited } = isTokenType(props) ? props : ({} as TokenProps)
    const { tokenId } = isNftTokenIdType(props) ? props : ({} as NftTokenIdProps)
    const publicCaver = usePublicCaver()
    const { isConnected, walletManager, selectedAddress } = useWalletManager()
    const [isLoading, setIsLoading] = useState(false)
    const [txHash, setTxHash] = useState('')
    const [errorLog, setErrorLog] = useState('')

    useEffect(() => {
        setIsLoading(false)
        setTxHash('')
        setErrorLog('')
    }, [open, contractSummary])

    const handleClose = useCallback(() => {
        if (isLoading) {
            return
        }

        onClose()
    }, [isLoading, onClose])

    const handleDone = useCallback(() => {
        refresh()
        onClose()
    }, [refresh, onClose])

    const handleGoToTx = useCallback(() => {
        window.open(ROUTES.TX.DETAIL.replace(':txHash', txHash), '_blank', 'noopener')
    }, [txHash])

    if (!contractSummary || !spenderAccount || !lastUpdated || !selectedAddress) {
        return null
    }

    const linkRoute = type === 'token' ? ROUTES.TOKEN.DETAIL : ROUTES.NFT.DETAIL

    const checkApproved = async () => {
        if (!isConnected) {
            return
        }

        switch (type) {
            case 'token': {
                const allowance = await getAllowance({
                    caver: publicCaver,
                    contractAddress: contractSummary.contractAddress,
                    spenderAddress: spenderAccount.address,
                    fromAddress: selectedAddress,
                })
                return !allowance.isZero()
            }

            case 'nft': {
                return isApprovedForAll({
                    caver: publicCaver,
                    contractAddress: contractSummary.contractAddress,
                    spenderAddress: spenderAccount.address,
                    fromAddress: selectedAddress,
                })
            }

            case 'nft-token-id': {
                if (tokenId === undefined) {
                    return false
                }

                const approvedAddress = await getApproved({
                    caver: publicCaver,
                    contractAddress: contractSummary.contractAddress,
                    tokenId,
                    fromAddress: selectedAddress,
                })

                return !isGhostAddress(approvedAddress)
            }
        }
    }

    const doRevoke = async () => {
        if (!isConnected) {
            return
        }

        let txHash: string
        switch (type) {
            case 'token': {
                txHash = await revokeToken({
                    caver: publicCaver,
                    wallet: walletManager.selectedWallet,
                    contractAddress: contractSummary.contractAddress,
                    spenderAddress: spenderAccount.address,
                })

                break
            }

            case 'nft': {
                txHash = await revokeNft({
                    wallet: walletManager.selectedWallet,
                    contractAddress: contractSummary.contractAddress,
                    spenderAddress: spenderAccount.address,
                })

                break
            }

            case 'nft-token-id': {
                txHash = await revokeNftById({
                    wallet: walletManager.selectedWallet,
                    contractAddress: contractSummary.contractAddress,
                    tokenId: tokenId || '',
                })

                break
            }

            default:
                txHash = ''
                break
        }

        if (txHash) {
            await waitForSaveTransaction(txHash)
        }

        setTxHash(txHash)
    }

    const handleRevoke = async () => {
        setIsLoading(true)
        try {
            if (!isConnected) {
                return
            }

            const isApproved = await checkApproved()
            if (!isApproved) {
                return
            }

            await doRevoke()
            refresh()
        } catch (err) {
            if (err instanceof Error) {
                setErrorLog(err.message)
            } else {
                setErrorLog(JSON.stringify(err))
            }
        } finally {
            setIsLoading(false)
        }
    }

    const title = txHash ? <SuccessTitle /> : errorLog ? <FailTitle /> : 'Check Approval Detail'

    return (
        <Dialog
            subtitle="Revoke Token Approval"
            title={title}
            override={{
                titleTypo: typos.suit['24.32_900'],
                padding: '36px 60px',
            }}
            onClose={handleClose}
            show={open}
            align="center"
        >
            {!txHash && !errorLog && (
                <Container>
                    <NameWithIcon
                        justifyContent="center"
                        name={contractSummary.name}
                        iconUri={contractSummary.icon}
                        link={`${linkRoute.replace(':address', contractSummary.contractAddress)}`}
                        openInNewPage
                    />
                    <Divider />
                    <DetailContainer>
                        <Details title="Spender">
                            <Address value={spenderAccount} openInNewPage />
                        </Details>

                        {tokenId !== undefined && (
                            <Details title="Token ID">
                                <TokenIdBox
                                    contractAddress={contractSummary.contractAddress}
                                    copyButtonPosition="none"
                                    tokenId={tokenId}
                                    align="left"
                                    openInNewPage
                                />
                            </Details>
                        )}

                        {!!approvedAmount && (
                            <Details title="Allowance">
                                <KlayContainer>
                                    <KlayBox
                                        value={approvedAmount}
                                        symbol={contractSummary.symbol}
                                        isUnlimited={isUnlimited}
                                    />
                                </KlayContainer>
                            </Details>
                        )}

                        <Details title="Last Update">
                            <TimesAgoContainer>
                                <TimesAgo datetime={lastUpdated} short />
                            </TimesAgoContainer>
                        </Details>
                    </DetailContainer>
                </Container>
            )}

            {!!errorLog && (
                <ErrorContainer>
                    <ErrorDesc>
                        There is an unexpected error.
                        <br />
                        Please try again later.
                    </ErrorDesc>
                    <ErrorLog log={errorLog} />
                </ErrorContainer>
            )}

            <DialogButtons gap={8}>
                {!txHash && !errorLog && (
                    <RevokeButton size={40} onClick={handleRevoke} disabled={isLoading}>
                        {isLoading ? <ProgressInnerCircle size={50} /> : 'Revoke'}
                    </RevokeButton>
                )}

                {!!txHash && (
                    <RevokeButton size={40} onClick={handleGoToTx} buttonType="forth">
                        Check transaction
                    </RevokeButton>
                )}

                {(!!txHash || !!errorLog) && (
                    <RevokeButton size={40} onClick={handleDone}>
                        OK
                    </RevokeButton>
                )}
            </DialogButtons>
        </Dialog>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 36px;
`

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
`

type DetailsProps = {
    title: string
    children: ReactNode
}

const Details = ({ title, children }: DetailsProps) => {
    return (
        <DetailsContainer>
            <DetailsTitle>{title}</DetailsTitle>
            <DetailsContents>{children}</DetailsContents>
        </DetailsContainer>
    )
}

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`

const DetailsTitle = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['14.18_900'],
        color: colors.white,
    }),
)`
    width: 132px;
    flex-shrink: 0;
    text-align: left;
`

const DetailsContents = styled.div`
    flex-grow: 1;
`

const KlayContainer = styled.div`
    ${typos.suit['14.18_400']};
`

const TimesAgoContainer = styled.div`
    display: flex;
    text-align: left;
    ${typos.suit['14.18_400']};
    color: ${getThemeColor(colors.black[400])};
`

const RevokeButton = styled(Button)`
    margin: 0;
    width: 152px;
`

const SuccessTitle = () => {
    const iconColor = useFinderThemeColor(colors.green[500])
    return (
        <TitleRow success>
            <CircleiconConfirmOnIcon size={28} color={iconColor} />
            Successfully Revoked
        </TitleRow>
    )
}

const FailTitle = () => {
    const iconColor = useFinderThemeColor(colors.red[500])
    return (
        <TitleRow>
            <CircleiconWarningOnIcon size={28} color={iconColor} />
            Failed to Revoke
        </TitleRow>
    )
}

const TitleRow = styled.div<{ success?: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
    color: ${getThemeColor(({ success }) => (success ? colors.green[500] : colors.red[500]))};
    ${typos.suit['24.32_900']};
`

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ErrorDesc = styled.div`
    text-align: center;
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_400']};
    margin-top: 16px;
    margin-bottom: 32px;
`

type ErrorLogProps = {
    log: string
}

const ErrorLog = ({ log }: ErrorLogProps) => {
    const { isShow, toggle } = useToggle()

    const iconColor = useFinderThemeColor(withAlpha(colors.white, 35))
    const ToggleIcon = isShow ? ChevronTopIcon : ChevronBottomIcon

    return (
        <ErrorLogContainer>
            <ErrorLogToggleButton onClick={toggle}>
                view error code <ToggleIcon size={16} color={iconColor} />
            </ErrorLogToggleButton>
            <ErrorLogDetails isShow={isShow}>
                <ErrorLogDetailsInner>{log}</ErrorLogDetailsInner>
            </ErrorLogDetails>
        </ErrorLogContainer>
    )
}

const ErrorLogContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
`

const ErrorLogToggleButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: none;
    margin: 0;
    padding: 0;
    background: none;
    cursor: pointer;
    color: ${getThemeColor(withAlpha(colors.white, 35))};
    ${typos.suit['14.18_400']};
`

const ErrorLogDetails = styled.div<{ isShow: boolean }>`
    display: inline-flex;
    background: ${getThemeColor(withAlpha(colors.white, 5))};
    border-radius: 20px;
    height: ${({ isShow }) => (isShow ? 80 : 0)}px;
    padding: ${({ isShow }) => (isShow ? 20 : 0)}px;
    opacity: ${({ isShow }) => (isShow ? 1 : 0)};
    overflow: hidden;
    ${setTransition('height', 'padding', 'opacity')};
`

const ErrorLogDetailsInner = styled.div`
    height: 80px;
    text-align: left;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;
    color: ${getThemeColor(colors.black[400])};
    ${typos.code['12.16_400']};
`

export default RevokeDialog
