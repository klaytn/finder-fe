import Axios from 'axios'
import { FormEvent, KeyboardEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import {
    Button,
    colors,
    ConfirmNormalIcon,
    Divider,
    ErrorIcon,
    FileInput,
    Flex,
    If,
    Input,
    ProgressCircle,
    Radio,
    Text,
    Toast,
    typos,
    withAlpha,
} from '@klaytn/slush'

import { Library, postContract } from '../../../api/contract'
import { ContractSubmitResult } from '../../../constants/contract'
import { FinderError } from '../../../errors/commonErrors'
import { KaikasError } from '../../../errors/kaikasErrors'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useFormValue from '../../../hooks/useFormValue'
import { useToggle } from '../../../hooks/useToggle'
import { useWalletManager } from '../../../hooks/useWalletManager'
import { contractCodeQuery } from '../../../states/contract'
import { FormItem } from './formItems'
import LibrariesInput from './librariesInput'

const getInitialLibraries = () => Array.from({ length: 10 }).map(() => ({ name: '', address: '' }))

const SignOn = () => {
    const checkIconColor = useFinderThemeColor(colors.green[500])
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null)
    const { selectedAddress, walletManager, type } = useWalletManager()

    const contractCode = useRecoilValue(contractCodeQuery)

    const [isToken, handleIsTokenChange] = useFormValue({ initialValue: 'yes' })

    // Token only values
    const tokenLogoRef = useRef<HTMLInputElement>(null)
    const [websiteUrl, handleWebsiteUrlChange, handleWebsiteUrlClear] = useFormValue()
    const [emailAddress, handleEmailAddressChange, handleEmailAddressClear] = useFormValue()
    const [tokenLogoImage, handleTokenLogoImageChange, handleTokenLogoImageClear] = useFormValue()

    // Shared values
    const sourceCodeRef = useRef<HTMLInputElement>(null)
    const [contractAddress, handleContractAddressChange, handleContractAddressClear] = useFormValue()
    const [compilerVersion, handleCompilerVersionChange, handleCompilerVersionClear, handleCompilerVersionSelect] =
        useFormValue()
    const [licenseType, handleLicenseTypeChange, handleLicenseTypeClear, handleLicenseTypeSelect] = useFormValue()
    const [optimization, handleOptimizationChange] = useFormValue({ initialValue: 'false' })
    const [optimizationRuns, handleOptimizationRunsChange, handleOptimizationRunsClear] = useFormValue()
    const [sourceCode, handleSourceCodeChange, handleSourceCodeClear] = useFormValue()
    const [abiEncodedValue, handleAbiEncodedValueChange, handleAbiEncodedValueClear] = useFormValue()
    const [evmVersion, handleEvmVersionChange, handleEvmVersionClear, handleEvmVersionSelect] = useFormValue()

    const [libraries, setLibraries] = useState<Library[]>(getInitialLibraries)

    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        // Changing the token status will reset the token-related inputs reset

        const clearList = [handleWebsiteUrlClear, handleEmailAddressClear, handleTokenLogoImageClear]
        clearList.forEach((clear) => clear())
        setHasError(false)
    }, [handleEmailAddressClear, handleTokenLogoImageClear, handleWebsiteUrlClear, isToken])

    const getSignature = useCallback(() => {
        const date = new Date()
        const yyyy = date.getFullYear()
        const mm = `${date.getMonth() + 1}`.padStart(2, '0')
        const dd = `${date.getDate()}`.padStart(2, '0')
        const yyyymmdd = `${yyyy}${mm}${dd}`
        return walletManager.selectedWallet.sign(`${yyyymmdd}${contractAddress}`)
    }, [walletManager, contractAddress])

    const { on: showProgress, off: hideProgress, isShow: progressIsShow } = useToggle()
    const errorToastState = useToggle()

    const [errorMessage, setErrorMessage] = useState('')
    const [errorToastColor, setErrorToastColor] = useState<'red' | 'yellow'>('red')

    const checkCustomErrors = useCallback(() => {
        const formElement = formRef.current
        if (!formElement) {
            return false
        }

        const inputs = formElement.querySelectorAll<HTMLInputElement>('input[required]')
        const hasEmptyValue = Array.from(inputs).some((input) => {
            if (!input.value) {
                input.focus()
                return true
            }

            return false
        })

        setHasError(hasEmptyValue)

        return !hasEmptyValue // isSuccess
    }, [])

    const handleSubmit = async () => {
        if (!checkCustomErrors() || type === 'NONE') {
            return
        }

        try {
            showProgress()

            const contractCreatorSignature = await getSignature()
            if (!contractCreatorSignature) {
                throw new KaikasError('Failed to get allowance connecting to the\nwallet. Please check and try again.')
            }

            const {
                data: { result },
            } = await postContract({
                contractCreatorSignature,
                abiEncodedValue,
                compilerVersion,
                contractAddress,
                evmVersion: contractCode.evmVersions.find(({ desc }) => desc === evmVersion)?.name || '',
                licenseType,
                optimization,
                optimizationRuns,
                sourceCode: sourceCodeRef.current?.files || undefined,
                officialEmailAddress: emailAddress,
                officialWebSite: websiteUrl,
                tokenImage: tokenLogoRef.current?.files || undefined,
                walletType: type,
                libraries,
            })

            const resultValue = result ? ContractSubmitResult.Success : ContractSubmitResult.Fail
            navigate({
                pathname: `/contract/done/${resultValue}`,
            })
        } catch (err) {
            if (err instanceof KaikasError) {
                setErrorMessage(err.message)
                setErrorToastColor('yellow')
                errorToastState.on()
                return
            }

            if (err instanceof FinderError) {
                setErrorMessage(err.message)
                setErrorToastColor('red')
                errorToastState.on()
                return
            }

            const errorMessage: string =
                (Axios.isAxiosError(err) && err.response?.data?.message) || 'An error has occurred. Please try again.'

            setErrorMessage(errorMessage)
            setErrorToastColor('red')
            errorToastState.on()
        } finally {
            hideProgress()
        }
    }

    const handleDisconnect: MouseEventHandler<HTMLButtonElement> = (event) => {
        walletManager.disconnect()
        event.preventDefault()
    }

    const handlePreventEnter = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    const handleDoNotSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }, [])

    if (!contractCode) {
        return null
    }

    return (
        <>
            <ProgressCircle show={progressIsShow} overlay size={64} />
            <Toast
                message={errorMessage}
                onClose={errorToastState.off}
                show={errorToastState.isShow}
                color={errorToastColor}
                icon={ErrorIcon}
            />

            <WalletConnectRow className="flex_space_between">
                <SelectedAddressContainer>
                    {selectedAddress.slice(0, 12) +
                        '...' +
                        selectedAddress.slice(selectedAddress.length - 10, selectedAddress.length)}
                    <ConfirmNormalIcon size={13} color={checkIconColor} />
                </SelectedAddressContainer>
                <DisconnectButton onClick={handleDisconnect}>Disconnect</DisconnectButton>
            </WalletConnectRow>
            <ContractTypeSelectRow>
                <Divider />
                <ContractTypeSelectBox>
                    Is this contract for a token?
                    <ContractTypeRadioBox>
                        <Radio label="Yes" checked={isToken === 'yes'} value="yes" onChange={handleIsTokenChange} />
                        <Radio label="No" checked={isToken === 'no'} value="no" onChange={handleIsTokenChange} />
                    </ContractTypeRadioBox>
                </ContractTypeSelectBox>
                <Divider />
            </ContractTypeSelectRow>

            <ContractSubmitForm onKeyDown={handlePreventEnter} ref={formRef} onSubmit={handleDoNotSubmit}>
                <If condition={isToken === 'yes'}>
                    <FormRow>
                        <FormItem label="Official website URL" required requiredError={!websiteUrl && hasError}>
                            <Input
                                value={websiteUrl}
                                onChange={handleWebsiteUrlChange}
                                onClear={handleWebsiteUrlClear}
                                hasClearButton
                                valid={!!websiteUrl || !hasError}
                                required
                            />
                        </FormItem>
                        <FormItem label="Official email address" required requiredError={!emailAddress && hasError}>
                            <Input
                                value={emailAddress}
                                onChange={handleEmailAddressChange}
                                onClear={handleEmailAddressClear}
                                hasClearButton
                                valid={!!emailAddress || !hasError}
                                required
                            />
                        </FormItem>
                    </FormRow>

                    <FormRow>
                        <FormItem label="Token logo image" required requiredError={!tokenLogoImage && hasError}>
                            <FileInput
                                ref={tokenLogoRef}
                                value={tokenLogoImage}
                                onChange={handleTokenLogoImageChange}
                                onClear={handleTokenLogoImageClear}
                                placeholder=".svg recommended"
                                valid={!!tokenLogoImage || !hasError}
                                required
                                accept="image/*"
                            />
                        </FormItem>
                    </FormRow>

                    <TokenFormDivider />
                </If>

                <FormRow>
                    <FormItem label="Contract Address" required requiredError={!contractAddress && hasError}>
                        <Input
                            value={contractAddress}
                            onChange={handleContractAddressChange}
                            onClear={handleContractAddressClear}
                            hasClearButton
                            valid={!!contractAddress || !hasError}
                            required
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem
                        label="Source Code(Solidity File)"
                        required
                        requiredError={!sourceCode && hasError}
                        description="In submitting the source code, The code that was deployed on-chain must be flattened and made
                        into a single file. The code must be identical to the deployed code, and must be compilable.
                        Modified code cannot be submitted."
                    >
                        <FileInput
                            ref={sourceCodeRef}
                            value={sourceCode}
                            onChange={handleSourceCodeChange}
                            onClear={handleSourceCodeClear}
                            valid={!!sourceCode || !hasError}
                            required
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem label="Compiler version" required requiredError={!compilerVersion && hasError}>
                        <Input
                            value={compilerVersion}
                            onChange={handleCompilerVersionChange}
                            onClear={handleCompilerVersionClear}
                            hasClearButton
                            placeholder="Select complier version"
                            autoCompleteItems={contractCode.versions}
                            onSelectOnAutoComplete={handleCompilerVersionSelect}
                            valid={!!compilerVersion || !hasError}
                            required
                        />
                    </FormItem>
                    <FormItem label="Open Source License Type" required requiredError={!licenseType && hasError}>
                        <Input
                            value={licenseType}
                            onChange={handleLicenseTypeChange}
                            onClear={handleLicenseTypeClear}
                            hasClearButton
                            placeholder="Select Open Source License Type"
                            autoCompleteItems={contractCode.licenses}
                            onSelectOnAutoComplete={handleLicenseTypeSelect}
                            valid={!!licenseType || !hasError}
                            required
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem label="EVM version">
                        <Input
                            value={evmVersion}
                            onChange={handleEvmVersionChange}
                            onClear={handleEvmVersionClear}
                            hasClearButton
                            placeholder="Select EVM Version"
                            autoCompleteItems={contractCode.evmVersions.map(({ desc }) => desc)}
                            onSelectOnAutoComplete={handleEvmVersionSelect}
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem label="Optimization" required labelMarginBottom={28}>
                        <OptimizationRadioBox>
                            <Radio
                                label="True"
                                value="true"
                                checked={optimization === 'true'}
                                onChange={handleOptimizationChange}
                            />
                            <Radio
                                label="False"
                                value="false"
                                checked={optimization === 'false'}
                                onChange={handleOptimizationChange}
                            />
                        </OptimizationRadioBox>
                    </FormItem>
                    <FormItem label="Optimization Runs" description="200 is the default value is Solidity">
                        <Input
                            value={optimizationRuns}
                            onChange={handleOptimizationRunsChange}
                            onClear={handleOptimizationRunsClear}
                            hasClearButton
                            disabled={optimization === 'false'}
                            style={{
                                cursor: optimization === 'true' ? 'text' : 'not-allowed',
                            }}
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem
                        label="ABI-encoded constructor arguments"
                        description="If Constructor Arguments are required by the contract, you will add them to the ABI-encoded
                        constructor arguments field in ABI hex encoded form. Constructor arguments are appended to the
                        END of the contract source bytecode when compiled by Solidity. An easy way to find these
                        arguments is to compare the input data in the transaction details to to the contract source
                        bytecode."
                        additionalDescription={
                            <ItemExampleBox>
                                <ItemExampleTitleText>Sample</ItemExampleTitleText>
                                <ItemExampleDescriptionText>
                                    0000000000000000000006595656b93ce14834f0d22b7bbda4382d5ab51000000000000000000000000000000000000000000000000d8d726b7177a8000
                                </ItemExampleDescriptionText>
                            </ItemExampleBox>
                        }
                    >
                        <Input
                            value={abiEncodedValue}
                            onChange={handleAbiEncodedValueChange}
                            onClear={handleAbiEncodedValueClear}
                            hasClearButton
                        />
                    </FormItem>
                </FormRow>

                <FormRow>
                    <FormItem
                        label="Contract Library Address"
                        description="For contracts that use libraries, supports up to 10 libraries"
                    >
                        <LibrariesInput libraries={libraries} onChange={setLibraries} />
                    </FormItem>
                </FormRow>

                <SubmitButtonRow>
                    <SubmitButton type="button" buttonType="first" leftIcon={ConfirmNormalIcon} onClick={handleSubmit}>
                        Sign and Submit
                    </SubmitButton>
                </SubmitButtonRow>
            </ContractSubmitForm>
        </>
    )
}

const WalletConnectRow = styled(Flex).attrs({
    direction: 'row',
})`
    margin-top: 28px;
`

const SelectedAddressContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    gap: 10px;
    align-items: center;
    width: 312px;
    height: 44px;
    padding: 0px 24px;
    margin: 5px;
    background: ${getThemeColor(colors.green[900])};
    color: ${getThemeColor(colors.green[500])};
    border-radius: 16px;
    ${typos.suit['16.20_900']};
`

const DisconnectButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 144px;
    height: 44px;
    padding: 0px 24px;
    margin: 5px;
    background: ${getThemeColor(withAlpha(colors.white, 5))};
    color: ${getThemeColor(colors.black[400])};
    border-radius: 16px;
    ${typos.suit['16.20_900']};
    border: none;
    cursor: pointer;
`

const ContractTypeSelectRow = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    align-items: center;
    gap: 20px;
    margin-top: 72px;
`

const ContractTypeSelectBox = styled(Flex).attrs({
    round: 16,
    direction: 'row',
    justifyContent: 'space-between',
})`
    border: 2px solid ${getThemeColor(colors.blue[600])};
    color: ${getThemeColor(colors.white)};
    ${typos.suit['14.18_900']};
    min-width: 400px;
    width: 400px;
    padding: 16px 20px;
`

const ContractTypeRadioBox = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 28px;
`

const ContractSubmitForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-top: 28px;
`

const FormRow = styled(Flex).attrs({
    direction: 'row',
})`
    width: 100%;
    gap: 64px;
`

const TokenFormDivider = styled(Divider)`
    margin: 14px 0px;
`

const OptimizationRadioBox = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 36px;
`

const ItemExampleBox = styled(Flex).attrs({
    direction: 'column',
})``

const ItemExampleTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_900'],
        color: colors.black[600],
    }),
)``

const ItemExampleDescriptionText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.suit['12.16_400'],
        color: colors.black[600],
    }),
)``

const SubmitButtonRow = styled(Flex)`
    align-items: end;
    margin-top: 20px;
`

const SubmitButton = styled(Button)`
    width: 200px;
    margin: 0;
`

export default SignOn
