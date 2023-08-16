import { IconProps } from './type'

const CpuIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 12.5C11.5 11.9477 11.9477 11.5 12.5 11.5H19.5C20.0523 11.5 20.5 11.9477 20.5 12.5V19.5C20.5 20.0523 20.0523 20.5 19.5 20.5H12.5C11.9477 20.5 11.5 20.0523 11.5 19.5V12.5ZM13.5 13.5V18.5H18.5V13.5H13.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 7C5 5.89543 5.89543 5 7 5H25C26.1046 5 27 5.89543 27 7V25C27 26.1046 26.1046 27 25 27H7C5.89543 27 5 26.1046 5 25V7ZM25 7H7V25H25V7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 13C25 12.4477 25.4477 12 26 12H29C29.5523 12 30 12.4477 30 13C30 13.5523 29.5523 14 29 14H26C25.4477 14 25 13.5523 25 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 19C25 18.4477 25.4477 18 26 18H29C29.5523 18 30 18.4477 30 19C30 19.5523 29.5523 20 29 20H26C25.4477 20 25 19.5523 25 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 13C2 12.4477 2.44772 12 3 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H3C2.44772 14 2 13.5523 2 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 19C2 18.4477 2.44772 18 3 18H6C6.55228 18 7 18.4477 7 19C7 19.5523 6.55228 20 6 20H3C2.44772 20 2 19.5523 2 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 25C19.5523 25 20 25.4477 20 26V29C20 29.5523 19.5523 30 19 30C18.4477 30 18 29.5523 18 29V26C18 25.4477 18.4477 25 19 25Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 25C13.5523 25 14 25.4477 14 26V29C14 29.5523 13.5523 30 13 30C12.4477 30 12 29.5523 12 29V26C12 25.4477 12.4477 25 13 25Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 2C19.5523 2 20 2.44772 20 3V6C20 6.55228 19.5523 7 19 7C18.4477 7 18 6.55228 18 6V3C18 2.44772 18.4477 2 19 2Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 2C13.5523 2 14 2.44772 14 3V6C14 6.55228 13.5523 7 13 7C12.4477 7 12 6.55228 12 6V3C12 2.44772 12.4477 2 13 2Z"
                fill={color}
            />
        </svg>
    )
}

export default CpuIcon
