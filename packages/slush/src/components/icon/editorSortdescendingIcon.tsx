import { IconProps } from './type'

const EditorSortdescendingIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2929 5.29289C22.6834 4.90237 23.3166 4.90237 23.7071 5.29289L28.7071 10.2929C29.0976 10.6834 29.0976 11.3166 28.7071 11.7071C28.3166 12.0976 27.6834 12.0976 27.2929 11.7071L23 7.41421L18.7071 11.7071C18.3166 12.0976 17.6834 12.0976 17.2929 11.7071C16.9024 11.3166 16.9024 10.6834 17.2929 10.2929L22.2929 5.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 5C23.5523 5 24 5.44772 24 6V18C24 18.5523 23.5523 19 23 19C22.4477 19 22 18.5523 22 18V6C22 5.44772 22.4477 5 23 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 16C5 15.4477 5.44772 15 6 15H15C15.5523 15 16 15.4477 16 16C16 16.5523 15.5523 17 15 17H6C5.44772 17 5 16.5523 5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 8C5 7.44772 5.44772 7 6 7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H6C5.44772 9 5 8.55228 5 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 24C5 23.4477 5.44772 23 6 23H23C23.5523 23 24 23.4477 24 24C24 24.5523 23.5523 25 23 25H6C5.44772 25 5 24.5523 5 24Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorSortdescendingIcon
