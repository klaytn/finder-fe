import 'styled-components'
import { Theme } from '../src'
import { ThemeConfig } from '../src/themes/type'

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeConfig {
        slush: Theme
    }
}
