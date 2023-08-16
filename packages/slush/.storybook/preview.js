import { SlushProvider, Theme } from '../src/themes/provider'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    backgrounds: {
        values: [
            {
                name: 'light',
                value: '#FFFFFF'
            },
            {
                name: 'dark',
                value: '#2A2730'
            },
        ],
    },
}

const bg = {
    '#2A2730': Theme.dark,
    '#FFFFFF': Theme.light,
}

export const decorators = [
    (Story, context) => {
        const backgroundColor = context.globals.backgrounds?.value
        const theme = backgroundColor === 'transparent' ? Theme.light : bg[backgroundColor] || Theme.light

        document.body.style.background = backgroundColor

        return (
            <SlushProvider theme={theme}>
                <Story />
            </SlushProvider>
        )
    },
]
