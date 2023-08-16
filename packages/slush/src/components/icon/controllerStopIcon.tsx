import { IconProps } from './type'

const ControllerStopIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 7.5V24.5H24.5V7.5H7.5ZM5.5 7.3625C5.5 6.33387 6.33387 5.5 7.3625 5.5H24.6375C25.6661 5.5 26.5 6.33387 26.5 7.3625V24.6375C26.5 25.6661 25.6661 26.5 24.6375 26.5H7.3625C6.33387 26.5 5.5 25.6661 5.5 24.6375V7.3625Z"
                fill={color}
            />
        </svg>
    )
}

export default ControllerStopIcon
