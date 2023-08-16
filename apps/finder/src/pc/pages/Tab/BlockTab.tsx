import format from 'date-fns/esm/format'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import {
    Box,
    Button,
    colors,
    ContextMenuItem,
    Dialog,
    DialogButtons,
    DIALOG_WIDTH,
    DownloadIcon,
    Flex,
    FormText,
    If,
    ProgressCircle,
    Select,
    Text,
    Toast,
    typos,
    useToggle,
} from '@klaytn/slush'

import { getAccountProposedBlocks } from '../../../api/account'
import { defaultPage, Paging } from '../../../api/api'
import { Block, downloadProposedBlocks } from '../../../api/block'
import Empty from '../../../components/commons/empty'
import { Table, TableHeader, TableHeaders, TableRow, TableTop } from '../../../components/commons/table/basic'
import {
    TableBlockIdCell,
    TableKlayCell,
    TableNumberCell,
    TableTimesAgoCell,
} from '../../../components/commons/table/variants'
import Page from '../../../components/Page'
import { useConfig, useFeatures, useResources, useServerConfig } from '../../../context/configProvider'
import { getThemeColorOnAttrs } from '../../../functions/colorMap'
import useQuery from '../../../hooks/useQuery'

const START_YEAR = 2019
const START_MONTH = 6
const START_YEAR_MONTH = `${START_YEAR}-${START_MONTH.toString().padStart(2, '0')}`
const NOW = new Date()
const END_YEAR_MONTH = format(NOW, 'yyyy-MM')

function getYearRange(): ContextMenuItem[] {
    const now = new Date()
    now.setMonth(now.getMonth() - 1)
    const endYear = now.getFullYear()

    const result: ContextMenuItem[] = []
    for (let year = START_YEAR; year <= endYear; year++) {
        const yearStr = `${year}`
        result.push({
            label: yearStr,
            value: yearStr,
        })
    }

    return result
}

function getMonthRange(): ContextMenuItem[] {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    return months.map((month, index) => ({
        label: month,
        value: `${index + 1}`.padStart(2, '0'),
    }))
}

const yearRange = getYearRange()
const monthRange = getMonthRange()

const getDefaultYear = () => {
    return yearRange[yearRange.length - 1]
}

const getDefaultMonth = () => {
    const now = new Date()
    const monthNumber = now.getMonth()
    const month = `${monthNumber === 0 ? 12 : monthNumber}`.padStart(2, '0')

    return monthRange.find(({ value }) => value === month)
}

const isAfterOrSameYearMonth = (yearMonth1: string, yearMonth2: string) => {
    const date1 = new Date(`${yearMonth1}-01`)
    const date2 = new Date(`${yearMonth2}-01`)

    return date1 <= date2
}
const SELECT_DIST = 24
const SELECT_WITH = DIALOG_WIDTH / 2 - SELECT_DIST / 2

export interface IBlockTabProps {
    tabId: string
    address: string
}

