import { IconProps } from './type'

const AlignLeftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4C5.55228 4 6 4.44772 6 5V27C6 27.5523 5.55228 28 5 28C4.44772 28 4 27.5523 4 27V5C4 4.44772 4.44772 4 5 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 8C8 6.89543 8.89543 6 10 6H22C23.1046 6 24 6.89543 24 8V13C24 14.1046 23.1046 15 22 15H10C8.89543 15 8 14.1046 8 13V8ZM22 8H10V13H22V8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 19C8 17.8954 8.89543 17 10 17H27C28.1046 17 29 17.8954 29 19V24C29 25.1046 28.1046 26 27 26H10C8.89543 26 8 25.1046 8 24V19ZM27 19H10V24H27V19Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignLeftIcon
