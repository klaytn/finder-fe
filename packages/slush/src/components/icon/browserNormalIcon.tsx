import { IconProps } from './type'

const BrowserNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 5.89543 3.89543 5 5 5H27C28.1046 5 29 5.89543 29 7V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V7ZM27 7H5V25H27V7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12C3 11.4477 3.44772 11 4 11H28C28.5523 11 29 11.4477 29 12C29 12.5523 28.5523 13 28 13H4C3.44772 13 3 12.5523 3 12Z"
                fill={color}
            />
        </svg>
    )
}

export default BrowserNormalIcon
