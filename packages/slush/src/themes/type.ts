import { Color, ColorName } from '../styles/colors'
import { Shadow } from '../styles/shadows'
import { Optional } from '../types/utility-types'

export type SelectTheme = {
    select: {
        text: {
            normal: Color
            hover: Color
            focus: Color
            disabled: Color
        }
        background: {
            normal: Color
            hover: Color
            focus: Color
            disabled: Color
        }
        active: Color
    }
}

export type Theme = {
    select: SelectTheme
}

export type Varient = 'default' | 'filled'

export type LabelColor = {
    fill: Color
    color: Color
}

type LabelColorType = Omit<Record<ColorName, LabelColor>, 'white' | 'orange'>

export type LabelColorKey = keyof LabelColorType

type ButtonTheme = {
    background: {
        normal: Color
        hover: Color
        active: Color
        disable: Color
    }
    text: {
        normal: Color
        hover: Color
        active: Color
        disable: Color
    }
    border?: {
        normal: string
        hover: string
        active: string
        disable: string
    }
    outline: {
        normal: string
        hover: string
    }
}

type ToastTheme = {
    fill: Color
    contents: Color
    shadow: Shadow
}

type PanelTheme = {
    background: Color
    color: Color
    borderColor: Color
}

/* eslint-disable @typescript-eslint/ban-types */
export type ThemeConfig = {
    popup: {
        bgColor: Color
        titleColor: Color
        contentColor: Color
        closeIconColor: Color
        shadow: Shadow
    }
    control: {}
    inputbox: {}
    // light mode : varient(default, filled), dark mode : varient(default only)
    label: {
        default: LabelColorType
    } & Optional<Record<Varient, LabelColorType>>
    select: {
        chevronBottom: Color
        background: {
            normal: Color
            hover: Color
            focus: Color
            disabled: Color
        }
        outline: {
            focus: Color
            invalid: Color
        }
        text: {
            normal: Color
            selected: Color
            invalid: Color
        }
    }
    contextMenu: {
        background: Color
    }
    contextMenuItem: {
        chevronRight: Color
        hoverBackground: Color
        selected: Color
        unselected: Color
    }
    tooltip: {
        background: Color
        text: Color
        shadow: Shadow
    }
    button: {
        first: ButtonTheme
        second: ButtonTheme
        third: ButtonTheme
        forth: ButtonTheme
        wallet: ButtonTheme
        walletConnected: ButtonTheme
    }
    tabs: {
        bottomBar: Color
        normal: Color
        selected: Color
        disabled: Color
        indicator: Color
    }
    divider: {
        color: Color
    }
    input: {
        background: {
            normal: Color
            hover: Color
        }
        outline: {
            invalid: Color
            focused: Color
        }
        text: {
            normal: Color
        }
        placeholder: Color
        divider: Color
        caret: {
            background: Color
            icon: Color
        }
    }
    dialog: {
        background: Color
        title: Color
        content: Color
    }
    expander: {
        background: Color
        icon: Color
    }
    toast: {
        green: ToastTheme
        blue: ToastTheme
        red: ToastTheme
        yellow: ToastTheme
    }
    popover: {
        background: Color
        shadow: Shadow
        color: Color
    }
    dateDurationPicker: {
        background: Color
        divider: Color
        header: {
            background: Color
            color: Color
            hoverBackground: Color
        }
        panel: {
            default: PanelTheme
            selected: PanelTheme
        }
        calendar: {
            day: {
                color: Color
                dim: Color
                hoverBackground: Color
            }
            picker: {
                color: Color
                hoverBackground: Color
            }
            range: {
                default: Color
                endpoint: Color
            }
            weekday: Color
        }
        button: {
            color: Color
        }
    }
    dropdown: {
        background: Color
        title: Color
        divider: Color
        shadow: Shadow
        button: {
            background: Color
            color: Color
        }
    }
    radiobox: {
        color: Color
        icon: Color
        selected: {
            background: Color
            color: Color
        }
    }
    radio: {
        background: {
            normal: Color
            selected: Color
        }
        border: {
            normal: Color
            selected: Color
        }
        text: Color
    }
    check: {
        background: {
            normal: Color
            selected: Color
        }
        border: {
            normal: Color
            selected: Color
        }
        icon: Color
        text: Color
    }
    formtext: {
        text: {
            error: Color
        }
    }
    timePicker: {
        background: Color
        text: {
            selected: Color
            unselected: Color
        }
        button: {
            selected: Color
        }
        shadow: Shadow
    }
    datePicker: {
        shadow: Shadow
        background: Color
        month: Color
        weekName: Color
        days: {
            text: {
                normal: Color
                notThisMonth: Color
            }
            background: {
                selected: Color
                hover: Color
            }
        }
    }
    checkbox: {
        background: {
            normal: Color
            checked: Color
        }
        border: {
            normal: Color
            checked: Color
        }
        checkIcon: Color
    }
}
