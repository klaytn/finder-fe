import { addYears, differenceInCalendarDays, isAfter, isBefore } from 'date-fns/esm'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import {
    Button,
    ChevrondoubleRightIcon,
    colors,
    ConfirmNormalIcon,
    ContextMenuItem,
    Divider,
    Flex,
    RefreshIcon,
    Text,
    typos,
    useToggle,
    withAlpha,
} from '@klaytn/slush'

import { ROUTES } from '../../../constants/routes'
import { ZIndexMap } from '../../../constants/zIndex'
import { getThemeColor, getThemeColorOnAttrs } from '../../../functions/colorMap'
import { createFromQuery, QueryType, useTxSearch } from '../../../hooks/useFetchTransactions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'
import useFormValue from '../../../hooks/useFormValue'
import useQuery from '../../../hooks/useQuery'
import { transactionTypeMultipleQuery } from '../../../states/transaction'
import AccountFilterItem from './accountFilterItem'
import DurationFilterItem from './durationFilterItem'
import FilterIcon from './filterIcon'
import StatusFilterItem from './statusFilterItem'
import TxTypeFilterItem from './txTypeFilterItem'

type TxFilterPanelProps = {
    defaultFrom: Date
    defaultTo: Date
}

const TxFilterPanel = ({ defaultFrom, defaultTo }: TxFilterPanelProps) => {
    const { isShow, toggle, off } = useToggle()
    const whiteColor = useFinderThemeColor(withAlpha(colors.white, 35))
    const resetColor = useFinderThemeColor(colors.blue[400])

    const [durationFrom, setDurationFrom] = useState<Date | undefined>(undefined)
    const [durationTo, setDurationTo] = useState<Date | undefined>(undefined)
    const setToCurrentTimeState = useToggle()

    const [txTypes, setTxTypes] = useState<ContextMenuItem[]>([])
    const [status, handleStatusChange, , , setStatus] = useFormValue({ initialValue: 'all' })

    const [from, handleFromChange, handleFromClear, , setFrom] = useFormValue()
    const [to, handleToChange, handleToClear, , setTo] = useFormValue()
    const [feePayer, handleFeePayerChange, handleFeePayerClear, , setFeePayer] = useFormValue()

    const query = useQuery()
    const transactionTypeMultiple = useRecoilValue(transactionTypeMultipleQuery)

    const checkToCurrentTime = setToCurrentTimeState.on
    const uncheckToCurrentTime = setToCurrentTimeState.off

    useEffect(() => {
        const fromQuery = createFromQuery(query)
        setDurationFrom(fromQuery('fromAt', QueryType.Date))
        setDurationTo(fromQuery('toAt', QueryType.Date))
        setTxTypes(
            fromQuery('types', QueryType.StringArray)
                .map((type) => transactionTypeMultiple.find(({ value }) => value === type))
                .filter((item) => !!item) as ContextMenuItem[],
        )
        const status = fromQuery('status', QueryType.Boolean)
        if (typeof status === 'boolean') {
            setStatus(status ? 'success' : 'fail')
        } else {
            setStatus('all')
        }
        setFrom(fromQuery('from') || '')
        setTo(fromQuery('to') || '')
        setFeePayer(fromQuery('feePayer') || '')
        if (fromQuery('currentTime')) {
            checkToCurrentTime()
        } else {
            uncheckToCurrentTime()
        }
    }, [
        query,
        transactionTypeMultiple,
        setStatus,
        setFrom,
        setTo,
        setFeePayer,
        checkToCurrentTime,
        uncheckToCurrentTime,
    ])

    const isAppliedFilter = useMemo(() => {
        const fromQuery = createFromQuery(query)

        if (fromQuery('fromAt', QueryType.Date) || fromQuery('toAt', QueryType.Date)) {
            return true
        }
        if (fromQuery('types', QueryType.StringArray).length > 0) {
            return true
        }
        if (typeof fromQuery('status', QueryType.Boolean) === 'boolean') {
            return true
        }
        if (fromQuery('from')) {
            return true
        }
        if (fromQuery('to')) {
            return true
        }
        if (fromQuery('feePayer')) {
            return true
        }
        if (fromQuery('currentTime')) {
            return true
        }

        return false
    }, [query])

    const isValidDuration = useMemo(() => {
        const from = durationFrom || defaultFrom
        const to = durationTo || defaultTo

        // 'from' is before 'to'
        if (!isBefore(from, to)) {
            return false
        }

        // Maximum of 31 days
        if (Math.abs(differenceInCalendarDays(from, to)) > 31) {
            return false
        }

        // Maximum of data from 1 year ago
        return isAfter(from, addYears(new Date(), -1))
    }, [durationFrom, durationTo, defaultFrom, defaultTo])

    const isValidParams = useMemo(() => {
        if (!isValidDuration) {
            return false
        }

        return from.trim() || to.trim() || feePayer.trim()
    }, [isValidDuration, from, to, feePayer])

    const navigate = useNavigate()

    const resetTxTypes = useCallback(() => {
        setTxTypes([])
    }, [])

    const resetAll = useCallback(() => {
        navigate(ROUTES.TX.LIST)
    }, [navigate])

    const search = useTxSearch()
    const handleSearch = () => {
        search({
            fromAt: durationFrom,
            toAt: durationTo,
            types: txTypes.map(({ value }) => value || ''),
            status: status === 'all' ? undefined : status === 'success',
            from,
            to,
            feePayer,
            defaultFrom,
            defaultTo,
            currentTime: setToCurrentTimeState.isShow,
        })
    }

    return (
        <Container open={isShow}>
            <Handle onClick={toggle}>
                <FilterIcon isApplied={isAppliedFilter} />
            </Handle>
            <InnerContainer>
                <HeaderContainer>
                    <HeaderRow>
                        <FilterText>Filter</FilterText>
                        <FoldButton tabIndex={-1} onClick={off}>
                            <ChevrondoubleRightIcon size={28} color={whiteColor} />
                        </FoldButton>
                    </HeaderRow>
                    <HeaderDescRow>
                        <DescriptionText>
                            With no filter applied, the TX list shows up to 40,000 TXs.
                            <br />
                            When a filter is applied, it shows up to 10,000 TXs.
                        </DescriptionText>
                    </HeaderDescRow>
                </HeaderContainer>

                <FiltersContainer>
                    <DurationFilterItem
                        isValid={isValidDuration}
                        from={durationFrom}
                        to={durationTo}
                        onFromChange={setDurationFrom}
                        onToChange={setDurationTo}
                        defaultFrom={defaultFrom}
                        defaultTo={defaultTo}
                        setToCurrentTime={setToCurrentTimeState.isShow}
                        onToggleCurrentTime={setToCurrentTimeState.toggle}
                    />

                    <AccountFilterItem
                        from={from}
                        to={to}
                        feePayer={feePayer}
                        onFromChange={handleFromChange}
                        onToChange={handleToChange}
                        onFeePayerChange={handleFeePayerChange}
                        onFromClear={handleFromClear}
                        onToClear={handleToClear}
                        onFeePayerClear={handleFeePayerClear}
                    />

                    <TxTypeFilterItem values={txTypes} onChange={setTxTypes} onReset={resetTxTypes} />

                    <StatusFilterItem status={status} onChange={handleStatusChange} />
                </FiltersContainer>

                <Divider reversePadding={40} style={{ marginTop: -24 }} />

                <ButtonsContainer>
                    <ResetButton onClick={resetAll}>
                        <RefreshIcon size={16} color={resetColor} /> Reset All
                    </ResetButton>
                    <Button leftIcon={ConfirmNormalIcon} disabled={!isValidParams} onClick={handleSearch}>
                        Apply Filters
                    </Button>
                </ButtonsContainer>
            </InnerContainer>
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
})<{ open: boolean }>`
    max-height: 1001px;
    position: fixed;
    top: 140px;
    bottom: 140px;
    transition: right 300ms ease;
    right: ${({ open }) => (open ? -1 : -400)}px;
    z-index: ${ZIndexMap.txPanel};
`

const InnerContainer = styled(Flex).attrs({
    direction: 'column',
})`
    background: ${getThemeColor(colors.black[850])};
    border: 1px solid ${getThemeColor(colors.blue[600])};
    width: 344px;
    z-index: ${ZIndexMap.txPanel};
    border-bottom-left-radius: 32px;
    padding: 32px 40px 28px 40px;
    gap: 24px;
`

const Handle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${getThemeColor(colors.blue[600])};
    border-top: 1px solid ${getThemeColor(colors.blue[600])};
    border-bottom: 1px solid ${getThemeColor(colors.blue[600])};
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    cursor: pointer;

    background: ${getThemeColor(colors.black[850])};
    height: 96px;
    width: 60px;
    transform: translateX(1px);
    z-index: ${ZIndexMap.txPanelHandle};
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 4px;
`

const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const FilterText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: colors.white,
        typo: typos.suit['24.32_900'],
    }),
)``

const FoldButton = styled.button`
    background: none;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
`

const HeaderDescRow = styled.div`
    display: flex;
`

const DescriptionText = styled(Text).attrs(
    getThemeColorOnAttrs({
        color: withAlpha(colors.white, 50),
        typo: typos.suit['12.16_400'],
    }),
)``

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    overflow-y: auth;
    overflow-x: hidden;
    flex-grow: 1;
    padding: 0px 2px 24px 2px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ResetButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    color: ${getThemeColor(colors.blue[400])};
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    ${typos.suit['14.18_400']};
`

export default TxFilterPanel
