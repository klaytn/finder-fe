import { ComponentMeta } from '@storybook/react'
import { useCallback, useState } from 'react'

import { Flex } from '../../components/box'
import { ContextMenuItem } from '../../components/contextMenu'
import { Select as SelectComponent } from '../../components/select'

const metaData: ComponentMeta<typeof SelectComponent> = {
    title: 'Components/Select',
    component: SelectComponent,
    argTypes: {
        placeholder: {
            defaultValue: 'Please select',
            type: 'string',
        },
    },
}
export default metaData

const items: ContextMenuItem[] = [
    {
        label: 'Title',
        isTitle: true,
    },
    {
        label: 'Depth 1',
        value: 'Depth 1',
    },
    {
        label: 'Depth 2',
        subItems: [
            {
                label: 'AAA',
                value: 'AAA',
            },
        ],
    },
    {
        label: 'Title 2',
        isTitle: true,
    },
    {
        label: 'Depth 3',
        subItems: [
            {
                label: 'BBB',
                value: 'BBB',
            },
            {
                label: 'Sub Item',
                subItems: [
                    {
                        label: 'CCC',
                        value: 'CCC',
                    },
                    {
                        label: 'DDD',
                        value: 'DDD',
                    },
                ],
            },
        ],
    },
]

export const Select = ({ placeholder, valid }: Parameters<typeof SelectComponent>[0]) => {
    const [selectedItem, setSelectedItem] = useState<ContextMenuItem>()

    return (
        <Flex direction="column" width="300" style={{ marginLeft: 20 }}>
            <SelectComponent
                placeholder={placeholder}
                items={items}
                value={selectedItem}
                onChange={setSelectedItem}
                style={{ marginTop: 20 }}
                valid={valid}
            />
        </Flex>
    )
}

const items2: ContextMenuItem[] = [
    {
        label: 'Title',
        isTitle: true,
    },
    {
        label: 'item 1',
        value: 'item 1',
        sortOrder: 1,
        indent: 1,
    },
    {
        label: 'item 2',
        value: 'item 2',
        sortOrder: 2,
        indent: 1,
    },
    {
        label: 'Title 2',
        isTitle: true,
    },
    ...Array.from({ length: 10 }).map((_, idx) => ({
        label: `item ${idx + 3}`,
        value: `item ${idx + 3}`,
        sortOrder: idx + 3,
    })),
]

export const SelectMultiple = ({ placeholder, valid }: Parameters<typeof SelectComponent>[0]) => {
    const [selectedItems, setSelectedItems] = useState<ContextMenuItem[]>([])

    const handleChange = useCallback((...item: ContextMenuItem[]) => {
        setSelectedItems(item)
    }, [])

    return (
        <Flex direction="column" width="300" style={{ marginLeft: 20 }}>
            <SelectComponent
                placeholder={placeholder}
                items={items2}
                values={selectedItems}
                onChange={handleChange}
                style={{ marginTop: 20 }}
                valid={valid}
                multiple
            />
        </Flex>
    )
}
