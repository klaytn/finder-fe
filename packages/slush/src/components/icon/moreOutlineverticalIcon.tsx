import { IconProps } from './type'

const MoreOutlineverticalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14ZM12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C14.8954 4 14 4.89543 14 6C14 7.10457 14.8954 8 16 8C17.1046 8 18 7.10457 18 6C18 4.89543 17.1046 4 16 4ZM12 6C12 3.79086 13.7909 2 16 2C18.2091 2 20 3.79086 20 6C20 8.20914 18.2091 10 16 10C13.7909 10 12 8.20914 12 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 24C14.8954 24 14 24.8954 14 26C14 27.1046 14.8954 28 16 28C17.1046 28 18 27.1046 18 26C18 24.8954 17.1046 24 16 24ZM12 26C12 23.7909 13.7909 22 16 22C18.2091 22 20 23.7909 20 26C20 28.2091 18.2091 30 16 30C13.7909 30 12 28.2091 12 26Z"
                fill={color}
            />
        </svg>
    )
}

export default MoreOutlineverticalIcon
