import { IconProps } from './type'

const CornerInIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 5C20.5523 5 21 5.44772 21 6V11H26C26.5523 11 27 11.4477 27 12C27 12.5523 26.5523 13 26 13H20C19.4477 13 19 12.5523 19 12V6C19 5.44772 19.4477 5 20 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 20C5 19.4477 5.44772 19 6 19H12C12.5523 19 13 19.4477 13 20V26C13 26.5523 12.5523 27 12 27C11.4477 27 11 26.5523 11 26V21H6C5.44772 21 5 20.5523 5 20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 20C19 19.4477 19.4477 19 20 19H26C26.5523 19 27 19.4477 27 20C27 20.5523 26.5523 21 26 21H21V26C21 26.5523 20.5523 27 20 27C19.4477 27 19 26.5523 19 26V20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 5C12.5523 5 13 5.44772 13 6V12C13 12.5523 12.5523 13 12 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5Z"
                fill={color}
            />
        </svg>
    )
}

export default CornerInIcon
