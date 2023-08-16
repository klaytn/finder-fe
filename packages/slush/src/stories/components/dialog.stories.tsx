import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import { Box, Flex } from '../../components/box'
import { Button } from '../../components/button'
import { ContextMenuItem } from '../../components/contextMenu'
import { Dialog as DialogComponent, DialogButtons } from '../../components/dialog'
import { Select } from '../../components/select'
import { Text } from '../../components/text'
import { typos } from '../../styles/typos'
import { noop } from '../../utils/common'

const metaData: ComponentMeta<typeof DialogComponent> = {
    title: 'Components/Dialog',
    component: DialogComponent,
    argTypes: {
        show: {
            defaultValue: true,
            type: 'boolean',
        },
        title: {
            defaultValue: 'Welcome to This New Feature',
            type: 'string',
        },
        shadow: {
            defaultValue: 'blue.600.15%',
        },
        onClose: {
            action: 'close',
        },
        size: {
            defaultValue: 'sm',
            options: ['sm', 'lg'],
            control: {
                type: 'select',
            },
        },
        align: {
            defaultValue: 'center',
            options: ['center', 'left'],
            control: {
                type: 'select',
            },
        },
    },
}
export default metaData

const yearRange: ContextMenuItem[] = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
]

const monthRange: ContextMenuItem[] = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
]

export const Dialog = ({ title, show, shadow, size, align }: Parameters<typeof DialogComponent>[0]) => {
    const [year, setYear] = useState<ContextMenuItem | undefined>(yearRange.find(({ value }) => value === '2022'))
    const [month, setMonth] = useState<ContextMenuItem | undefined>(monthRange.find(({ value }) => value === '03'))

    return (
        <DialogComponent show={show} title={title} shadow={shadow} onClose={noop} size={size} align={align}>
            <Flex>
                <Text color="inherit" typo={typos.suit['14.18_400']}>
                    The corner dialog component is used for new feature announcements and feedback requests from the
                    user.
                </Text>
                <br />
                <Text color="inherit" typo={typos.suit['12.16_400']}>
                    · Until block #864000, CN received 100% of the block rewards.
                    <br />· From block #864001, CN received 34% of the block rewards.
                </Text>
                <Flex direction="row" style={{ marginTop: 28 }}>
                    <Box style={{ width: 512 / 2 - 24 }}>
                        <Select items={yearRange} onChange={setYear} value={year} />
                    </Box>
                    <Box style={{ width: 24 }} />
                    <Box style={{ width: 512 / 2 - 24 }}>
                        <Select items={monthRange} onChange={setMonth} value={month} />
                    </Box>
                </Flex>
            </Flex>
            <DialogButtons>
                <Button key="download" size={44} style={{ width: 240 }}>
                    Download as .csv file
                </Button>
            </DialogButtons>
        </DialogComponent>
    )
}
