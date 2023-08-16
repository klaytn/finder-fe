import { useCallback, useMemo } from 'react'
import { OnSelectProps } from 'react-json-view'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { colors, RepeatNormalIcon, typos } from '@klaytn/slush'

import { AccountKey } from '../../api/api'
import { ROUTES } from '../../constants/routes'
import { getThemeColor } from '../../functions/colorMap'
import { usePublicKeyFormat } from '../../hooks/usePublicKeyFormat'
import { AccountKeyFormat } from '../../states/accountKey'
import { SIMPLE_KEY_LIST } from '../../vo/account'
import { CodeViewer } from './viewer/codeViewer'
import { JsonViewer } from './viewer/jsonViewer'

type AccountKeyInfoProps = {
    encodedKey?: string
    accountKey?: AccountKey
}

export const AccountKeyInfo = ({ encodedKey, accountKey }: AccountKeyInfoProps) => {
    if (!accountKey) {
        return null
    }

    const shouldShowKeyDetails = !SIMPLE_KEY_LIST.includes(accountKey.type)

    return (
        <ul>
            <TextItem title="Key Type" value={accountKey.type} />
            {shouldShowKeyDetails && <CodeItem title="Key Info" value={accountKey} />}
            {!!encodedKey && <CardItem title="Key (RLP)" value={encodedKey} />}
        </ul>
    )
}

type TextItemProps = {
    title: string
    value: string
}
const TextItem = ({ title, value }: TextItemProps) => {
    return (
        <ItemContainer>
            <ItemTitleRow>
                <ItemTitle>{title} :</ItemTitle>
                <ItemTextValue>{value}</ItemTextValue>
            </ItemTitleRow>
        </ItemContainer>
    )
}

type CodeItemProps = {
    title: string
    value: Record<string, unknown>
}

const CodeItem = ({ title, value }: CodeItemProps) => {
    const { address } = useParams()

    return (
        <>
            <ItemContainer marginTop={24} marginBottom={16}>
                <ItemTitle>{title}</ItemTitle>
            </ItemContainer>
            <AccountKeyJsonViewer data={value} address={address || ''} />
        </>
    )
}

type CardItemProps = {
    title: string
    value: string
}

const CardItem = ({ title, value }: CardItemProps) => {
    return (
        <>
            <ItemContainer marginTop={28} marginBottom={8}>
                <ItemTitleRow>
                    <ItemTitle>{title}</ItemTitle>
                </ItemTitleRow>
            </ItemContainer>

            <CodeViewer code={value} language="text" paddingLeft={28} wrapLongLines lineBreak />
        </>
    )
}

const ItemContainer = styled.li<{ marginTop?: number; marginBottom?: number }>`
    color: ${getThemeColor(colors.blue[200])};
    margin-top: ${({ marginTop = 0 }) => marginTop}px;
    margin-bottom: ${({ marginBottom = 0 }) => marginBottom}px;
`

const ItemTitleRow = styled.span`
    display: flex;
    flex-direction: row;
    gap: 4px;
`

const ItemTitle = styled.span`
    color: ${getThemeColor(colors.blue[200])};
    ${typos.suit['14.18_900']};
`

const ItemTextValue = styled.span`
    color: ${getThemeColor(colors.blue[200])};
    ${typos.suit['14.18_400']};
`

const AccountKeyFormatTitleMap = {
    [AccountKeyFormat.compressedPublicKey]: 'compressed',
    [AccountKeyFormat.address]: 'address',
    [AccountKeyFormat.publicKey]: 'non-compressed',
} as const

type AccountKeySet = {
    publicKey: string
    compressedPublicKey: string
    address: string
}

const ACCOUNT_KEY_PROPS = ['publicKey', 'compressedPublicKey', 'address']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isAccountKeySet(value: any): value is AccountKeySet {
    if (!value) {
        return false
    }

    if (typeof value !== 'object') {
        return false
    }

    return ACCOUNT_KEY_PROPS.every((propName) => typeof value[propName] === 'string')
}

const deepTransformJsonData = <T extends Record<string, unknown>>(
    data: T,
    format: AccountKeyFormat,
    isFirst = false,
) => {
    const entries: [string, unknown][] = Object.entries(data)
        .filter(([key]) => {
            if (!isFirst) {
                return true
            }

            return key !== 'type'
        })
        .map<[string, unknown]>(([key, value]) => {
            if (key === 'key' && isAccountKeySet(value)) {
                return [key, value[format]]
            }

            return [key, value]
        })
        .map<[string, unknown]>(([key, value]) => {
            if (typeof value !== 'object' || value === null) {
                return [key, value]
            }

            return [key, deepTransformJsonData(value as Record<string, unknown>, format)]
        })

    return Object.fromEntries(entries)
}

type AccountKeyJsonViewerProps<T extends Record<string, unknown>> = {
    data: T
    address: string
}
export const AccountKeyJsonViewer = <T extends Record<string, unknown>>({
    data,
    address,
}: AccountKeyJsonViewerProps<T>) => {
    const { accountKeyFormat, nextAccountKeyFormat, toggleAccountKeyFormat } = usePublicKeyFormat()

    const transformedData = useMemo(() => deepTransformJsonData(data, accountKeyFormat, true), [data, accountKeyFormat])

    const buttons = useMemo(() => {
        return [
            {
                key: 'keyFormat',
                name: `Public key format : ${AccountKeyFormatTitleMap[accountKeyFormat]}`,
                icon: RepeatNormalIcon,
                tooltip: `Click to view in ${AccountKeyFormatTitleMap[nextAccountKeyFormat]} format`,
                onClick: toggleAccountKeyFormat,
            },
        ]
    }, [accountKeyFormat, nextAccountKeyFormat, toggleAccountKeyFormat])

    const handleValueClick = useCallback(
        ({ name, value, type }: OnSelectProps) => {
            if (accountKeyFormat !== AccountKeyFormat.address) {
                return
            }

            if (name !== 'key' || type !== 'string' || address === value || typeof value !== 'string') {
                return
            }

            window.open(ROUTES.ACCOUNT.DETAIL.replace(':address', value), '_blank', 'noopener')
        },
        [address, accountKeyFormat],
    )

    const externalAddressList = useMemo(() => {
        if (accountKeyFormat !== AccountKeyFormat.address) {
            return []
        }

        const createExternalAddressSet = (targetObject: object, set = new Set<string>()) => {
            Object.entries(targetObject).forEach(([key, value]) => {
                if (key === 'key' && typeof value === 'string' && value.startsWith('0x')) {
                    set.add(value)
                } else if (typeof value === 'object') {
                    createExternalAddressSet(value, set)
                }
            })

            return set
        }

        const externalAddressSet = createExternalAddressSet(transformedData)
        externalAddressSet.delete(address)

        return [...externalAddressSet]
    }, [transformedData, address, accountKeyFormat])

    return (
        <JsonViewer
            data={transformedData}
            onSelect={handleValueClick}
            buttons={buttons}
            minHeight={100}
            linkValues={externalAddressList}
        />
    )
}
