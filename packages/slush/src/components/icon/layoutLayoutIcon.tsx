import { IconProps } from './type'

const LayoutLayoutIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 12C13.5523 12 14 12.4477 14 13V26C14 26.5523 13.5523 27 13 27C12.4477 27 12 26.5523 12 26V13C12 12.4477 12.4477 12 13 12Z"
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
                d="M3 7C3 5.89543 3.89543 5 5 5H27C28.1046 5 29 5.89543 29 7V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V7ZM27 7H5V25H27V7Z"
                fill={color}
            />
        </svg>
    )
}

export default LayoutLayoutIcon
