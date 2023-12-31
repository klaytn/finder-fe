import { IconProps } from './type'

const FileArrowdownIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M11.7929 18.7929C12.1834 18.4024 12.8166 18.4024 13.2071 18.7929L16 21.5858L18.7929 18.7929C19.1834 18.4024 19.8166 18.4024 20.2071 18.7929C20.5976 19.1834 20.5976 19.8166 20.2071 20.2071L16.7071 23.7071C16.3166 24.0976 15.6834 24.0976 15.2929 23.7071L11.7929 20.2071C11.4024 19.8166 11.4024 19.1834 11.7929 18.7929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 14C16.5523 14 17 14.4477 17 15V23C17 23.5523 16.5523 24 16 24C15.4477 24 15 23.5523 15 23V15C15 14.4477 15.4477 14 16 14Z"
                fill={color}
            />
        </svg>
    )
}

export default FileArrowdownIcon
