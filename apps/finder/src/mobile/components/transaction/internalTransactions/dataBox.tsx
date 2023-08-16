import { Fragment } from 'react'
import styled from 'styled-components'

import { ChevronBottomIcon, ChevronTopIcon, colors, CopyIcon, Flex, Text, Toast, typos, useToggle } from '@klaytn/slush'

import { getThemeColor } from '../../../../functions/colorMap'
import { copy } from '../../../../functions/Functions'
import { useFinderThemeColorSet } from '../../../../hooks/useFinderThemeColor'

type DataBoxProps = {
    title: string
    data: string
    marginTop: number
}

const DataBox = ({ title, data, marginTop }: DataBoxProps) => {
    const { isShow, toggle } = useToggle()
    const toastState = useToggle()
    const colorSet = useFinderThemeColorSet({
        title: colors.blue[300],
        icon: colors.black[500],
        text: colors.white,
    })

    const handleCopy = () => {
        copy(data)
        toastState.on()
    }

    const ExpandIcon = isShow ? ChevronTopIcon : ChevronBottomIcon

    return (
        <>
            <Container marginTop={marginTop} direction="column" round={20}>
                <HeaderRow direction="row" justifyContent="space-between">
                    <Text typo={typos.suit['12.16_900']} color={colorSet.title}>
                        {title}
                    </Text>
                    <IconContainer onClick={handleCopy}>
                        <CopyIcon size={16} color={colorSet.icon} />
                    </IconContainer>
                </HeaderRow>

                <DataText typo={typos.code['12.16_400']} color={colorSet.text} open={isShow}>
                    {data.split('\n').map((line, index) => (
                        <Fragment key={index}>
                            {line}
                            <br />
                        </Fragment>
                    ))}
                </DataText>

                <ExpanderIconRow onClick={toggle}>
                    <ExpandIcon size={16} color={colorSet.icon} />
                </ExpanderIconRow>
            </Container>

            <Toast message="Data copied" onClose={toastState.off} show={toastState.isShow} top={60} />
        </>
    )
}

const Container = styled(Flex)<{ marginTop: number }>`
    padding: 16px 20px;
    background-color: ${getThemeColor(colors.black[800])};
    margin-top: ${({ marginTop }) => marginTop}px;
`

const HeaderRow = styled(Flex)`
    align-items: center;
`

const IconContainer = styled(Flex)``

const DataText = styled(Text)<{ open: boolean }>`
    margin-top: 10px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ open }) => (open ? 'none' : 3)};
`

const ExpanderIconRow = styled(Flex)`
    margin-top: 10px;
    align-items: center;
`

export default DataBox
