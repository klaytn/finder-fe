import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowLeftIcon, BookmarkBookIcon, Button, colors, typos } from '@klaytn/slush'

import { getThemeColor } from '../../../functions/colorMap'
import { useFinderThemeColor } from '../../../hooks/useFinderThemeColor'

const ContractResult = () => {
    const navigate = useNavigate()

    const moveToMain = useCallback(() => {
        navigate('/')
    }, [navigate])

    const whiteColor = useFinderThemeColor(colors.white)

    return (
        <div style={{ marginLeft: 202, marginTop: 139 }}>
            <div>
                <BookmarkBookIcon size={36} color={whiteColor} />
            </div>
            <Title>Submitted Successfully</Title>
            <Desc>
                The data will take effect in a few hours.
                <br />
                If there is any problem, please send us an e-mail.
            </Desc>
            <div style={{ marginTop: 136 }}>
                <Button buttonType="third" leftIcon={ArrowLeftIcon} onClick={moveToMain}>
                    Back to the Main
                </Button>
            </div>
        </div>
    )
}

const Title = styled.div`
    ${typos.suit['32.44_900']};
    color: ${getThemeColor(colors.white)};
    margin-top: 12px;
`

const Desc = styled.div`
    ${typos.suit['20.28_400']};
    color: ${getThemeColor(colors.white)};
    margin-top: 16px;
`

export default ContractResult
