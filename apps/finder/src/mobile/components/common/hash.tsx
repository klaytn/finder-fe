import { useCallback } from 'react'
import { useLinkClickHandler } from 'react-router-dom'
import styled from 'styled-components'

import { colors, CopyIcon, Flex, noop, Text, Theme, Toast, typos, useToggle } from '@klaytn/slush'

import { useFinderTheme } from '../../../context/finderThemeProvider'
import { copy as doCopy, extractProp } from '../../../functions/Functions'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

type HashProps = {
    hash: string
    copy?: boolean
    link?: string
    isSuccess?: boolean
    basis?: number
    currentBlock?: boolean
}

const Hash = ({ hash, link, copy = false, isSuccess = true, basis, currentBlock = false }: HashProps) => {
    const toastState = useToggle()
    const handleClick = useLinkClickHandler<HTMLSpanElement>(link || '')

    const handleCopy = useCallback(() => {
        doCopy(hash)
        toastState.on()
    }, [hash, toastState])

    const {
        theme: { slush },
    } = useFinderTheme()
    const isDarkMode = slush === Theme.dark
    const iconColor = useFinderThemeColor(colors.blue[500])
    const successTextColor = isDarkMode ? colors.blue[200] : colors.blue[700]
    const failTextColor = isDarkMode ? colors.red[200] : colors.red[700]
    const successBgColor = isDarkMode ? colors.blue[850] : colors.blue[200]
    const failBgColor = isDarkMode ? colors.red[850] : colors.red[200]

    const currentBlockTextColor = isDarkMode ? colors.white : colors.black[900]
    const currentBlockBgColor = isDarkMode ? colors.black[800] : colors.black[100]

    const textColor = currentBlock ? currentBlockTextColor : isSuccess ? successTextColor : failTextColor
    const bgColor = currentBlock ? currentBlockBgColor : isSuccess ? successBgColor : failBgColor

    return (
        <Container basis={basis}>
            <HashContainer backgroundColor={bgColor}>
                <HashText onClick={link ? handleClick : noop} typo={typos.code['12.16_400']} color={textColor}>
                    {hash}
                </HashText>
            </HashContainer>
            {copy && (
                <CopyIconContainer onClick={handleCopy}>
                    <CopyIcon size={18} color={iconColor} />
                </CopyIconContainer>
            )}
            <Toast message="Hash copied." top={60} show={toastState.isShow} onClose={toastState.off} />
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'row',
    justifyContent: 'space-between',
})<{ basis?: number }>`
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    flex-basis: ${extractProp('basis')};
`

const HashContainer = styled(Flex)<{ backgroundColor: string }>`
    background-color: ${extractProp('backgroundColor')};
    padding: 3px 7px 3px 10px;
    border-radius: 8px;
    flex-grow: 1;
    overflow: hidden;
`

const HashText = styled(Text)`
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
`

const CopyIconContainer = styled(Flex).attrs({
    justifyContent: 'center',
})`
    margin-left: 10px;
    align-items: center;
`

export default Hash
