import { AbiItem, AbiOutput } from 'caver-js'
import { ChangeEventHandler, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { OnSelectProps } from 'react-json-view'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AbiItem as Web3AbiItem } from 'web3-utils'

import {
    ChevronBottomIcon,
    ChevronTopIcon,
    colors,
    Flex,
    Input,
    Text,
    typos,
    Button,
    percentageToHex,
    If,
    Radio,
    ProgressInnerCircle,
} from '@klaytn/slush'

import { JsonViewer } from '../../../../components/pc/viewer/jsonViewer'
import { ROUTES } from '../../../../constants/routes'
import { getMethodSignature } from '../../../../functions/abi'
import { getThemeColor, getThemeColorOnAttrs } from '../../../../functions/colorMap'
import { remoteCall, RPCResultType, waitForSaveTransaction } from '../../../../functions/rpc'
import usePublicCaver from '../../../../hooks/usePublicCaver'
import { useWalletManager } from '../../../../hooks/useWalletManager'

type CollapseCardProps = {
    index: number
    title: string
    isOpen: boolean
    toggle(): void
    children: ReactNode
}

const CollapseCard = ({ index, title, isOpen, toggle, children }: CollapseCardProps) => {
    return (
        <CollapseCardContainer>
            <CollapseTitleContainer role="button" onClick={toggle}>
                <CollapseOpenIcon as={isOpen ? ChevronTopIcon : undefined} />
                <CollapseTitleText>
                    {index + 1}. {title}
                </CollapseTitleText>
            </CollapseTitleContainer>
            <CollapseContentsContainer isOpen={isOpen}>{children}</CollapseContentsContainer>
        </CollapseCardContainer>
    )
}

const CollapseCardContainer = styled(Flex).attrs({
    direction: 'column',
})`
    background-color: ${getThemeColor(colors.black[830])};
    border-radius: 30px;
    padding: 24px 28px;
`

const CollapseTitleContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'conter',
})`
    cursor: pointer;
    gap: 8px;
`

const CollapseOpenIcon = styled(ChevronBottomIcon).attrs(
    getThemeColorOnAttrs({
        size: 20,
        color: colors.blue[300],
    }),
)``

const CollapseTitleText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.blue[300],
        typo: typos.suit['14.18_900'],
    }),
)``

const CollapseContentsContainer = styled(Flex).attrs({
    direction: 'column',
})<{ isOpen: boolean }>`
    margin-top: 28px;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
`

function createJsonFromFormat(data: unknown[], struct: AbiOutput, addressList: string[]) {
    const tuples = (struct.components || []).map(({ name, type }, idx) => {
        const value = data[idx]
        if (type === 'address') {
            addressList.push(value as string)
        }
        return [name, value]
    })
    return Object.fromEntries(tuples)
}

type SimpleResultProps = {
    functionName: string
    type: AbiOutput
    result?: RPCResultType
}
const SimpleResult = ({ type: { name, type }, type: struct, functionName, result = '' }: SimpleResultProps) => {
    const resultString = `${result}`

    const [resultJson, addressList] = useMemo(() => {
        if (!Array.isArray(result)) {
            return []
        }

        const addressList: string[] = []
        switch (type) {
            case 'tuple':
                return [createJsonFromFormat(result, struct, addressList), addressList]

            case 'tuple[]':
                return [result.map((item) => createJsonFromFormat(item, struct, addressList)), addressList]

            default:
                return []
        }
    }, [result, type, struct])

    const handleValueClick = useCallback(
        ({ value }: OnSelectProps) => {
            if (typeof value === 'string' && addressList?.includes(value)) {
                window.open(ROUTES.ACCOUNT.DETAIL.replace(':address', value), '_blank', 'noopener')
            }
        },
        [addressList],
    )

    return (
        <SimpleResultContainer>
            <SimpleResultNameText>{name || functionName}:</SimpleResultNameText>
            <If condition={type === 'address'}>
                <SimpleResultContentLink to={`/account/${result}`}>
                    {resultString.toLowerCase()}
                </SimpleResultContentLink>
                <SimpleResultTypeText>{type}</SimpleResultTypeText>
            </If>
            <If condition={type === 'txHash'}>
                <SimpleResultContentLink to={`/tx/${result}`}>{resultString.toLowerCase()}</SimpleResultContentLink>
            </If>
            <If condition={!!resultJson}>
                <SimpleResultJsonWrapper>
                    <JsonViewer
                        maxHeight={200}
                        data={resultJson}
                        collapsed={2}
                        paddingLeft={0}
                        linkValues={addressList}
                        onSelect={handleValueClick}
                        buttonRightMargin={110}
                    />
                </SimpleResultJsonWrapper>
            </If>
            <If condition={!resultJson && type !== 'address' && type !== 'txHash'}>
                <SimpleResultContentText>{resultString}</SimpleResultContentText>
                <SimpleResultTypeText>{type}</SimpleResultTypeText>
            </If>
        </SimpleResultContainer>
    )
}

