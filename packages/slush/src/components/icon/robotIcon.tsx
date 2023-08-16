import { IconProps } from './type'

const RobotIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 8C5.89543 8 5 8.89543 5 10V24C5 25.1046 5.89543 26 7 26H25C26.1046 26 27 25.1046 27 24V10C27 8.89543 26.1046 8 25 8H7ZM3 10C3 7.79086 4.79086 6 7 6H25C27.2091 6 29 7.79086 29 10V24C29 26.2091 27.2091 28 25 28H7C4.79086 28 3 26.2091 3 24V10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 19C10.6716 19 10 19.6716 10 20.5C10 21.3284 10.6716 22 11.5 22H20.5C21.3284 22 22 21.3284 22 20.5C22 19.6716 21.3284 19 20.5 19H11.5ZM8 20.5C8 18.567 9.567 17 11.5 17H20.5C22.433 17 24 18.567 24 20.5C24 22.433 22.433 24 20.5 24H11.5C9.567 24 8 22.433 8 20.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.5 17C19.0523 17 19.5 17.4477 19.5 18V23C19.5 23.5523 19.0523 24 18.5 24C17.9477 24 17.5 23.5523 17.5 23V18C17.5 17.4477 17.9477 17 18.5 17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 17C14.0523 17 14.5 17.4477 14.5 18V23C14.5 23.5523 14.0523 24 13.5 24C12.9477 24 12.5 23.5523 12.5 23V18C12.5 17.4477 12.9477 17 13.5 17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 1C16.5523 1 17 1.44772 17 2V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V2C15 1.44772 15.4477 1 16 1Z"
                fill={color}
            />
            <path
                d="M10.5 15C11.3284 15 12 14.3284 12 13.5C12 12.6716 11.3284 12 10.5 12C9.67157 12 9 12.6716 9 13.5C9 14.3284 9.67157 15 10.5 15Z"
                fill={color}
            />
            <path
                d="M21.5 15C22.3284 15 23 14.3284 23 13.5C23 12.6716 22.3284 12 21.5 12C20.6716 12 20 12.6716 20 13.5C20 14.3284 20.6716 15 21.5 15Z"
                fill={color}
            />
        </svg>
    )
}

export default RobotIcon
