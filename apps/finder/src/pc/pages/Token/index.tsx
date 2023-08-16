import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'

import { defaultTokenResponse, getToken, TokenResponse } from '../../../api/token'
import { ItemTitle } from '../../../components/Title'
import useAsyncError from '../../../hooks/useAsyncError'
import TokenSummary from './TokenSummary'
import TokenTabContainer from './TokenTabContainer'

const Token = () => {
    const params = useParams()
    const throwError = useAsyncError()
    const contractAddress = params.address as string

    const [token, setToken] = useState<TokenResponse>(defaultTokenResponse)

    const fetchToken = useCallback(async () => {
        try {
            const { data } = await getToken(contractAddress)
            setToken(data)
        } catch (e) {
            throwError(e)
        }
    }, [contractAddress, throwError])

    useEffect(() => {
        fetchToken()
    }, [fetchToken])

    return (
        <>
            <div>
                <ItemTitle
                    icon={token.info.icon}
                    alt="token image"
                    title={token.info.symbol}
                    types={[token.type]}
                    showTokenIdOnly
                />
            </div>
            <TokenSummary token={token} />
            {token.info.contractAddress && <TokenTabContainer contractAddress={token.info.contractAddress} />}
        </>
    )
}

export default Token
