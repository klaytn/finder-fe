import { IconProps } from './type'

const DeviceDesktopIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 23C26.5523 23 27 22.5523 27 22L27 8C27 7.44772 26.5523 7 26 7L6 7C5.44772 7 5 7.44772 5 8L5 22C5 22.5523 5.44772 23 6 23L26 23ZM29 22C29 23.6569 27.6569 25 26 25L6 25C4.34315 25 3 23.6569 3 22L3 8C3 6.34315 4.34315 5 6 5L26 5C27.6569 5 29 6.34315 29 8L29 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 28C11 27.4477 11.4477 27 12 27H20C20.5523 27 21 27.4477 21 28C21 28.5523 20.5523 29 20 29H12C11.4477 29 11 28.5523 11 28Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 19C3 18.4477 3.44772 18 4 18H28C28.5523 18 29 18.4477 29 19C29 19.5523 28.5523 20 28 20H4C3.44772 20 3 19.5523 3 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 23C16.5523 23 17 23.4477 17 24V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V24C15 23.4477 15.4477 23 16 23Z"
                fill={color}
            />
        </svg>
    )
}

export default DeviceDesktopIcon
