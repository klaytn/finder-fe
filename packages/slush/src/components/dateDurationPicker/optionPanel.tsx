import styled, { css, useTheme } from 'styled-components'

import { typos } from '../../styles/typos'

type PanelProps = {
    text: string
    onSelect(): void
    selected?: boolean
}

function OptionPanel({ text, onSelect, selected = false }: PanelProps) {
    const theme = useTheme()
    return (
        <Container theme={theme} onClick={onSelect} selected={selected}>
            {text}
        </Container>
    )
}

const Container = styled.pre<{ selected: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    width: fit-content;
    margin: 0 0 8px;
    cursor: pointer;

    ${({ selected }) => {
        return selected
            ? css`
                  color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.panel.selected.color};
                  background: ${({ theme: { dateDurationPicker: datepicker } }) =>
                      datepicker.panel.selected.background};
                  border: 1px solid
                      ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.panel.selected.borderColor};
              `
            : css`
                  color: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.panel.default.color};
                  background: ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.panel.default.background};
                  border: 1px solid
                      ${({ theme: { dateDurationPicker: datepicker } }) => datepicker.panel.default.borderColor};
              `
    }}
    border-radius: 99px;
    ${typos.suit['12.16_400']}
`

export default OptionPanel
