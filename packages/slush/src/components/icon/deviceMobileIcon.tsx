import { IconProps } from './type'

const DeviceMobileIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 4C9.44772 4 9 4.44772 9 5V27C9 27.5523 9.44772 28 10 28H22C22.5523 28 23 27.5523 23 27V5C23 4.44772 22.5523 4 22 4H10ZM7 5C7 3.34315 8.34315 2 10 2H22C23.6569 2 25 3.34315 25 5V27C25 28.6569 23.6569 30 22 30H10C8.34315 30 7 28.6569 7 27V5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 7C7 6.44772 7.44772 6 8 6H24C24.5523 6 25 6.44772 25 7C25 7.55228 24.5523 8 24 8H8C7.44772 8 7 7.55228 7 7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 25C7 24.4477 7.44772 24 8 24H24C24.5523 24 25 24.4477 25 25C25 25.5523 24.5523 26 24 26H8C7.44772 26 7 25.5523 7 25Z"
                fill={color}
            />
        </svg>
    )
}

export default DeviceMobileIcon
