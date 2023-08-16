import { ReactNode, useCallback } from 'react'
import styled, { css } from 'styled-components'

import { Button, colors, CopyIcon, Theme, Toast, Tooltip } from '@klaytn/slush'

import { useFinderTheme } from '../../context/finderThemeProvider'
import { useToggle } from '../../hooks/useToggle'

export interface ICopyProps {
    value: string
    style?: 'block' | 'inline'
    message?: string
    children?: ReactNode
    noMargin?: boolean
}

const Copy = ({ value, style = 'block', message = 'Hash Copied.', children, noMargin = false }: ICopyProps) => {
    const { isShow, on, off } = useToggle()

    const copy = useCallback(
        (value: string) => {
            const textarea = document.createElement('textarea')
            textarea.value = value
            textarea.style.top = '0'
            textarea.style.left = '0'
            textarea.style.position = 'fixed'

            document.body.appendChild(textarea)
            textarea.focus()
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)

            on()
        },
        [on],
    )

    const handleCopy = useCallback(() => {
        copy(value)
    }, [copy, value])

    const {
        theme: { slush },
    } = useFinderTheme()

    const color = slush === Theme.dark ? colors.black[400] : colors.black[600]

    const contents = children ? (
        children
    ) : style === 'block' ? (
        <BlockButton leftIcon={CopyIcon} buttonType="forth" size={28} noMargin={noMargin} />
    ) : (
        <NonBlockDiv>
            <CopyIcon size={14} color={color} />
        </NonBlockDiv>
    )

    return (
        <>
            <Tooltip message="click to copy" onClick={handleCopy}>
                {contents}
            </Tooltip>
            <Toast message={message} show={isShow} onClose={off} />
        </>
    )
}

const BlockButton = styled(Button)<{ noMargin: boolean }>`
    border-radius: 10px;
    ${({ noMargin }) =>
        noMargin
            ? css`
                  margin: 0;
              `
            : ''}
`

const NonBlockDiv = styled.div`
    margin-left: 14px;
`

export default Copy
