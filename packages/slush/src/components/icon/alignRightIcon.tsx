import { IconProps } from './type'

const AlignRightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 4C27.5523 4 28 4.44772 28 5V27C28 27.5523 27.5523 28 27 28C26.4477 28 26 27.5523 26 27V5C26 4.44772 26.4477 4 27 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 13C24 14.1046 23.1046 15 22 15L10 15C8.89543 15 8 14.1046 8 13V8C8 6.89543 8.89543 6 10 6L22 6C23.1046 6 24 6.89543 24 8V13ZM10 13L22 13V8L10 8V13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 19C3 17.8954 3.89543 17 5 17H22C23.1046 17 24 17.8954 24 19V24C24 25.1046 23.1046 26 22 26H5C3.89543 26 3 25.1046 3 24V19ZM22 19H5V24H22V19Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignRightIcon
