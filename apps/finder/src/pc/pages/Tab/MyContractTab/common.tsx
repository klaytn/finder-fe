import Axios from 'axios'
import format from 'date-fns/format'
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState, ChangeEventHandler } from 'react'
import styled, { css } from 'styled-components'

import { Button, colors, ImageIcon, Input, ProgressInnerCircle, setTransition, typos, withAlpha } from '@klaytn/slush'

import { postMyContract } from '../../../../api/my'
import Address from '../../../../components/Address'
import { FinderError } from '../../../../errors/commonErrors'
import { KaikasError } from '../../../../errors/kaikasErrors'
import { getThemeColor } from '../../../../functions/colorMap'
import { extractProp } from '../../../../functions/Functions'
import { useFinderThemeColor } from '../../../../hooks/useFinderThemeColor'
import useFormValue from '../../../../hooks/useFormValue'
import { useToggle } from '../../../../hooks/useToggle'
import { useWalletManager } from '../../../../hooks/useWalletManager'
import { MyContractVO } from '../../../../vo/myContract'
import { FormItem } from './formItem'

const DATE_FORMAT = 'yyyy.MM.dd hh.mm aa'

const getCreatedOrUpdatedAt = ({ isUpdated, createdAt, updatedAt }: MyContractVO) => {
    const createdOrUpdatedPrefix = isUpdated ? 'Last updated at' : 'Submitted at'
    const createdOrUpdated = isUpdated ? updatedAt : createdAt
    const createdOrUpdatedStr = format(createdOrUpdated, DATE_FORMAT)

    return `${createdOrUpdatedPrefix} ${createdOrUpdatedStr}`
}

type MyContractInfoRowProps = {
    index: number
    contract: MyContractVO
}

type MyContractTokenInfoRowProps = MyContractInfoRowProps & {
    showErrorToast(message: string, isWarning?: boolean): void
    refresh: () => void
}

