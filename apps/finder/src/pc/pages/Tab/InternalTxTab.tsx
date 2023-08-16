import { CSSProperties, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Button, ChevronBottomIcon, ChevronTopIcon, colors, useToggles } from '@klaytn/slush'

import { defaultPage, Paging } from '../../../api/api'
import { getInternalTxs } from '../../../api/transaction'
import Card from '../../../components/Card'
import Empty from '../../../components/commons/empty'
import InfoTooltip from '../../../components/commons/infoTooltip'
import {
    Table,
    TableCell,
    TableHeader,
    TableHeaders,
    TableRow,
    TableTop,
} from '../../../components/commons/table/basic'
import {
    TableFromToCell,
    TableFromToHeader,
    TableKlayCell,
    TableNumberCell,
} from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import NoTXFeeTooltip from '../../../components/pc/noTXFeeTooltip'
import { METHOD_TOOLTIP } from '../../../constants/message'
import { useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useQuery from '../../../hooks/useQuery'
import { InternalTransactionVO } from '../../../vo/internalTransaction'

export interface IInternalTxTabProps {
    tabId: string
    txHash?: string
}

const InternalTxTab = ({ tabId, txHash }: IInternalTxTabProps) => {
    const { keyCurrency } = useResources()
    const { showGasPrice = false } = useFeatures()
    const query = useQuery()
    const [isLoaded, setIsLoaded] = useState(false)
    const {
        paging: { limit },
    } = useServerConfig()

    const [internalTxs, setInternalTxs] = useState<InternalTransactionVO[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const toggles = useToggles(internalTxs.length, false)

    const page = query.get('page') || '1'

    const { reset } = toggles

    useEffect(() => {
        const fetchInternalTxs = async (txHash: string, page: string) => {
            getInternalTxs(txHash, page).then((rsp) => {
                setInternalTxs(rsp.data.results.map((item) => new InternalTransactionVO(item)))
                setPaging(rsp.data.paging)
                setIsLoaded(true)
            })
        }

        if (txHash !== undefined) {
            fetchInternalTxs(txHash, page)
        }
    }, [txHash, page])

    useEffect(() => {
        reset()
    }, [txHash, page, reset])

    const methodColor = useFinderThemeColor(colors.white)

    if (!isLoaded) {
        return null
    }

    if (paging.totalCount === 0) {
        return <Empty />
    }

    return (
        <div>
            <Table
                columnSizeList={[188, 360, 260, 204, 178]}
                paddingTop={0}
                totalCount={paging.totalCount}
                limitCount={limit.internalTransaction}
                decorator={
                    <TableTop>
                        <ShowAllButton
                            buttonType="forth"
                            size={36}
                            rightIcon={toggles.isAllOn ? ChevronTopIcon : ChevronBottomIcon}
                            onClick={toggles.toggleAll}
                        >
                            Show all details
                        </ShowAllButton>
                    </TableTop>
                }
            >
                <TableHeaders>
                    <TableHeader>Type of trace address</TableHeader>
                    <TableFromToHeader />
                    <TableHeader>
                        Method
                        <InfoTooltip
                            marginLeft={4}
                            marginTop={1}
                            size={16}
                            color={methodColor}
                            message={METHOD_TOOLTIP}
                        />
                    </TableHeader>
                    <TableHeader>
                        {showGasPrice ? (
                            <>Amount ({keyCurrency.unit})</>
                        ) : (
                            <>
                                TX Fee <NoTXFeeTooltip />
                            </>
                        )}
                    </TableHeader>
                    <TableHeader>Gas limit {showGasPrice && <>({keyCurrency.unit})</>}</TableHeader>
                </TableHeaders>

                {internalTxs.map(
                    (
                        {
                            methodName,
                            hasError,
                            errorMessage,
                            inputData,
                            output,
                            level,
                            type,
                            from,
                            to,
                            amount,
                            gasLimit,
                        },
                        index,
                    ) => {
                        return (
                            <TableRow
                                key={index}
                                isOpen={toggles.isShowList[index]}
                                onToggle={() => toggles.toggle(index)}
                                failed={hasError}
                                failMessage={<ErrorMessageContents errorMessage={errorMessage} />}
                                expandedContents={
                                    <>
                                        <InternalTxDetail title="Input" margin="0">
                                            {inputData.decodedValue === undefined && inputData.originalValue}
                                            {inputData.decodedValue !== undefined && (
                                                <>
                                                    <span>Function {inputData.decodedValue.signature}</span>
                                                    <br />
                                                    <br />
                                                    <span>Method ID : {inputData.decodedValue.methodId}</span>
                                                    <br />
                                                    {inputData.decodedValue.parameters.map((param, index) => {
                                                        return (
                                                            <div key={index} style={{ marginLeft: 5 }}>
                                                                [{index}] {param.type} : {param.value}
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </InternalTxDetail>
                                        <InternalTxDetail title="Output" margin="20px 0 16px 0">
                                            {output}
                                        </InternalTxDetail>
                                    </>
                                }
                            >
                                <TableCell color={methodColor} tooltip padding={hasError ? 18 : 0}>
                                    <TypeCell
                                        style={{
                                            paddingLeft: level * 14,
                                        }}
                                    >
                                        {level !== 0 && <>ㄴ</>} {type}
                                    </TypeCell>
                                </TableCell>
                                <TableFromToCell from={from} to={to} />
                                <TableCell color={methodColor} tooltip>
                                    {methodName}
                                </TableCell>
                                <TableKlayCell value={amount} />
                                <TableNumberCell value={gasLimit} align="left" padding={48} />
                            </TableRow>
                        )
                    },
                )}
            </Table>
            <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId: tabId }} />
        </div>
    )
}

const TypeCell = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

interface IInternalTxDetailProps {
    title: string
    children: ReactNode
    margin: CSSProperties['margin']
}

const InternalTxDetail = ({ title, children, margin }: IInternalTxDetailProps) => {
    return (
        <Card condition={!!children} margin={margin}>
            <Card.Title>{title}</Card.Title>
            <Card.Content height={106}>{children}</Card.Content>
        </Card>
    )
}

const ShowAllButton = styled(Button)`
    width: 159px;
`

type ErrorMessageContentsProps = {
    errorMessage: string
}
const ErrorMessageContents = ({ errorMessage }: ErrorMessageContentsProps) => {
    return (
        <>
            {errorMessage.split('\n').map((line, index) => (
                <>
                    {index > 0 && <br />}
                    {line}
                </>
            ))}
        </>
    )
}

export default InternalTxTab
