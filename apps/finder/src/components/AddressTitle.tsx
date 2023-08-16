import { useCallback } from 'react'
import styled from 'styled-components'

import { colors, CopyIcon, Flex, Text, Toast, typos, useToggle } from '@klaytn/slush'

import { getThemeColor, getThemeColorOnAttrs } from '../functions/colorMap'
import { copy } from '../functions/Functions'
import { useFinderThemeColor } from '../hooks/useFinderThemeColor'

type AddressTitleProps = {
    failMessage?: string
    hash: string
    displayName?: string
}

const AddressTitle = ({ hash, displayName = hash, failMessage }: AddressTitleProps) => {
    return (
        <OuterContainer>
            <Container>
                <HashText>{displayName}</HashText>
                <CopyButton hash={hash} />
            </Container>
            <FailText>{failMessage}</FailText>
        </OuterContainer>
    )
}

const OuterContainer = styled(Flex).attrs({
    direction: 'row',
})`
    gap: 12px;
    align-items: center;
`

const Container = styled(Flex).attrs({
    direction: 'row',
    round: 16,
})`
    background-color: ${getThemeColor(colors.black[830])};
    padding: 8px 12px 8px 16px;
    gap: 12px;
    align-items: center;
`

const HashText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.code['16.20_400'],
        color: colors.white,
    }),
)``

const FailText = styled(Text).attrs(
    getThemeColorOnAttrs({
        typo: typos.code['16.20_400'],
        color: colors.red[500],
    }),
)``

type CopyButtonProps = {
    hash: string
}

const CopyButton = ({ hash }: CopyButtonProps) => {
    const { isShow, on, off } = useToggle()
    const color = useFinderThemeColor(colors.white)

    const handleCopy = useCallback(() => {
        copy(hash)
        on()
    }, [hash, on])

    return (
        <>
            <CopyButtonInnerButton onClick={handleCopy}>
                <CopyIcon size={16} color={color} />
            </CopyButtonInnerButton>
            <Toast message="Hash copied." show={isShow} onClose={off} />
        </>
    )
}

const CopyButtonInnerButton = styled.button`
    display: flex;
    padding: 0;
    margin: 0;
    border: none;
    justify-content: center;
    align-items: center;
    background: none;
    cursor: pointer;
`

export default AddressTitle
