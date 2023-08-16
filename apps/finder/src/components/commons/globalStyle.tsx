import { createGlobalStyle } from 'styled-components'

import { colors } from '@klaytn/slush'

import { getThemeColor } from '../../functions/colorMap'

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${getThemeColor(colors.black[850])};
        transition: background-color 100ms ease-in;
        overflow: overlay;
    }
`

export default GlobalStyle