const SimpleResultContainer = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 8px;
`

const SimpleResultNameText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['14.18_900'],
    }),
)``

const SimpleResultContentText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['14.18_400'],
    }),
)``

const SimpleResultContentLink = styled(Link)`
    color: ${getThemeColor(colors.blue[400])};
    ${typos.suit['14.18_900']};
`

const SimpleResultTypeText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.black[400],
        typo: typos.code['14.18_400'],
    }),
)``

const SimpleResultJsonWrapper = styled.div`
    width: 100%;
`

type ContractExecuteCardProps = Omit<CollapseCardProps, 'children' | 'title'> & {
    functionName: string
    mode: 'read' | 'write'
    index: number
    signature: string
    rawAbi: AbiItem[]
    executeAddress: string
}

const ContractExecute = ({
    functionName,
    mode,
    isOpen,
    signature,
    rawAbi,
    executeAddress,
}: ContractExecuteCardProps) => {
    const { isConnected, walletManager } = useWalletManager()

    const publicCaver = usePublicCaver()
    const rawAbiItem = rawAbi.find((abi) => {
        const targetSignature = getMethodSignature(abi)
        return targetSignature === signature
    })
    const inputAbis = rawAbiItem?.inputs || []
    const outputAbis = rawAbiItem?.outputs || []

    const [valueList, setValueList] = useState(Array.from({ length: inputAbis.length }).map(() => ''))
    const setValue = (index: number, value: string) => {
        setValueList((prevList) => [...prevList.slice(0, index), value, ...prevList.slice(index + 1, prevList.length)])
    }

    const [isExecuted, setIsExecuted] = useState(false)
    const [result, setResult] = useState<RPCResultType[]>([])
    const [errorMessage, setErrorMessage] = useState('')
    const [txResult, setTxResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const execute = useCallback(async () => {
        if (!rawAbiItem) {
            return
        }

        setIsExecuted(true)
        setResult([])
        setIsLoading(true)

        try {
            if (mode === 'write') {
                const wallet = walletManager.selectedWallet
                const txHash = await wallet.executeSmartContract(rawAbiItem as Web3AbiItem, valueList, executeAddress)
                await waitForSaveTransaction(txHash)
                setTxResult(txHash)
            } else {
                const result = await remoteCall({
                    caver: publicCaver,
                    abi: rawAbiItem,
                    to: executeAddress,
                    params: valueList,
                })
                setResult(result)
            }

            setErrorMessage('')

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err)
            setResult([])
            if (err?.message) {
                setErrorMessage(err.message)
            } else {
                setErrorMessage(`${err}`)
            }
        } finally {
            setIsLoading(false)
        }
    }, [valueList, mode, executeAddress, walletManager, publicCaver, rawAbiItem])

    const autoRun = inputAbis.length === 0 && mode === 'read'

    useEffect(() => {
        // autorun only on first open
        if (!isOpen || isExecuted) {
            return
        }

        if (autoRun) {
            execute()
        }
    }, [execute, autoRun, isOpen, isExecuted])

    const executeButtonText = useMemo(() => {
        if (isLoading) {
            return <ProgressInnerCircle size={50} />
        }
        if (mode === 'write') {
            return isExecuted ? 'Rewrite' : 'Write'
        }

        return isExecuted ? 'Requery' : 'Query'
    }, [mode, isExecuted, isLoading])

    const isShowOutput = mode === 'read' && outputAbis.length > 0
    const isShowExecuteButton = mode === 'read' || isConnected

    return (
        <>
            {inputAbis.map(({ name, type }, index) => (
                <ExecuteInput
                    key={index}
                    name={name}
                    type={type}
                    value={valueList[index]}
                    onChange={(newValue) => setValue(index, newValue)}
                />
            ))}
            {isShowOutput && (
                <ExecuteOutputArea title="Query Response">
                    {outputAbis.map((outputType, index) => (
                        <SimpleResult
                            key={index}
                            type={outputType}
                            result={result[index]}
                            functionName={functionName}
                        />
                    ))}
                </ExecuteOutputArea>
            )}
            {!!txResult && (
                <ExecuteOutputArea title="Write Response">
                    <SimpleResult functionName="txHash" type={{ name: 'txHash', type: 'txHash' }} result={txResult} />
                </ExecuteOutputArea>
            )}
            <ErrorMessage message={errorMessage} />
            {isShowExecuteButton && (
                <ExecuteButtonContainer>
                    <ExecuteButton onClick={execute} disabled={isLoading}>
                        {executeButtonText}
                    </ExecuteButton>
                </ExecuteButtonContainer>
            )}
        </>
    )
}

const ExecuteButtonContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})``

const ExecuteButton = styled(Button)`
    width: 128px;
    margin-top: 28px;
