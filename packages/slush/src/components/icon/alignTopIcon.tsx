import { IconProps } from './type'

const AlignTopIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H27C27.5523 4 28 4.44772 28 5C28 5.55228 27.5523 6 27 6H5C4.44772 6 4 5.55228 4 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 8C25.1046 8 26 8.89543 26 10V22C26 23.1046 25.1046 24 24 24H19C17.8954 24 17 23.1046 17 22V10C17 8.89543 17.8954 8 19 8H24ZM24 22V10H19V22H24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 10C6 8.89543 6.89543 8 8 8H13C14.1046 8 15 8.89543 15 10V27C15 28.1046 14.1046 29 13 29H8C6.89543 29 6 28.1046 6 27V10ZM13 10H8V27H13V10Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignTopIcon
