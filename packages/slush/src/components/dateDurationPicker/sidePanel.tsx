import styled from 'styled-components'

import { Flex } from '../box'
import OptionPanel from './optionPanel'
import { CustomDateButton } from './panelButtons'

import type { DateDurationPickerDirection, DateDurationPickerProps, OptionPanelType } from './dateDurationPicker'

type SidePanelProps = Required<Pick<DateDurationPickerProps, 'optionPanels' | 'disableCustomDateButton'>> & {
    showDateDurationPicker: boolean
    onSelect(optionPanel: OptionPanelType): void
    selectedPanel: OptionPanelType | null
    onClickCustomDate(): void
    direction: DateDurationPickerDirection
}

const SidePanel = ({
    optionPanels,
    showDateDurationPicker,
    disableCustomDateButton,
    onSelect,
    selectedPanel,
    onClickCustomDate,
    direction,
}: SidePanelProps) => {
    return (
        <PanelContainer>
            {optionPanels.length > 0 && (
                <OptionPanelContainer
                    justifyContent="space-evenly"
                    direction="row"
                    dateDurationPickerDirection={direction}
                >
                    {optionPanels.map((optionPanel, index) => (
                        <OptionPanel
                            key={`${optionPanel.text}-${index}`}
                            text={optionPanel.text}
                            onSelect={() => onSelect(optionPanel)}
                            selected={optionPanel.text === selectedPanel?.text}
                        />
                    ))}
                </OptionPanelContainer>
            )}
            {!disableCustomDateButton && (
                <CustomDateButton
                    dateDurationPickerDirection={direction}
                    onClick={onClickCustomDate}
                    showDateDurationPicker={showDateDurationPicker}
                />
            )}
        </PanelContainer>
    )
}

const PanelContainer = styled.div`
    position: relative;
    margin-right: 0;
    transition: all 0.2s ease-in-out;
    padding-bottom: 0;
`

const OptionPanelContainer = styled(Flex)<{ dateDurationPickerDirection: DateDurationPickerDirection }>`
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: ${({ dateDurationPickerDirection }) => (dateDurationPickerDirection === 'horizontal' ? 20 : 28)}px;
`

export default SidePanel
