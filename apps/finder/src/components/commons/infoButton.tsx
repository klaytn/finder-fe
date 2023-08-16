import styled from 'styled-components'

import { CircleiconInfoOffIcon, CircleiconQuestionOffIcon, colors } from '@klaytn/slush'

import { useFinderThemeColor } from '../../hooks/useFinderThemeColor'

type InfoButtonProps = {
    onClick?: () => void
    size?: number
    color?: string
    useQuestionIcon?: boolean
}
const InfoButton = ({ onClick, size = 20, color = colors.blue[200], useQuestionIcon = false }: InfoButtonProps) => {
    const themeColor = useFinderThemeColor(color)
    const Icon = useQuestionIcon ? CircleiconQuestionOffIcon : CircleiconInfoOffIcon

    return (
        <Container onClick={onClick}>
            <Icon size={size} color={themeColor} />
        </Container>
    )
}

const Container = styled.button`
    display: flex;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
`

export default InfoButton
