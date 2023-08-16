import { useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Theme } from '@klaytn/slush'

import { useFinderTheme } from '../../../context/finderThemeProvider'
import { Viewer, ViewerButtonDefaultKey } from './viewer'

const DEFAULT_BUTTONS = [{ key: ViewerButtonDefaultKey.Expand }, { key: ViewerButtonDefaultKey.CopyToClipboard }]

const LINE_BREAK_PROPS = { style: { wordBreak: 'break-all' } } as const

type CodeViewerProps = {
    code: string
    language: 'text' | 'solidity'
    lineBreak?: boolean
    paddingLeft?: number
    wrapLongLines?: boolean
    showLineNumbers?: boolean
}

export function CodeViewer({ code, paddingLeft, lineBreak = false, ...restProps }: CodeViewerProps) {
    const {
        theme: { slush },
    } = useFinderTheme()

    const syntaxHighlightTheme = slush === Theme.dark ? darcula : materialLight
    const lineProps = useMemo(() => (lineBreak ? LINE_BREAK_PROPS : undefined), [lineBreak])

    return (
        <Viewer buttons={DEFAULT_BUTTONS} paddingLeft={paddingLeft} maxHeight={300} minHeight={100} stringToCopy={code}>
            <SyntaxHighlighter style={syntaxHighlightTheme} lineProps={lineProps} {...restProps}>
                {code}
            </SyntaxHighlighter>
        </Viewer>
    )
}
