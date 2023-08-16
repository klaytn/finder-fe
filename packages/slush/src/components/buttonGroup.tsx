import { Fragment } from 'react'
import styled from 'styled-components'

import { Button } from './button'
import { VerticalDivider } from './divider'
import { Icon } from './icon'

export type ButtonGroupItem = {
    display: string
    width?: number
    onClick?: () => void
    rightIcon?: Icon
}

type ButtonGroupProps = {
    items: ButtonGroupItem[]
}

export const ButtonGroup = ({ items }: ButtonGroupProps) => {
    return (
        <Container>
            {items.map(({ display, width, ...buttonProps }, index) => {
                const isFirst = index === 0
                const isLast = index === items.length - 1
                const radiusRemove = isFirst ? 'right' : isLast ? 'left' : 'both'

                return (
                    <Fragment key={`${index}-${display}`}>
                        <InnerButton
                            buttonType="forth"
                            size={36}
                            style={{ width }}
                            {...buttonProps}
                            radiusRemove={radiusRemove}
                        >
                            {display}
                        </InnerButton>
                        {!isLast && <VerticalDivider />}
                    </Fragment>
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
`

const InnerButton = styled(Button)`
    margin: 0;
`
