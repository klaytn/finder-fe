import { ComponentMeta } from '@storybook/react'

import { ToggleTheme as ToggleThemeComponent } from '../../components/toggleTheme'
import { useToggle } from '../../hooks/useToggle'

const metaData: ComponentMeta<typeof ToggleThemeComponent> = {
    title: 'Components/ToggleTheme',
    component: ToggleThemeComponent,
    parameters: {
        controls: {
            hideNoControlsWarning: true,
        },
    },
    argTypes: {},
}
export default metaData

export const ToggleTheme = () => {
    const { isShow, toggle } = useToggle(true)
    return <ToggleThemeComponent isDarkMode={isShow} onToggle={toggle} />
}

ToggleTheme.storyName = 'ToggleTheme'
