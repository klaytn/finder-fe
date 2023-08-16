import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled, { keyframes } from 'styled-components'

import { ArrowcomboLeftrightIcon, colors, CubeIcon, Flex, Icon, percentageToHex, Text, typos } from '@klaytn/slush'

import NftIcon from '../../../components/commons/icons/address/nftIcon'
import TokenIcon from '../../../components/commons/icons/address/tokenIcon'
import { ZIndexMap } from '../../../constants/zIndex'
import { getThemeColor } from '../../../functions/colorMap'
import { calculateChainStatus } from '../../../functions/Functions'
import { useFinderThemeColor, useFinderThemeColorSet } from '../../../hooks/useFinderThemeColor'
import { finderStatusState, IFinderStatus } from '../../../states/status'
import { timerState } from '../../../states/timer'

const MIN_WIDTH = 360

type MenuProps = {
    open: boolean
    top: number
}

const Menu = ({ open, top }: MenuProps) => {
    const [opened, setOpened] = useState(false)
    const [width, setWidth] = useState(MIN_WIDTH)

    useEffect(() => {
        if (opened) {
            return
        }

        if (open) {
            setOpened(true)
        }
    }, [open, opened])

    useEffect(() => {
        function adjustWidth() {
            const nextWidth = window.screen.width < MIN_WIDTH ? MIN_WIDTH : window.screen.width
            setWidth(nextWidth)
        }

        adjustWidth()
        window.addEventListener('resize', adjustWidth)

        return () => {
            window.removeEventListener('resize', adjustWidth)
        }
    }, [])

    const location = useLocation()
    useEffect(() => {
        setOpened(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <Outer open={open} top={top} opened={opened} style={{ width }}>
            <Container>
                <Status />
                <MenuItem icon={CubeIcon} name="Blocks" link="/blocks" />
                <MenuItem icon={ArrowcomboLeftrightIcon} name="Transactions" link="/txs" />
                <MenuItem icon={TokenIcon} name="Tokens" link="/tokens" />
                <MenuItem icon={NftIcon} name="NFTs" link="/nfts" />
            </Container>
        </Outer>
    )
}

const openAnimation = keyframes`
    from {
        height: 0px;
    }

    to {
        height: 255px;
    }
`

const closeAnimation = keyframes`
    from {
        height: 255px;
    }

    to {
        height: 0px;
    }
`

const Outer = styled.div<{ open: boolean; top: number; opened: boolean }>`
    height: 0px;
    position: absolute;
    left: 0px;
    top: ${({ top }) => top}px;
    z-index: ${ZIndexMap.mobileMenu};
    background-color: ${getThemeColor(colors.black[850])};
    box-shadow: 0px 8px 20px ${getThemeColor(colors.blue[600])}${percentageToHex(15)};
    animation: ${({ open, opened }) => (!opened ? 'none' : open ? openAnimation : closeAnimation)} 200ms;
    animation-fill-mode: forwards;
    overflow: hidden;
    white-space: nowrap;
`

const Container = styled(Flex)`
    padding: 0px 20px;
    overflow: hidden;
    white-space: nowrap;
`

const Status = () => {
    const finderStatus = useRecoilValue<IFinderStatus>(finderStatusState)
    const timer = useRecoilValue<number>(timerState)
    const diff = timer - Date.parse(finderStatus.datetime)
    const { status, color, icon: statusIcon } = calculateChainStatus(diff)

    const colorSet = useFinderThemeColorSet({
        white: colors.white,
        text: color,
    })

    return (
        <StatusContainer direction="column">
            <Text typo={typos.suit['12.16_400']} color={colorSet.white}>
                Chain status is{' '}
            </Text>
            <StatusRow direction="row">
                <Text typo={typos.suit['12.16_900']} color={colorSet.text}>
                    {status}
                </Text>
                <StatusIconText typo={typos.suit['12.16_400']}>{statusIcon}</StatusIconText>
            </StatusRow>
        </StatusContainer>
    )
}

const StatusContainer = styled(Flex)`
    margin-bottom: 33px;
`

const StatusRow = styled(Flex)`
    align-items: center;
`

const StatusIconText = styled(Text)`
    margin: 0px 2px;
`

type MenuItemProps = {
    icon: Icon
    name: string
    link: string
}

const MenuItem = ({ icon: MenuIcon, name, link }: MenuItemProps) => {
    const location = useLocation()
    const isSelected = location.pathname.startsWith(link.slice(0, link.length - 1))
    const color = useFinderThemeColor(isSelected ? colors.blue[300] : colors.white)

    return (
        <Link to={link}>
            <MenuItemContainer direction="row">
                <MenuItemIconContainer>
                    <MenuIcon size={20} color={color} />
                </MenuItemIconContainer>
                <Text typo={typos.suit['14.18_900']} color={color}>
                    {name}
                </Text>
            </MenuItemContainer>
        </Link>
    )
}

const MenuItemContainer = styled(Flex)`
    align-items: center;
    margin-bottom: 26px;
`

const MenuItemIconContainer = styled(Flex)`
    margin-right: 9px;
`

export default Menu