export const MyContractTokenInfoRow = ({ index, contract, showErrorToast, refresh }: MyContractTokenInfoRowProps) => {
    const { type, walletManager } = useWalletManager()
    const { address, name, symbol, icon } = contract
    const { isShow, on, off } = useToggle()

    const hasNameOrSymbol = !!name || !!symbol
    const createdOrUpdated = getCreatedOrUpdatedAt(contract)

    const [officialSite, handleOfficialSiteChange, handleOfficialSiteReset, , setOfficialSite] = useFormValue({
        initialValue: contract.officialSite,
    })
    const [
        officialEmailAddress,
        handleOfficialEmailAddressChange,
        handleOfficialEmailAddressReset,
        ,
        setOfficialEmailAddress,
    ] = useFormValue({
        initialValue: contract.officialEmailAddress,
    })
    const [iconFile, setIconFile] = useState<File>()
    const [removeIcon, setRemoveIcon] = useState(false)

    const [isPending, setIsPending] = useState(false)
    const handleOfficialSiteClear = useCallback(() => {
        setOfficialSite('')
    }, [setOfficialSite])

    const handleOfficialEmailAddressClear = useCallback(() => {
        setOfficialEmailAddress('')
    }, [setOfficialEmailAddress])

    useEffect(() => {
        if (!isShow) {
            return
        }

        handleOfficialSiteReset()
        handleOfficialEmailAddressReset()
        setIconFile(undefined)
        setRemoveIcon(false)
    }, [isShow, handleOfficialSiteReset, handleOfficialEmailAddressReset])

    const getSignature = useCallback(() => {
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = `${date.getMonth() + 1}`.padStart(2, '0')
        const dd = `${date.getDate()}`.padStart(2, '0')
        const yyyymmdd = `${yyyy}${mm}${dd}`
        return walletManager.selectedWallet.sign(`${yyyymmdd}${contract.address}`)
    }, [walletManager, contract.address])

    const handleSubmit = useCallback(async () => {
        if (type === 'NONE') {
            return
        }

        try {
            off()
            setIsPending(true)

            const contractCreatorSignature = await getSignature()

            await postMyContract({
                contractAddress: contract.address,
                contractCreatorSignature,
                walletType: type,
                icon: iconFile,
                officialEmailAddress,
                officialSite,
                deleteIcon: removeIcon,
            })
        } catch (err) {
            if (err instanceof KaikasError) {
                showErrorToast(err.message, true)
                return
            }

            if (err instanceof FinderError) {
                showErrorToast(err.message, false)
                return
            }

            const errorMessage: string =
                (Axios.isAxiosError(err) && err.response?.data?.message) ||
                'Sorry, there is an unexpected error.\nPlease try again.'

            showErrorToast(errorMessage)
        } finally {
            refresh()
            setIsPending(false)
        }
    }, [
        contract.address,
        iconFile,
        officialEmailAddress,
        officialSite,
        type,
        off,
        getSignature,
        showErrorToast,
        removeIcon,
        refresh,
    ])

    const showEditButton = !isPending && !isShow
    const showLoadingIcon = isPending
    const showCancelButtons = !isPending && isShow

    return (
        <Container>
            <InnerContainer>
                <HorizontalContainer>
                    <VerticalContainer center={!hasNameOrSymbol}>
                        <Index>{index}</Index>
                    </VerticalContainer>

                    <VerticalContainer center={!hasNameOrSymbol}>
                        {icon ? (
                            <IconImg src={icon} />
                        ) : (
                            <IconImg as="div">
                                <ImageIcon size={16} color={withAlpha(colors.white, 20)} />
                            </IconImg>
                        )}
                    </VerticalContainer>

                    <VerticalContainer center>
                        <Details>
                            {hasNameOrSymbol && (
                                <TokenNameAndSymbolRow>
                                    <TokenName>{name}</TokenName> {!!symbol && <TokenSymbol>({symbol})</TokenSymbol>}
                                </TokenNameAndSymbolRow>
                            )}
                            <AddressRow>
                                <Address value={address} />
                            </AddressRow>
                        </Details>
                    </VerticalContainer>
                </HorizontalContainer>

                <HorizontalContainer center>
                    {showLoadingIcon && <ProgressInnerCircle size={36} />}
                    {showEditButton && (
                        <>
                            <CreatedOrUpdatedAt hasMargin>{createdOrUpdated}</CreatedOrUpdatedAt>
                            <EditButton buttonType="forth" size={36} onClick={on}>
                                Edit
                            </EditButton>
                        </>
                    )}
                    {showCancelButtons && (
                        <>
                            <CancelButton buttonType="forth" size={36} onClick={off}>
                                Cancel
                            </CancelButton>
                            <ConfirmButton buttonType="first" size={36} onClick={handleSubmit}>
                                Confirm and Sign
                            </ConfirmButton>
                        </>
                    )}
                </HorizontalContainer>
            </InnerContainer>

            <EditContents
                isOpen={isShow}
                contract={contract}
                officialEmailAddress={officialEmailAddress}
                handleOfficialEmailAddressChange={handleOfficialEmailAddressChange}
                handleOfficialEmailAddressClear={handleOfficialEmailAddressClear}
                officialSite={officialSite}
                handleOfficialSiteChange={handleOfficialSiteChange}
                handleOfficialSiteClear={handleOfficialSiteClear}
                icon={iconFile}
                setIcon={setIconFile}
                removeIcon={removeIcon}
                setRemoveIcon={setRemoveIcon}
            />
        </Container>
    )
}

type EditContentsProps = {
    isOpen: boolean
    contract: MyContractVO

    officialSite: string
    handleOfficialSiteChange: ChangeEventHandler<HTMLInputElement>
    handleOfficialSiteClear: () => void

    officialEmailAddress: string
    handleOfficialEmailAddressChange: ChangeEventHandler<HTMLInputElement>
    handleOfficialEmailAddressClear: () => void

    icon: File | undefined
    setIcon: (icon: File | undefined) => void
    removeIcon: boolean
    setRemoveIcon: (nextValue: boolean) => void
}
const EditContents = ({
    isOpen,
    contract,
    handleOfficialEmailAddressChange,
    handleOfficialEmailAddressClear,
    handleOfficialSiteChange,
    handleOfficialSiteClear,
    officialEmailAddress,
    officialSite,
    icon: selectedFile,
    setIcon: setSelectedFile,
    removeIcon,
    setRemoveIcon,
}: EditContentsProps) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null)
    const handleUploadButtonClick = useCallback(() => {
        hiddenInputRef.current?.click()
    }, [])

    const handleImagePickup = useCallback(
        ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
            const file = files?.[0]
            setSelectedFile(file)
            setRemoveIcon(false)
        },
        [setSelectedFile, setRemoveIcon],
    )

    const selectedFileUrl = useMemo(() => {
        if (!selectedFile) {
            return ''
        }

        return URL.createObjectURL(selectedFile)
    }, [selectedFile])

    const handleDeleteFile = useCallback(() => {
        setRemoveIcon(true)
        setSelectedFile(undefined)
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = ''
        }
    }, [setRemoveIcon, setSelectedFile])

    const noIconColor = useFinderThemeColor(withAlpha(colors.white, 20))
    const logoImage = removeIcon ? '' : selectedFileUrl || contract.icon

    return (
        <EditContainer isOpen={isOpen}>
            <VerticalContainer center marginTop={20}>
                <FormItem label="Token logo image">
                    <ImageBackground>
                        {logoImage ? <LogoImage src={logoImage} /> : <ImageIcon size={88.75} color={noIconColor} />}
                        <UploadButtonBackground className="over">
                            <UploadButton size={28} onClick={handleUploadButtonClick}>
                                Upload Image
                            </UploadButton>
                            {!!logoImage && (
                                <UploadButton size={28} buttonType="second" onClick={handleDeleteFile}>
                                    Delete
                                </UploadButton>
                            )}
                        </UploadButtonBackground>
                    </ImageBackground>
                    <HiddenInput ref={hiddenInputRef} type="file" accept="image/*" onChange={handleImagePickup} />
                </FormItem>
            </VerticalContainer>
            <VerticalContainer center fullWidth marginTop={20}>
                <FormItem label="Official website URL">
                    <NoMarginInput
                        value={officialSite}
                        onChange={handleOfficialSiteChange}
                        onClear={handleOfficialSiteClear}
                        hasClearButton
                    />
                </FormItem>
                <FormItem label="Official email address">
                    <NoMarginInput
                        value={officialEmailAddress}
                        onChange={handleOfficialEmailAddressChange}
                        onClear={handleOfficialEmailAddressClear}
                        hasClearButton
                    />
                </FormItem>
            </VerticalContainer>
        </EditContainer>
    )
}

const EditContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: row;
    overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    gap: 40px;
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? 192 : 0)}px;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    ${setTransition('transform', 'opacity', 'height')};
`

const ImageBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 142px;
    height: 142px;
    border-radius: 14px;
    background-color: ${getThemeColor(withAlpha(colors.white, 5))};

    &:hover > .over {
        opacity: 1;
    }
`

const LogoImage = styled.img`
    width: 142px;
    height: 142px;
    background-color: ${getThemeColor(withAlpha(colors.white, 5))};
    object-fit: contain;
`

const NoMarginInput = styled(Input)`
    margin: 0px;
`

const UploadButtonBackground = styled.div`
    width: 142px;
    height: 142px;
    border-radius: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${withAlpha(colors.black[900], 85)};
    opacity: 0;
    position: absolute;
    ${setTransition('opacity')}
`

const UploadButton = styled(Button)`
    width: 91px;
`

const HiddenInput = styled.input`
    display: none;
`

export const MyContractNonTokenInfoRow = ({ index, contract }: MyContractInfoRowProps) => {
    const { address } = contract

    const createdOrUpdated = getCreatedOrUpdatedAt(contract)

    return (
        <Container>
            <InnerContainer>
                <HorizontalContainer>
                    <Index>{index}</Index>

                    <Details>
                        <AddressRow>
                            <Address value={address} />
                        </AddressRow>
                    </Details>
                </HorizontalContainer>

                <HorizontalContainer center>
                    <CreatedOrUpdatedAt>{createdOrUpdated}</CreatedOrUpdatedAt>
                </HorizontalContainer>
            </InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 0px;
    border-bottom: 1px solid ${getThemeColor(withAlpha(colors.white, 10))};
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const VerticalContainer = styled.div<{ center: boolean; fullWidth?: boolean; marginTop?: number }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
    margin-top: ${extractProp('marginTop')}px;
    ${({ fullWidth }) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : ''}
`

const HorizontalContainer = styled.div<{ center?: boolean }>`
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: ${({ center }) => (center ? 'center' : 'auto')};
`

const Index = styled.div`
    display: flex;
    width: 28px;
    height: 28px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${getThemeColor(withAlpha(colors.white, 5))};
    color: ${getThemeColor(colors.black[400])};
    ${typos.suit['10.14_900']};
    margin-right: 20px;
`

const IconImg = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${getThemeColor(withAlpha(colors.white, 5))};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
`

const TokenNameAndSymbolRow = styled.div``

const TokenName = styled.span`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_900']};
`

const TokenSymbol = styled.span`
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_400']};
`

const AddressRow = styled.div``

const CreatedOrUpdatedAt = styled.div<{ hasMargin?: boolean }>`
    display: flex;
    align-items: center;
    color: ${getThemeColor(colors.black[400])};
    ${typos.suit['14.18_400']};
    margin-right: ${({ hasMargin }) => (hasMargin ? 48 : 0)}px;
`

const EditButton = styled(Button)`
    width: 98px;
    margin: 0;
`

const CancelButton = styled(Button)`
    width: 98px;
    margin: 0;
    margin-right: 8px;
`

const ConfirmButton = styled(Button)`
    width: 168px;
    margin: 0;
`
