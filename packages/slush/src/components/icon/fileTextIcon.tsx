import { IconProps } from './type'

const FileTextIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M11 17C11 16.4477 11.4477 16 12 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H12C11.4477 18 11 17.5523 11 17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 21C11 20.4477 11.4477 20 12 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H12C11.4477 22 11 21.5523 11 21Z"
                fill={color}
            />
        </svg>
    )
}

export default FileTextIcon
