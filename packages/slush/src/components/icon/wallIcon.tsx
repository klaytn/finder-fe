import { IconProps } from './type'

const WallIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C16.5523 6 17 6.44772 17 7V13C17 13.5523 16.5523 14 16 14C15.4477 14 15 13.5523 15 13V7C15 6.44772 15.4477 6 16 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 12C10.5523 12 11 12.4477 11 13V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V13C9 12.4477 9.44772 12 10 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22.5523 12 23 12.4477 23 13V19C23 19.5523 22.5523 20 22 20C21.4477 20 21 19.5523 21 19V13C21 12.4477 21.4477 12 22 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 18C16.5523 18 17 18.4477 17 19V25C17 25.5523 16.5523 26 16 26C15.4477 26 15 25.5523 15 25V19C15 18.4477 15.4477 18 16 18Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 13C3 12.4477 3.44772 12 4 12H28C28.5523 12 29 12.4477 29 13C29 13.5523 28.5523 14 28 14H4C3.44772 14 3 13.5523 3 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 19C3 18.4477 3.44772 18 4 18H28C28.5523 18 29 18.4477 29 19C29 19.5523 28.5523 20 28 20H4C3.44772 20 3 19.5523 3 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H28C28.5523 6 29 6.44772 29 7V25C29 25.5523 28.5523 26 28 26H4C3.44772 26 3 25.5523 3 25V7ZM5 8V24H27V8H5Z"
                fill={color}
            />
        </svg>
    )
}

export default WallIcon
