import { IconProps } from './type'

const ControllerPauseIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.5 6C18.5 4.89543 19.3954 4 20.5 4H25C26.1046 4 27 4.89543 27 6V26C27 27.1046 26.1046 28 25 28H20.5C19.3954 28 18.5 27.1046 18.5 26V6ZM25 6H20.5V26H25V6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 6C5 4.89543 5.89543 4 7 4H11.5C12.6046 4 13.5 4.89543 13.5 6V26C13.5 27.1046 12.6046 28 11.5 28H7C5.89543 28 5 27.1046 5 26V6ZM11.5 6H7V26H11.5V6Z"
                fill={color}
            />
        </svg>
    )
}

export default ControllerPauseIcon
