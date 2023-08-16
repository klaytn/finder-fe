import { IconProps } from './type'

const DeviceTabletIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 6C25 5.44772 24.5523 5 24 5L8 5C7.44772 5 7 5.44772 7 6V26C7 26.5523 7.44772 27 8 27H24C24.5523 27 25 26.5523 25 26V6ZM24 3C25.6569 3 27 4.34315 27 6V26C27 27.6569 25.6569 29 24 29H8C6.34315 29 5 27.6569 5 26V6C5 4.34315 6.34315 3 8 3L24 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 8C5 7.44772 5.44772 7 6 7H26C26.5523 7 27 7.44772 27 8C27 8.55228 26.5523 9 26 9H6C5.44772 9 5 8.55228 5 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 24C5 23.4477 5.44772 23 6 23H26C26.5523 23 27 23.4477 27 24C27 24.5523 26.5523 25 26 25H6C5.44772 25 5 24.5523 5 24Z"
                fill={color}
            />
        </svg>
    )
}

export default DeviceTabletIcon
