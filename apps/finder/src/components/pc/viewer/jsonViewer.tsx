import { useCallback, useEffect, useMemo, useRef } from 'react'
import ReactJson, { OnSelectProps } from 'react-json-view'

import { delay, Theme } from '@klaytn/slush'

import { useFinderTheme } from '../../../context/finderThemeProvider'
import { Viewer, ViewerButton, ViewerButtonDefaultKey } from './viewer'

const LINK_ITEM_CLASSNAME = 'json-viewer-link-item'

type JsonViewerProps<T extends Record<string, unknown> | Array<unknown>> = {
    data: T
    rootLabel?: string
    paddingLeft?: number
    onSelect?: (select: OnSelectProps) => void
    maxHeight?: number
    minHeight?: number
    buttons?: ViewerButton[]
    collapsed?: number
    linkValues?: string[]
    buttonRightMargin?: number
}

export function JsonViewer<T extends Record<string, unknown> | Array<unknown>>({
    data,
    rootLabel,
    paddingLeft = 38,
    onSelect,
    buttons,
    collapsed,
    linkValues,
    maxHeight = 300,
    minHeight = 100,
    buttonRightMargin,
}: JsonViewerProps<T>) {
    const {
        theme: { slush },
    } = useFinderTheme()

    const buttonsWithDefaults = useMemo(
        () => [
            ...(buttons || []),
            { key: ViewerButtonDefaultKey.Expand },
            { key: ViewerButtonDefaultKey.CopyToClipboard },
        ],
        [buttons],
    )
    const stringToCopy = useMemo(() => JSON.stringify(data, null, '  '), [data])

    const jsonViewerRef = useRef<HTMLDivElement>(null)

    const addLinkStyle = useCallback(() => {
        const elm = jsonViewerRef.current
        if (!linkValues || !elm) {
            return
        }

        const stringValues = Array.from(elm.querySelectorAll('span.string-value'))
        for (const stringValue of stringValues) {
            stringValue.classList.remove(LINK_ITEM_CLASSNAME)
            const value = stringValue.textContent?.replace?.(/"/g, '') || ''
            if (linkValues.includes(value)) {
                stringValue.classList.add(LINK_ITEM_CLASSNAME)
            }
        }
    }, [linkValues])

    const handleClick = useCallback(async () => {
        await delay(0)
        addLinkStyle()
    }, [addLinkStyle])

    useEffect(() => {
        addLinkStyle()
    }, [data, addLinkStyle])

    return (
        <Viewer
            ref={jsonViewerRef}
            buttons={buttonsWithDefaults}
            paddingLeft={paddingLeft}
            maxHeight={maxHeight}
            minHeight={minHeight}
            stringToCopy={stringToCopy}
            linkClassname={LINK_ITEM_CLASSNAME}
            onClick={handleClick}
            buttonRightMargin={buttonRightMargin}
        >
            <ReactJson
                name={rootLabel || false}
                src={data}
                theme={slush === Theme.dark ? 'brewer' : 'rjv-default'}
                style={{ background: 'none', position: 'relative' }}
                displayObjectSize={false}
                displayDataTypes={false}
                onSelect={onSelect}
                collapsed={collapsed}
                enableClipboard
            />
        </Viewer>
    )
}
