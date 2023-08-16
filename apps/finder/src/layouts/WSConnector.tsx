import { Client } from '@stomp/stompjs'
import React, { useCallback, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'

import { useConfig, useResources } from '../context/configProvider'
import { finderKlayPriceState, IFinderKlayPrice } from '../states/price'
import { finderStatusState, IFinderStatus } from '../states/status'
import { finderSummaryState, IFinderSummary } from '../states/summary'
import { timerState } from '../states/timer'

const WSConnector = ({ children }: { children: React.ReactNode }) => {
    const { keyCurrency } = useResources()
    const client = useRef<Client>()
    const [, setTimer] = useRecoilState<number>(timerState)

    const [, setFinderStatus] = useRecoilState<IFinderStatus>(finderStatusState)
    const [, setFinderSummary] = useRecoilState<IFinderSummary>(finderSummaryState)
    const [, setFinderKlayPrice] = useRecoilState<IFinderKlayPrice>(finderKlayPriceState)

    const { wsPath, beHost, useSecureProtocol } = useConfig()

    const protocol = useSecureProtocol ? 'wss' : 'ws'
    const wsUrl = `${protocol}://${beHost}${wsPath}`

    const connect = useCallback(() => {
        client.current = new Client({
            brokerURL: wsUrl,
            reconnectDelay: 5000,
            heartbeatIncoming: 3000,
            heartbeatOutgoing: 3000,
        })

        client.current.onConnect = () => {
            client.current?.subscribe('/app/status', function (msg) {
                const statusData = JSON.parse(msg.body)
                setFinderStatus({
                    block_burnt: statusData.block_burnt || {
                        accumulate_burnt_fees: '0',
                        accumulate_burnt_klay: '0',
                        accumulate_burnt: '0',
                        nearest_block_number: 0,
                    },
                    ...statusData,
                })
            })

            client.current?.subscribe('/app/summary', function (msg) {
                setFinderSummary(JSON.parse(msg.body))
            })

            client.current?.subscribe(`/app/${keyCurrency.unit.toLowerCase()}-price`, function (msg) {
                const priceData = JSON.parse(msg.body)
                setFinderKlayPrice({
                    ...priceData,
                    btc_price: priceData.btc_price || '',
                    market_cap: priceData.market_cap,
                    total_supply: priceData.total_supply,
                })
            })
        }

        client.current.activate()
    }, [setFinderStatus, setFinderSummary, setFinderKlayPrice, wsUrl, keyCurrency])

    const disconnect = useCallback(() => {
        client.current?.deactivate()
    }, [])

    useEffect(() => {
        connect()

        const timer = setInterval(() => {
            setTimer(Date.now())
        }, 1000)

        return () => {
            disconnect()
            clearInterval(timer)
        }
    }, [setTimer, connect, disconnect])

    return <>{children}</>
}

export default WSConnector
