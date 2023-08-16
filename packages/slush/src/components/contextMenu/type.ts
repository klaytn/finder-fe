import { Color } from '../../styles/colors'
import { IconProps } from '../icon/type'

export type ContextMenuItem = {
    label: string
    fullLabel?: string
    value?: string
    isTitle?: boolean
    collapse?: 'open' | 'close'
    isCheckbox?: boolean
    icon?: (props: IconProps) => JSX.Element
    subItems?: ContextMenuItem[]
    sortOrder?: number
    indent?: number
    isDivider?: boolean
    color?: Color
}
