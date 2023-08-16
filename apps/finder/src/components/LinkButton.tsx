import styled from 'styled-components'

import { ArrowSquareOutIcon, Button } from '@klaytn/slush'

type LinkProps = {
    link: string
}

const LinkButton = ({ link }: LinkProps) => {
    const openLink = () => window.open(link)

    return <BlockButton buttonType="forth" size={28} onClick={openLink} leftIcon={ArrowSquareOutIcon} />
}

const BlockButton = styled(Button)`
    border-radius: 10px;
    width: 28px;
    margin: 0 8px;
`
export default LinkButton