const BlockTab = ({ tabId, address }: IBlockTabProps) => {
    const { network } = useConfig()
    const { keyCurrency } = useResources()
    const { downloadProposedBlockList, baseFee, blockRewards = false } = useFeatures()
    const query = useQuery()
    const [blocks, setBlocks] = useState<Block[]>([])
    const [paging, setPaging] = useState<Paging>(defaultPage)
    const [isLoaded, setIsLoaded] = useState(false)
    const {
        paging: { limit },
    } = useServerConfig()

    const page = query.get('page') || '1'

    const hideColumnIndexList = useMemo(() => {
        const result: number[] = []
        if (!baseFee) {
            result.push(3, 4)
        }
        if (!blockRewards) {
            result.push(5)
        }
        return result
    }, [baseFee, blockRewards])

    const fetchProposedBlocks = async (address: string, page: string) => {
        getAccountProposedBlocks(address, page).then((rsp) => {
            setBlocks(rsp.data.results)
            setPaging(rsp.data.paging)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        fetchProposedBlocks(address, page)
    }, [address, page])

    const dialogState = useToggle()
    const toastState = useToggle()
    const progressState = useToggle()

    const [year, setYear] = useState<ContextMenuItem | undefined>(getDefaultYear())
    const [month, setMonth] = useState<ContextMenuItem | undefined>(getDefaultMonth())

    const handleDialogCloseAnimationEnd = () => {
        setYear(getDefaultYear())
        setMonth(getDefaultMonth())
    }

    const handleDownload = async () => {
        if (!year?.value || !month?.value) {
            return
        }

        const yearData = year.value
        const monthData = month.value

        dialogState.off()
        toastState.on()
        progressState.on()

        await downloadProposedBlocks(address, yearData, monthData)

        progressState.off()
    }

    const selectedYearMonth = `${year?.value}-${month?.value}`
    const isAfter = isAfterOrSameYearMonth(START_YEAR_MONTH, selectedYearMonth)
    const isBefore = isAfterOrSameYearMonth(selectedYearMonth, END_YEAR_MONTH)
    const isValidYearMonth = isAfter && isBefore

    const errorMessage = (() => {
        if (!isAfter) {
            return 'You can select the month after June, 2019.'
        }

        if (!isBefore) {
            return `You can select the month before this month.`
        }

        return <br />
    })()

    if (isLoaded && paging.totalCount === 0) {
        return <Empty />
    }

    const gasUnit = keyCurrency.gasUnit ? ` (${keyCurrency.gasUnit})` : ''

    return (
        <>
            <div>
                <Table
                    columnSizeList={[132, 140, 140, 200, 200, 200, 120]}
                    paddingTop={0}
                    totalCount={paging.totalCount}
                    limitCount={limit.block}
                    hideColumnIndexList={hideColumnIndexList}
                    decorator={
                        <If condition={network !== 'baobab' && !!downloadProposedBlockList}>
                            <TableTop>
                                <Button buttonType="forth" size={36} rightIcon={DownloadIcon} onClick={dialogState.on}>
                                    Download list
                                </Button>
                            </TableTop>
                        </If>
                    }
                >
                    <TableHeaders>
                        <TableHeader>Block#</TableHeader>
                        <TableHeader>Time ago</TableHeader>
                        <TableHeader>Total TXS</TableHeader>
                        <TableHeader>Base Fee{gasUnit}</TableHeader>
                        <TableHeader>Burnt Fee{gasUnit}</TableHeader>
                        <TableHeader align="right">Rewards{gasUnit}</TableHeader>
                        <TableHeader align="right">Size (Bytes)</TableHeader>
                    </TableHeaders>

                    {blocks.map((block, index) => {
                        return (
                            <TableRow key={index}>
                                <TableBlockIdCell value={block.blockId} />
                                <TableTimesAgoCell value={block.datetime} />
                                <TableNumberCell
                                    align="left"
                                    color={colors.white}
                                    value={block.totalTransactionCount}
                                />
                                <TableKlayCell value={block.baseFeePerGas} />
                                <TableKlayCell value={block.burntFees || 0} />
                                <TableKlayCell align="right" value={block.rewardKlay} />
                                <TableNumberCell align="right" color={colors.white} value={block.blockSize} />
                            </TableRow>
                        )
                    })}
                </Table>
                <Page current={paging.currentPage} total={paging.totalPage} query={{ tabId: tabId }} />
            </div>

            <Dialog
                show={dialogState.isShow}
                onClose={dialogState.off}
                onAnimationEnd={handleDialogCloseAnimationEnd}
                title="Download Proposed Blocks List"
                shadow="blue.600.15%"
                align="center"
            >
                <Flex direction="column">
                    <ModalDescText>
                        The timestamps are based on KST(UTC+9) and the distribution ratio
                        <br />
                        of the block rewards depends on the block number.
                    </ModalDescText>
                    <Flex direction="row" style={{ marginTop: 32 }}>
                        <Box style={{ width: SELECT_WITH }}>
                            <Select items={yearRange} onChange={setYear} value={year} valid={isValidYearMonth} />
                        </Box>
                        <Box style={{ width: SELECT_DIST }} />
                        <Box style={{ width: SELECT_WITH }}>
                            <Select items={monthRange} onChange={setMonth} value={month} valid={isValidYearMonth} />
                        </Box>
                    </Flex>
                    <FormText
                        errorMessage={errorMessage}
                        valid={isValidYearMonth}
                        style={{
                            marginTop: 8,
                        }}
                        width="100%"
                    />
                </Flex>

                <DialogButtons>
                    <Button size={44} style={{ width: 240 }} onClick={handleDownload} disabled={!isValidYearMonth}>
                        Download as .csv file
                    </Button>
                </DialogButtons>
            </Dialog>
            <ProgressCircle show={progressState.isShow} size={64} overlay />
            <Toast
                duration={5000}
                message={
                    'Preparing to download... Please wait and stay this page.\nWhen the download is ready, it will start automatically.'
                }
                show={toastState.isShow}
                onClose={toastState.off}
            />
        </>
    )
}

const ModalDescText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['12.16_400'],
    }),
)`
    text-align: center;
`

export default BlockTab
