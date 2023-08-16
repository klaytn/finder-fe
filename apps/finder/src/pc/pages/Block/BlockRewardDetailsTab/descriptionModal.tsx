import styled from 'styled-components'

import { colors, Dialog, Theme, typos } from '@klaytn/slush'

import { useFinderTheme } from '../../../../context/finderThemeProvider'
import { getThemeColor } from '../../../../functions/colorMap'
import DiagramDark from './diagram_dark.png'
import DiagramLight from './diagram_light.png'

const DialogOverride = {
    width: 900,
}

type DescriptionModalProps = {
    show: boolean
    onClose: () => void
}
const DescriptionModal = ({ show, onClose }: DescriptionModalProps) => {
    const {
        theme: { slush },
    } = useFinderTheme()
    const diagramSrc = slush === Theme.dark ? DiagramDark : DiagramLight

    return (
        <Dialog title="" show={show} onClose={onClose} override={DialogOverride}>
            <Container>
                <DescText>
                    Block Rewards ard distributed according to the calculation formular and reward policy below.
                </DescText>
                <DiagramImg src={diagramSrc} />
            </Container>
        </Dialog>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 23px;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`

const DescText = styled.div`
    display: flex;
    color: ${getThemeColor(colors.black[400])};
    ${typos.suit['14.18_400']};
`

const DiagramImg = styled.img`
    width: 665px;
`

export default DescriptionModal
