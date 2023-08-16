import { IconProps } from './type'

const AlignCenterverticalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 16C24 15.4477 24.4477 15 25 15H28C28.5523 15 29 15.4477 29 16C29 16.5523 28.5523 17 28 17H25C24.4477 17 24 16.5523 24 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 15.4477 3.44772 15 4 15H7C7.55228 15 8 15.4477 8 16C8 16.5523 7.55228 17 7 17H4C3.44772 17 3 16.5523 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 16C13 15.4477 13.4477 15 14 15H18C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17H14C13.4477 17 13 16.5523 13 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 7C25.1046 7 26 7.89543 26 9V23C26 24.1046 25.1046 25 24 25H19C17.8954 25 17 24.1046 17 23V9C17 7.89543 17.8954 7 19 7H24ZM24 23V9H19V23H24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 6C6 4.89543 6.89543 4 8 4H13C14.1046 4 15 4.89543 15 6V26C15 27.1046 14.1046 28 13 28H8C6.89543 28 6 27.1046 6 26V6ZM13 6H8V26H13V6Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignCenterverticalIcon
