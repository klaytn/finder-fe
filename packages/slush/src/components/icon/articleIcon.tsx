import { IconProps } from './type'

const ArticleIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M8.5 12C8.5 11.4477 8.94772 11 9.5 11H22.5C23.0523 11 23.5 11.4477 23.5 12C23.5 12.5523 23.0523 13 22.5 13H9.5C8.94772 13 8.5 12.5523 8.5 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 16C8.5 15.4477 8.94772 15 9.5 15H22.5C23.0523 15 23.5 15.4477 23.5 16C23.5 16.5523 23.0523 17 22.5 17H9.5C8.94772 17 8.5 16.5523 8.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 20C8.5 19.4477 8.94772 19 9.5 19H22.5C23.0523 19 23.5 19.4477 23.5 20C23.5 20.5523 23.0523 21 22.5 21H9.5C8.94772 21 8.5 20.5523 8.5 20Z"
                fill={color}
            />
        </svg>
    )
}

export default ArticleIcon
