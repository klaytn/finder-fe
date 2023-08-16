import { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'

import { colors } from '../styles/colors'
import { typos } from '../styles/typos'
import { useTheme } from '../themes/provider'
import { Flex } from './box'
import { Text } from './text'

type FormTextProps = {
    valid: boolean
    errorMessage: ReactNode
    width?: CSSProperties['width']
    style?: CSSProperties
}

const FormText = ({ valid, errorMessage, width, style }: FormTextProps) => {
    const {
        formtext: { text },
    } = useTheme()
    return (
        <Flex width={width} style={style}>
            {!valid && (
                <Text color={valid ? colors.black[900] : text.error} typo={typos.suit['12.16_400']}>
                    {errorMessage}
                </Text>
            )}
        </Flex>
    )
}

export default FormText
