import { IconProps } from './type'

const FileDottedIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 22C6.55228 22 7 22.4477 7 23V27H9C9.55228 27 10 27.4477 10 28C10 28.5523 9.55228 29 9 29H7C6.46957 29 5.96086 28.7893 5.58579 28.4142C5.21071 28.0391 5 27.5304 5 27V23C5 22.4477 5.44772 22 6 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 4C14 3.44772 14.4477 3 15 3H19C19.2652 3 19.5196 3.10536 19.7071 3.29289L26.7071 10.2929C26.8946 10.4804 27 10.7348 27 11V17C27 17.5523 26.5523 18 26 18C25.4477 18 25 17.5523 25 17V11.4142L18.5858 5H15C14.4477 5 14 4.55228 14 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H10C10.5523 3 11 3.44772 11 4C11 4.55228 10.5523 5 10 5L7 5L7 8C7 8.55228 6.55228 9 6 9C5.44772 9 5 8.55228 5 8V5C5 4.46957 5.21071 3.96086 5.58579 3.58579Z"
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
                d="M26 21C26.5523 21 27 21.4477 27 22V27C27 27.5304 26.7893 28.0391 26.4142 28.4142C26.0391 28.7893 25.5304 29 25 29H24C23.4477 29 23 28.5523 23 28C23 27.4477 23.4477 27 24 27H25V22C25 21.4477 25.4477 21 26 21Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 12C6.55228 12 7 12.4477 7 13V18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18V13C5 12.4477 5.44772 12 6 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 28C13 27.4477 13.4477 27 14 27H19C19.5523 27 20 27.4477 20 28C20 28.5523 19.5523 29 19 29H14C13.4477 29 13 28.5523 13 28Z"
                fill={color}
            />
        </svg>
    )
}

export default FileDottedIcon
