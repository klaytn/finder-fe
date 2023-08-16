import { graphic } from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { useMemo } from 'react'

import { colors, hexToRgb } from '@klaytn/slush'

import { History } from '../../api/home'
import { useFinderThemeColorSet } from '../../hooks/useFinderThemeColor'

const MONTH_LIST = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type HistoriesChartProps = {
    data: History<'data', number>[]
    height: number
    fontSize: number
}
const HistoriesChart = ({ data, height, fontSize }: HistoriesChartProps) => {
    const colorSet = useFinderThemeColorSet({
        white: colors.white,
        line: colors.blue[400],
        shape: colors.blue[300],
    })

    const { categories, series } = useMemo(() => {
        const categories = data.map(({ date: rawDate }) => {
            const date = new Date(Date.parse(rawDate))
            return MONTH_LIST[date.getMonth()] + ' ' + date.getDate()
        })
        const series = data.map(({ data }) => data)

        return {
            categories,
            series,
        }
    }, [data])

    return (
        <ReactEcharts
            style={{ height: `${height}px` }}
            opts={{ renderer: 'svg' }}
            option={{
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none',
                    },
                },
                grid: {
                    left: 0,
                    right: 0,
                    top: '10px',
                    bottom: '18px',
                },
                xAxis: {
                    type: 'category',
                    data: categories,
                    axisLine: {
                        lineStyle: {
                            width: 0,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        fontWeight: 500,
                        fontSize,
                        color: colorSet.white,
                        interval(index: number) {
                            return index === 0 || index === categories.length - 1
                        },
                        formatter(value: unknown, index: number) {
                            if (index === 0) {
                                return `        ${value}`
                            }

                            return `${value}        `
                        },
                        align: 'center',
                    },
                },
                yAxis: {
                    type: 'value',
                    show: false,
                },
                series: [
                    {
                        data: series,
                        type: 'line',
                        symbolSize: 0,
                        lineStyle: {
                            color: colorSet.line,
                            width: 2,
                        },
                        areaStyle: {
                            color: new graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: hexToRgb(colorSet.shape, 0.2),
                                },
                                {
                                    offset: 1,
                                    color: hexToRgb(colorSet.shape, 0),
                                },
                            ]),
                        },
                    },
                ],
            }}
        />
    )
}

export default HistoriesChart
