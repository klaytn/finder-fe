import { useMemo } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'

import { ArrowcomboLeftrightIcon, colors, CubeIcon, Icon, Flex } from '@klaytn/slush'

import { ROUTES } from '../constants/routes'
import { useFeatures } from '../context/configProvider'
import { useFinderThemeColor } from '../hooks/useFinderThemeColor'
import ContractIcon from './commons/icons/address/contractIcon'
import NftIcon from './commons/icons/address/nftIcon'
import TokenIcon from './commons/icons/address/tokenIcon'
import MenuIcon from './MenuIcon'

interface IMenuProps {
    icon: Icon
    name: string
    link: string
}

const Menu = () => {
    const { contractCode } = useFeatures()
    const { pathname } = useLocation()
    const selectedColor = useFinderThemeColor(colors.blue[300])
    const unselectedColor = useFinderThemeColor(colors.white)

    const menus = useMemo(() => {
        const result: IMenuProps[] = [
            { icon: CubeIcon, name: 'Blocks', link: ROUTES.BLOCK.LIST },
            { icon: ArrowcomboLeftrightIcon, name: 'Transactions', link: ROUTES.TX.LIST },
            { icon: TokenIcon, name: 'Tokens', link: ROUTES.TOKEN.LIST },
            { icon: NftIcon, name: 'NFTs', link: ROUTES.NFT.LIST },
        ]

        if (contractCode) {
            result.push({ icon: ContractIcon, name: 'Contract', link: ROUTES.CONTRACT.INPUT })
        }

        return result
    }, [contractCode])

    return (
        <Container>
            {menus.map((menu, index) => {
                const color = pathname.startsWith(menu.link.slice(0, menu.link.length - 1))
                    ? selectedColor
                    : unselectedColor
                return <MenuIcon key={index} color={color} {...menu} />
            })}
        </Container>
    )
}

const Container = styled(Flex).attrs({
    direction: 'rpw',
    justifyContent: 'space-between',
})`
    gap: 34px;
`

export default Menu
