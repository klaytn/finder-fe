import { IconProps } from './type'

const EditorTexthIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 6C7.55228 6 8 6.44772 8 7V25C8 25.5523 7.55228 26 7 26C6.44772 26 6 25.5523 6 25V7C6 6.44772 6.44772 6 7 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 16C6 15.4477 6.44772 15 7 15H25C25.5523 15 26 15.4477 26 16C26 16.5523 25.5523 17 25 17H7C6.44772 17 6 16.5523 6 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 6C25.5523 6 26 6.44772 26 7V25C26 25.5523 25.5523 26 25 26C24.4477 26 24 25.5523 24 25V7C24 6.44772 24.4477 6 25 6Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTexthIcon
