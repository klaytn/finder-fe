import { IconProps } from './type'

const AlignColumnsIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 4C14.1046 4 15 4.89543 15 6L15 26C15 27.1046 14.1046 28 13 28H8C6.89543 28 6 27.1046 6 26L6 6C6 4.89543 6.89543 4 8 4H13ZM13 26L13 6H8L8 26H13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4C25.1046 4 26 4.89543 26 6V26C26 27.1046 25.1046 28 24 28H19C17.8954 28 17 27.1046 17 26V6C17 4.89543 17.8954 4 19 4H24ZM24 26V6H19V26H24Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignColumnsIcon
