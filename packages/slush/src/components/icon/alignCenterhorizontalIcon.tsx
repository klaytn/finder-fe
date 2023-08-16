import { IconProps } from './type'

const AlignCenterhorizontalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3C16.5523 3 17 3.44772 17 4V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V4C15 3.44772 15.4477 3 16 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 24C16.5523 24 17 24.4477 17 25V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V25C15 24.4477 15.4477 24 16 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 13C16.5523 13 17 13.4477 17 14V18C17 18.5523 16.5523 19 16 19C15.4477 19 15 18.5523 15 18V14C15 13.4477 15.4477 13 16 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 8C7 6.89543 7.89543 6 9 6H23C24.1046 6 25 6.89543 25 8V13C25 14.1046 24.1046 15 23 15H9C7.89543 15 7 14.1046 7 13V8ZM23 8H9V13H23V8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 19C4 17.8954 4.89543 17 6 17H26C27.1046 17 28 17.8954 28 19V24C28 25.1046 27.1046 26 26 26H6C4.89543 26 4 25.1046 4 24V19ZM26 19H6V24H26V19Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignCenterhorizontalIcon
