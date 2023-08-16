import { useTheme } from '../../themes/provider'
import { ChevronBottomIcon, ChevronTopIcon } from '../icon'

function getIconType(showDateDurationPicker: boolean) {
    if (showDateDurationPicker) {
        return ChevronTopIcon
    } else {
        return ChevronBottomIcon
    }
}

function ButtonArrow({ showDateDurationPicker }: { showDateDurationPicker: boolean }) {
    const TargetIcon = getIconType(showDateDurationPicker)

    const {
        dateDurationPicker: {
            button: { color },
        },
    } = useTheme()

    return <TargetIcon color={color} size={16} />
}

export default ButtonArrow
