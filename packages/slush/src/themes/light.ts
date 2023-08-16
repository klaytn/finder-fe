import { colors, withAlpha } from '../styles/colors'
import { ThemeConfig } from './type'

const lightTheme: ThemeConfig = {
    popup: {
        bgColor: colors.white,
        titleColor: colors.black['900'],
        contentColor: colors.black['600'],
        closeIconColor: colors.black['900'],
        shadow: 'black.900.10%',
    },
    control: {},
    inputbox: {},
    label: {
        default: {
            black: {
                fill: colors.black[100],
                color: colors.black[900],
            },
            green: {
                fill: colors.green[200],
                color: colors.green[700],
            },
            blue: {
                fill: colors.blue[200],
                color: colors.blue[700],
            },
            red: {
                fill: colors.red[200],
                color: colors.red[700],
            },
            yellow: {
                fill: colors.yellow[200],
                color: colors.yellow[700],
            },
        },
        filled: {
            black: {
                fill: colors.black[600],
                color: colors.white,
            },
            green: {
                fill: colors.green[600],
                color: colors.white,
            },
            blue: {
                fill: colors.blue[600],
                color: colors.white,
            },
            red: {
                fill: colors.red[600],
                color: colors.white,
            },
            yellow: {
                fill: colors.yellow[600],
                color: colors.white,
            },
        },
    },
    select: {
        chevronBottom: colors.black[800],
        background: {
            normal: withAlpha(colors.black[900], 3),
            hover: withAlpha(colors.black[900], 5),
            focus: withAlpha(colors.black[900], 3),
            disabled: withAlpha(colors.black[900], 3),
        },
        outline: {
            focus: colors.blue[600],
            invalid: colors.red[600],
        },
        text: {
            normal: colors.black[500],
            selected: colors.black[900],
            invalid: colors.red[600],
        },
    },
    contextMenu: {
        background: colors.black[30],
    },
    contextMenuItem: {
        chevronRight: colors.black[700],
        hoverBackground: colors.blue[100],
        selected: colors.blue[500],
        unselected: colors.black[700],
    },
    tooltip: {
        background: colors.blue[200],
        text: colors.blue[800],
        shadow: 'blue.600.15%',
    },
    button: {
        first: {
            background: {
                normal: colors.blue[600],
                hover: colors.blue[600],
                active: colors.blue[700],
                disable: colors.black[200],
            },
            text: {
                normal: colors.white,
                hover: colors.white,
                active: colors.white,
                disable: colors.black[400],
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.blue[500], 35)}`,
            },
        },
        second: {
            background: {
                normal: colors.white,
                hover: colors.white,
                active: colors.white,
                disable: colors.white,
            },
            text: {
                normal: colors.blue[600],
                hover: colors.blue[600],
                active: colors.blue[600],
                disable: colors.black[300],
            },
            border: {
                normal: `1px solid ${colors.blue[600]}`,
                hover: `1px solid ${colors.blue[600]}`,
                active: `1px solid ${colors.blue[600]}`,
                disable: `1px solid ${colors.black[300]}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.blue[500], 15)}`,
            },
        },
        third: {
            background: {
                normal: colors.white,
                hover: colors.white,
                active: colors.white,
                disable: colors.black[50],
            },
            text: {
                normal: colors.black[600],
                hover: colors.black[600],
                active: colors.black[700],
                disable: colors.black[200],
            },
            border: {
                normal: `1px solid ${colors.black[400]}`,
                hover: `1px solid ${colors.black[400]}`,
                active: `1px solid ${colors.black[500]}`,
                disable: `1px solid ${colors.black[200]}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.black[900], 5)}`,
            },
        },
        forth: {
            background: {
                normal: withAlpha(colors.black[900], 3),
                hover: withAlpha(colors.black[900], 3),
                active: withAlpha(colors.black[900], 5),
                disable: colors.black[50],
            },
            text: {
                normal: colors.black[600],
                hover: colors.black[600],
                active: colors.black[700],
                disable: colors.black[200],
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.black[900], 5)}`,
            },
        },
        wallet: {
            background: {
                normal: colors.blue[200],
                hover: colors.blue[200],
                active: colors.blue[300],
                disable: colors.black[70],
            },
            text: {
                normal: colors.blue[700],
                hover: colors.blue[700],
                active: colors.blue[700],
                disable: colors.black[300],
            },
            border: {
                normal: `1px solid ${colors.blue[300]}`,
                hover: `1px solid ${colors.blue[300]}`,
                active: `1px solid ${colors.blue[400]}`,
                disable: `1px solid ${withAlpha(colors.black[900], 5)}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.black[900], 5)}`,
            },
        },
        walletConnected: {
            background: {
                normal: colors.green[200],
                hover: colors.green[200],
                active: colors.green[300],
                disable: colors.black[70],
            },
            text: {
                normal: colors.green[700],
                hover: colors.green[700],
                active: colors.green[700],
                disable: colors.black[300],
            },
            border: {
                normal: `1px solid ${colors.green[300]}`,
                hover: `1px solid ${colors.green[300]}`,
                active: `1px solid ${colors.green[400]}`,
                disable: `1px solid ${withAlpha(colors.black[900], 5)}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.black[900], 5)}`,
            },
        },
    },
    tabs: {
        bottomBar: colors.blue[800],
        normal: colors.black[500],
        selected: colors.blue[800],
        disabled: colors.black[200],
        indicator: colors.blue[600],
    },
    divider: {
        color: withAlpha(colors.black[900], 10),
    },
    input: {
        background: {
            normal: withAlpha(colors.black[900], 3),
            hover: withAlpha(colors.black[900], 5),
        },
        outline: {
            invalid: colors.red[600],
            focused: colors.blue[600],
        },
        text: {
            normal: colors.black[900],
        },
        placeholder: colors.black[500],
        divider: withAlpha(colors.black[900], 10),
        caret: {
            background: colors.white,
            icon: colors.black[900],
        },
    },
    dialog: {
        background: colors.white,
        title: colors.black[900],
        content: colors.black[900],
    },
    expander: {
        background: colors.black[70],
        icon: colors.black[400],
    },
    toast: {
        green: {
            fill: colors.green[100],
            contents: colors.green[600],
            shadow: 'green.600.15%',
        },
        blue: {
            fill: colors.blue[100],
            contents: colors.blue[600],
            shadow: 'blue.600.15%',
        },
        red: {
            fill: colors.red[100],
            contents: colors.red[600],
            shadow: 'red.600.15%',
        },
        yellow: {
            fill: colors.yellow[100],
            contents: colors.yellow[600],
            shadow: 'yellow.600.15%',
        },
    },
    popover: {
        background: colors.black[30],
        shadow: 'blue.600.15%',
        color: colors.black[900],
    },
    dateDurationPicker: {
        background: colors.black[30],
        divider: colors.black[900],
        header: {
            background: colors.black[30],
            color: colors.black[500],
            hoverBackground: withAlpha(colors.black[900], 5),
        },
        panel: {
            default: {
                background: withAlpha(colors.black[900], 3),
                color: withAlpha(colors.black[900], 65),
                borderColor: withAlpha(colors.black[900], 5),
            },
            selected: {
                background: withAlpha(colors.blue[500], 15),
                color: colors.blue[500],
                borderColor: colors.blue[500],
            },
        },
        calendar: {
            day: {
                color: colors.black[700],
                dim: colors.black[400],
                hoverBackground: withAlpha(colors.black[900], 5),
            },
            picker: {
                color: colors.black[900],
                hoverBackground: withAlpha(colors.black[900], 5),
            },
            range: {
                default: withAlpha(colors.blue[500], 15),
                endpoint: colors.blue[300],
            },
            weekday: colors.black[400],
        },
        button: {
            color: colors.blue[600],
        },
    },
    dropdown: {
        background: colors.black[50],
        title: colors.black[700],
        divider: withAlpha(colors.black[900], 10),
        shadow: 'black.900.10%',
        button: {
            background: withAlpha(colors.black[900], 3),
            color: colors.black[900],
        },
    },
    radiobox: {
        color: colors.black[700],
        icon: colors.blue[400],
        selected: {
            background: colors.blue[100],
            color: colors.blue[500],
        },
    },
    radio: {
        background: {
            normal: colors.black[300],
            selected: colors.white,
        },
        border: {
            normal: colors.black[200],
            selected: colors.blue[500],
        },
        text: colors.black[900],
    },
    check: {
        background: {
            normal: colors.white,
            selected: colors.blue[400],
        },
        border: {
            normal: colors.black[200],
            selected: colors.blue[400],
        },
        icon: colors.white,
        text: colors.black[900],
    },
    formtext: {
        text: {
            error: colors.red[600],
        },
    },
    timePicker: {
        background: colors.black[30],
        text: {
            selected: colors.black[900],
            unselected: withAlpha(colors.black[900], 35),
        },
        button: {
            selected: withAlpha(colors.black[900], 5),
        },
        shadow: 'blue.600.15%',
    },
    datePicker: {
        shadow: 'blue.600.15%',
        background: colors.black[30],
        month: colors.black[500],
        weekName: colors.black[400],
        days: {
            text: {
                normal: colors.black[700],
                notThisMonth: colors.black[400],
            },
            background: {
                selected: colors.blue[300],
                hover: withAlpha(colors.black[900], 5),
            },
        },
    },
    checkbox: {
        background: {
            normal: colors.white,
            checked: colors.blue[400],
        },
        border: {
            normal: colors.black[300],
            checked: colors.blue[400],
        },
        checkIcon: colors.white,
    },
}

export default lightTheme
