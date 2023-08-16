import { IconProps } from './type'

const DrawerIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 19C4 17.8954 4.89543 17 6 17H26C27.1046 17 28 17.8954 28 19V25C28 26.1046 27.1046 27 26 27H6C4.89543 27 4 26.1046 4 25V19ZM26 19H6V25H26V19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 7C4 5.89543 4.89543 5 6 5H26C27.1046 5 28 5.89543 28 7V13C28 14.1046 27.1046 15 26 15H6C4.89543 15 4 14.1046 4 13V7ZM26 7H6V13H26V7Z"
                fill={color}
            />
            <path
                d="M22.5 11.5C23.3284 11.5 24 10.8284 24 10C24 9.17157 23.3284 8.5 22.5 8.5C21.6716 8.5 21 9.17157 21 10C21 10.8284 21.6716 11.5 22.5 11.5Z"
                fill={color}
            />
            <path
                d="M22.5 23.5C23.3284 23.5 24 22.8284 24 22C24 21.1716 23.3284 20.5 22.5 20.5C21.6716 20.5 21 21.1716 21 22C21 22.8284 21.6716 23.5 22.5 23.5Z"
                fill={color}
            />
        </svg>
    )
}

export default DrawerIcon
