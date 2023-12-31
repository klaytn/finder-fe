import { IconProps } from './type'

const AlignGridfourIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 6.5C4.5 5.39543 5.39543 4.5 6.5 4.5H25.5C26.6046 4.5 27.5 5.39543 27.5 6.5V25.5C27.5 26.6046 26.6046 27.5 25.5 27.5H6.5C5.39543 27.5 4.5 26.6046 4.5 25.5V6.5ZM25.5 6.5H6.5V25.5H25.5V6.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4.5C16.5523 4.5 17 4.94772 17 5.5V26.5C17 27.0523 16.5523 27.5 16 27.5C15.4477 27.5 15 27.0523 15 26.5V5.5C15 4.94772 15.4477 4.5 16 4.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 16C4.5 15.4477 4.94772 15 5.5 15H26.5C27.0523 15 27.5 15.4477 27.5 16C27.5 16.5523 27.0523 17 26.5 17H5.5C4.94772 17 4.5 16.5523 4.5 16Z"
                fill={color}
            />
        </svg>
    )
}

export default AlignGridfourIcon