`

type ExecuteOutputAreaProps = {
    title: string
    children: ReactNode
}
const ExecuteOutputArea = ({ title, children }: ExecuteOutputAreaProps) => {
    return (
        <OutputContainer>
            <OutputLabelContainer>
                <OutputLabel>{title}</OutputLabel>
            </OutputLabelContainer>
            {children}
        </OutputContainer>
    )
}

const OutputContainer = styled(Flex)`
    border: 1px solid ${getThemeColor(colors.white)}${percentageToHex(10)};
    border-radius: 20px;
    padding: 20px;
    gap: 8px;
`

const OutputLabelContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    align-items: center;
    transform: translate(500px, -31px);
    position: absolute;
`

const OutputLabel = styled.div`
    ${typos.suit['12.16_400']};
    color: ${getThemeColor(colors.white)};
    background-color: ${getThemeColor(colors.black[800])};
    padding: 3px 10px;
    width: 155px;
    text-align: center;
    border-radius: 8px;
`

type ExecuteInputProps = {
    name: string
    type: string
    value: string
    onChange(value: string): void
}
const ExecuteInput = ({ name, type, value, onChange }: ExecuteInputProps) => {
    const label = name ? `<${name}> (${type})` : `(${type})`
    const isBool = type === 'bool'

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value: newValue } }) => {
        onChange(newValue)
    }

    const handleSelectTrue = useCallback(() => {
        onChange('1')
    }, [onChange])

    const handleSelectFalse = useCallback(() => {
        onChange('')
    }, [onChange])

    const handleClear = useCallback(() => {
        onChange('')
    }, [onChange])

    return (
        <ExecuteInputContainer>
            <ExecuteInputLabel>{label}</ExecuteInputLabel>
            {isBool ? (
                <ExecuteRadioContainer>
                    <Radio label="true" checked={!!value} onChange={handleSelectTrue} />
                    <Radio label="false" checked={!value} onChange={handleSelectFalse} />
                </ExecuteRadioContainer>
            ) : (
                <Input value={value} onChange={handleChange} placeholder={label} hasClearButton onClear={handleClear} />
            )}
        </ExecuteInputContainer>
    )
}

const ExecuteInputContainer = styled(Flex)`
    margin-bottom: 28px;
`

const ExecuteInputLabel = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['14.18_400'],
    }),
)`
    margin-bottom: 8px;
`

const ExecuteRadioContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    padding: 8px;
`

type ErrorMessageProps = {
    message: string
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) {
        return null
    }

    return (
        <ErrorMessageOuterContainer>
            <ErrorMessageContainer>{message}</ErrorMessageContainer>
        </ErrorMessageOuterContainer>
    )
}

const ErrorMessageOuterContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    margin-top: 28px;
`

const ErrorMessageContainer = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'center',
})`
    align-items: center;
    color: ${getThemeColor(colors.red[500])};
    background-color: ${getThemeColor(colors.white)}${percentageToHex(5)};
    border-radius: 12px;
    padding: 8px 14px;
    word-break: break-word;
`

export const ContractExecuteCard = (props: ContractExecuteCardProps) => {
    const { isOpen, signature, ...remainProps } = props

    const title = useMemo(() => signature.replace(/,/g, ', '), [signature])

    return (
        <CollapseCard title={title} isOpen={isOpen} {...remainProps}>
            <ContractExecute {...props} />
        </CollapseCard>
    )
}
