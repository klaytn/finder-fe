import { ComponentMeta } from '@storybook/react'

import * as Icons from '../../../components/icon'
import { IconProps } from '../../../components/icon/type'

type IconType = Icons.Icon

const icons: IconType[] = Object.values(Icons)

const ITEM_WIDTH = 250
const ITEM_ON_ROW = 5

const metaData: ComponentMeta<IconType> = {
    title: 'Components/Icon',
    argTypes: {
        size: {
            defaultValue: 24,
            type: 'number',
        },
        color: {
            defaultValue: '#19171C',
            control: {
                type: 'color',
            },
        },
    },
}
export default metaData

export const Common = ({ size, color }: IconProps) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gridTemplateRows: 'repeat(5, 1fr)',
                gridColumnGap: '0px',
                gridRowGap: '0px',
                width: ITEM_WIDTH * ITEM_ON_ROW,
            }}
        >
            {icons.map((IconComponent, index) => {
                const col = (index % ITEM_ON_ROW) + 1
                const row = Math.floor(index / ITEM_ON_ROW) + 1

                return (
                    <div
                        key={index}
                        style={{
                            width: ITEM_WIDTH,
                            gridArea: `${row} / ${col} / ${row + 1} / ${col + 1}`,
                            margin: 'auto',
                            textAlign: 'center',
                        }}
                    >
                        <p style={{ margin: '10px 0 0 0' }}>
                            <IconComponent size={size} color={color} />
                        </p>
                        <p style={{ margin: '0 0 10px 0' }}>{IconComponent.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
