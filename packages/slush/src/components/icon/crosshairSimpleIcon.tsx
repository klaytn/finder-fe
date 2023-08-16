import { IconProps } from './type'

const CrosshairSimpleIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5.5C10.201 5.5 5.5 10.201 5.5 16C5.5 21.799 10.201 26.5 16 26.5C21.799 26.5 26.5 21.799 26.5 16C26.5 10.201 21.799 5.5 16 5.5ZM3.5 16C3.5 9.09644 9.09644 3.5 16 3.5C22.9036 3.5 28.5 9.09644 28.5 16C28.5 22.9036 22.9036 28.5 16 28.5C9.09644 28.5 3.5 22.9036 3.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3.5C16.5523 3.5 17 3.94772 17 4.5V9.5C17 10.0523 16.5523 10.5 16 10.5C15.4477 10.5 15 10.0523 15 9.5V4.5C15 3.94772 15.4477 3.5 16 3.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5 16C3.5 15.4477 3.94772 15 4.5 15H9.5C10.0523 15 10.5 15.4477 10.5 16C10.5 16.5523 10.0523 17 9.5 17H4.5C3.94772 17 3.5 16.5523 3.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 21.5C16.5523 21.5 17 21.9477 17 22.5V27.5C17 28.0523 16.5523 28.5 16 28.5C15.4477 28.5 15 28.0523 15 27.5V22.5C15 21.9477 15.4477 21.5 16 21.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5 16C21.5 15.4477 21.9477 15 22.5 15H27.5C28.0523 15 28.5 15.4477 28.5 16C28.5 16.5523 28.0523 17 27.5 17H22.5C21.9477 17 21.5 16.5523 21.5 16Z"
                fill={color}
            />
        </svg>
    )
}

export default CrosshairSimpleIcon
