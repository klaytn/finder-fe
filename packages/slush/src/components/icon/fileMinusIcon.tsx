import { IconProps } from './type'

const FileMinusIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H19C19.2652 3 19.5196 3.10536 19.7071 3.29289L26.7071 10.2929C26.8946 10.4804 27 10.7348 27 11V27C27 27.5304 26.7893 28.0391 26.4142 28.4142C26.0391 28.7893 25.5304 29 25 29H7C6.46957 29 5.96086 28.7893 5.58579 28.4142C5.21071 28.0391 5 27.5304 5 27V5C5 4.46957 5.21071 3.96086 5.58579 3.58579ZM18.5858 5L7 5L7 27H25V11.4142L18.5858 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 3C19.5523 3 20 3.44772 20 4V10H26C26.5523 10 27 10.4477 27 11C27 11.5523 26.5523 12 26 12H19C18.4477 12 18 11.5523 18 11V4C18 3.44772 18.4477 3 19 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 19C12 18.4477 12.4477 18 13 18H19C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19Z"
                fill={color}
            />
        </svg>
    )
}

export default FileMinusIcon
