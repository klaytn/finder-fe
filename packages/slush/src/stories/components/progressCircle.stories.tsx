import { ComponentMeta } from '@storybook/react'

import { ProgressCircle as ProgressCircleComponent } from '../../components/progress/progressCircle'

const metaData: ComponentMeta<typeof ProgressCircleComponent> = {
    title: 'Components/Progress',
    component: ProgressCircleComponent,
    argTypes: {
        show: {
            defaultValue: true,
            type: 'boolean',
        },
        size: {
            defaultValue: 300,
            type: 'number',
        },
        overlay: {
            defaultValue: false,
            type: 'boolean',
        },
    },
}
export default metaData

export const ProgressCircle = ({ show, size, overlay }: Parameters<typeof ProgressCircleComponent>[0]) => {
    return <ProgressCircleComponent show={show} size={size} overlay={overlay} />
}
