import { IconProps } from './type'

const AlignRowsIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 19C4 17.8954 4.89543 17 6 17H26C27.1046 17 28 17.8954 28 19V24C28 25.1046 27.1046 26 26 26H6C4.89543 26 4 25.1046 4 24V19ZM26 19H6V24H26V19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 8C4 6.89543 4.89543 6 6 6H26C27.1046 6 28 6.89543 28 8V13C28 14.1046 27.1046 15 26 15H6C4.89543 15 4 14.1046 4 13V8ZM26 8H6V13H26V8Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignRowsIcon
