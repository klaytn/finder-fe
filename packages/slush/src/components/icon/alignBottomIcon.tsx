import { IconProps } from './type'

const AlignBottomIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 27C4 26.4477 4.44772 26 5 26H27C27.5523 26 28 26.4477 28 27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 24C17.8954 24 17 23.1046 17 22V10C17 8.89543 17.8954 8 19 8H24C25.1046 8 26 8.89543 26 10V22C26 23.1046 25.1046 24 24 24H19ZM19 10V22H24V10H19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 5C6 3.89543 6.89543 3 8 3H13C14.1046 3 15 3.89543 15 5V22C15 23.1046 14.1046 24 13 24H8C6.89543 24 6 23.1046 6 22V5ZM13 5H8V22H13V5Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignBottomIcon
