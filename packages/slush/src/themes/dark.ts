import { colors, withAlpha } from '../styles/colors'
import { ThemeConfig } from './type'

const darkTheme: ThemeConfig = {
    popup: {
        bgColor: colors.black['850'],
        titleColor: colors.white,
        contentColor: colors.black['300'],
        closeIconColor: colors.white,
        shadow: 'blue.600.15%',
    },
    control: {},
    inputbox: {},
    label: {
        default: {
            black: {
                fill: colors.black[800],
                color: colors.white,
            },
            green: {
                fill: colors.green[850],
                color: colors.green[200],
            },
            blue: {
                fill: colors.blue[850],
                color: colors.blue[200],
            },
            red: {
                fill: colors.red[850],
                color: colors.red[200],
            },
            yellow: {
                fill: colors.yellow[850],
                color: colors.yellow[200],
            },
        },
    },
    select: {
        chevronBottom: colors.white,
        background: {
            normal: withAlpha(colors.white, 5),
            hover: withAlpha(colors.white, 10),
            focus: withAlpha(colors.white, 5),
            disabled: withAlpha(colors.white, 5),
        },
        outline: {
            focus: colors.blue[600],
            invalid: colors.red[500],
        },
        text: {
            normal: colors.black[500],
            selected: colors.white,
            invalid: colors.red[500],
        },
    },
    contextMenu: {
        background: colors.black[830],
    },
    contextMenuItem: {
        chevronRight: colors.black[200],
        hoverBackground: colors.black[850],
        selected: colors.blue[400],
        unselected: colors.black[200],
    },
    tooltip: {
        background: colors.black[900],
        text: colors.blue[400],
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
                hover: `2px solid ${withAlpha(colors.blue[500], 50)}`,
            },
        },
        second: {
            background: {
                normal: withAlpha(colors.black[700], 0),
                hover: colors.black[700],
                active: colors.black[800],
                disable: colors.black[700],
            },
            text: {
                normal: colors.blue[400],
                hover: colors.blue[400],
                active: colors.blue[400],
                disable: colors.black[600],
            },
            border: {
                normal: `1px solid ${colors.blue[400]}`,
                hover: `1px solid ${colors.blue[400]}`,
                active: `1px solid ${colors.blue[400]}`,
                disable: `1px solid ${colors.black[600]}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.blue[500], 50)}`,
            },
        },
        third: {
            background: {
                normal: colors.black[700],
                hover: colors.black[700],
                active: colors.black[800],
                disable: colors.black[700],
            },
            text: {
                normal: colors.black[400],
                hover: colors.black[400],
                active: colors.black[400],
                disable: colors.black[600],
            },
            border: {
                normal: `1px solid ${colors.black[600]}`,
                hover: `1px solid ${colors.black[600]}`,
                active: `1px solid ${colors.black[600]}`,
                disable: `1px solid ${colors.black[600]}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.white, 20)}`,
            },
        },
        forth: {
            background: {
                normal: withAlpha(colors.white, 5),
                hover: withAlpha(colors.white, 5),
                active: withAlpha(colors.white, 10),
                disable: withAlpha(colors.white, 5),
            },
            text: {
                normal: colors.black[400],
                hover: colors.black[400],
                active: colors.black[400],
                disable: colors.black[700],
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.white, 10)}`,
            },
        },
        wallet: {
            background: {
                normal: colors.blue[900],
                hover: colors.blue[900],
                active: colors.blue[800],
                disable: colors.black[830],
            },
            text: {
                normal: colors.blue[300],
                hover: colors.blue[300],
                active: colors.blue[300],
                disable: colors.black[600],
            },
            border: {
                normal: `1px solid ${colors.blue[700]}`,
                hover: `1px solid ${colors.blue[700]}`,
                active: `1px solid ${colors.blue[700]}`,
                disable: `1px solid ${withAlpha(colors.white, 5)}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.white, 10)}`,
            },
        },
        walletConnected: {
            background: {
                normal: colors.green[850],
                hover: colors.green[850],
                active: colors.green[800],
                disable: colors.black[830],
            },
            text: {
                normal: colors.green[400],
                hover: colors.green[400],
                active: colors.green[400],
                disable: colors.black[600],
            },
            border: {
                normal: `1px solid ${colors.green[800]}`,
                hover: `1px solid ${colors.green[800]}`,
                active: `1px solid ${colors.green[700]}`,
                disable: `1px solid ${withAlpha(colors.white, 5)}`,
            },
            outline: {
                normal: '1px solid transparent',
                hover: `2px solid ${withAlpha(colors.white, 10)}`,
            },
        },
    },
    tabs: {
        bottomBar: colors.blue[300],
        normal: colors.black[400],
        selected: colors.blue[300],
        disabled: colors.black[700],
        indicator: colors.blue[500],
    },
    divider: {
        color: withAlpha(colors.white, 10),
    },
    input: {
        background: {
            normal: withAlpha(colors.white, 5),
            hover: withAlpha(colors.white, 10),
        },
        outline: {
            invalid: colors.red[500],
            focused: colors.blue[600],
        },
        text: {
            normal: colors.white,
        },
        placeholder: colors.black[500],
        divider: withAlpha(colors.white, 10),
        caret: {
            background: colors.black[600],
            icon: colors.black[900],
        },
    },
    dialog: {
        background: colors.black[850],
        title: colors.white,
        content: colors.white,
    },
    expander: {
        background: colors.black[830],
        icon: colors.black[500],
    },
    toast: {
        green: {
            fill: colors.green[900],
            contents: colors.green[100],
            shadow: 'green.600.15%',
        },
        blue: {
            fill: colors.blue[900],
            contents: colors.blue[100],
            shadow: 'blue.600.15%',
        },
        red: {
            fill: colors.red[900],
            contents: colors.red[100],
            shadow: 'red.600.15%',
        },
        yellow: {
            fill: colors.yellow[900],
            contents: colors.yellow[100],
            shadow: 'yellow.600.15%',
        },
    },
    popover: {
        background: colors.black[830],
        shadow: 'blue.600.15%',
        color: colors.white,
    },
    dateDurationPicker: {
        background: colors.black[830],
        divider: colors.white,
        header: {
            background: colors.black[830],
            color: colors.white,
            hoverBackground: withAlpha(colors.white, 5),
        },
        panel: {
            default: {
                background: withAlpha(colors.white, 5),
                color: withAlpha(colors.white, 75),
                borderColor: withAlpha(colors.white, 10),
            },
            selected: {
                background: withAlpha(colors.blue[500], 35),
                color: colors.blue[400],
                borderColor: colors.blue[500],
            },
        },
        calendar: {
            day: {
                color: colors.white,
                dim: colors.black[600],
                hoverBackground: withAlpha(colors.white, 5),
            },
            picker: {
                color: colors.white,
                hoverBackground: withAlpha(colors.white, 5),
            },
            range: {
                default: withAlpha(colors.blue[500], 35),
                endpoint: colors.blue[500],
            },
            weekday: colors.black[600],
        },
        button: {
            color: colors.blue[400],
        },
    },
    dropdown: {
        background: colors.black[800],
        title: colors.black[200],
        divider: withAlpha(colors.white, 10),
        shadow: 'blue.600.15%',
        button: {
            background: withAlpha(colors.white, 5),
            color: colors.white,
        },
    },
    radiobox: {
        color: colors.black[200],
        icon: colors.black[700],
        selected: {
            background: colors.black[830],
            color: colors.blue[400],
        },
    },
    radio: {
        background: {
            normal: colors.black[600],
            selected: colors.black[900],
        },
        border: {
            normal: colors.black[700],
            selected: colors.blue[500],
        },
        text: colors.white,
    },
    check: {
        background: {
            normal: colors.black[600],
            selected: colors.blue[500],
        },
        border: {
            normal: colors.black[700],
            selected: colors.blue[500],
        },
        icon: colors.black[900],
        text: colors.white,
    },
    formtext: {
        text: {
            error: colors.red[500],
        },
    },
    timePicker: {
        background: colors.black[830],
        text: {
            selected: colors.white,
            unselected: withAlpha(colors.white, 50),
        },
        button: {
            selected: withAlpha(colors.white, 5),
        },
        shadow: 'blue.600.15%',
    },
    datePicker: {
        shadow: 'blue.600.15%',
        background: colors.black[830],
        month: colors.white,
        weekName: colors.black[600],
        days: {
            text: {
                normal: colors.white,
                notThisMonth: colors.black[600],
            },
            background: {
                selected: colors.blue[500],
                hover: withAlpha(colors.white, 5),
            },
        },
    },
    checkbox: {
        background: {
            normal: colors.black[600],
            checked: colors.blue[500],
        },
        border: {
            normal: colors.black[800],
            checked: colors.blue[500],
        },
        checkIcon: colors.black[900],
    },
}

export default darkTheme
