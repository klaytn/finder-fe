import { IconProps } from './type'

const EditorTexttIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C16.5523 6 17 6.44772 17 7V25C17 25.5523 16.5523 26 16 26C15.4477 26 15 25.5523 15 25V7C15 6.44772 15.4477 6 16 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 7C5 6.44772 5.44772 6 6 6H26C26.5523 6 27 6.44772 27 7V11C27 11.5523 26.5523 12 26 12C25.4477 12 25 11.5523 25 11V8H7V11C7 11.5523 6.55228 12 6 12C5.44772 12 5 11.5523 5 11V7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 25C11 24.4477 11.4477 24 12 24H20C20.5523 24 21 24.4477 21 25C21 25.5523 20.5523 26 20 26H12C11.4477 26 11 25.5523 11 25Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTexttIcon
