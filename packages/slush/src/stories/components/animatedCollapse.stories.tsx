import { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import { Button } from '../../components/button'
import AnimatedCollapseComponent, { Size } from '../../components/dateDurationPicker/animatedCollapse'

const metaData: ComponentMeta<typeof AnimatedCollapseComponent> = {
    title: 'Components/Collapse',
    component: AnimatedCollapseComponent,
    argTypes: {
        applyWidth: {
            defaultValue: false,
            type: 'boolean',
        },
        size: {
            defaultValue: 0,
            type: 'number',
        },
    },
}
export default metaData

export const Collapse = ({ applyWidth, size: initialHeight }: Parameters<typeof AnimatedCollapseComponent>[0]) => {
    const [currentHeight, setCurrentHeight] = useState<Size>(initialHeight)
    const buttonOptions: Size[] = [0, 100, 200, 'auto']
    const bulkArray = Array.from({ length: 30 }).fill('Randomized content area!')
    return (
        <>
            {buttonOptions.map((nextHeight) => (
                <Button key={`btn-${nextHeight}`} size={32} onClick={() => setCurrentHeight(nextHeight)}>
                    {nextHeight === 'auto' ? nextHeight : `${nextHeight}px`}
                </Button>
            ))}
            <AnimatedCollapseComponent size={currentHeight} applyWidth={applyWidth}>
                <div
                    style={{
                        backgroundColor: 'pink',
                        padding: '10px',
                        width: '700px',
                    }}
                >
                    {bulkArray.map((text, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'rgba(255, 255, 255, .3)',
                                margin: '8px',
                            }}
                        >
                            {index + 1} : {text}
                            <br />
                        </div>
                    ))}
                </div>
            </AnimatedCollapseComponent>
        </>
    )
}

Collapse.storyName = 'Collapse'
