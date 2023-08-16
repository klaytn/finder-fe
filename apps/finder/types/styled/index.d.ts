import { Theme } from '@klaytn/slush'
import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeConfig {
        slush: Theme
    }
}
