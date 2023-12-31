import { IconProps } from './type'

const EditorSortascendingIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.2929 20.2929C17.6834 19.9024 18.3166 19.9024 18.7071 20.2929L23 24.5858L27.2929 20.2929C27.6834 19.9024 28.3166 19.9024 28.7071 20.2929C29.0976 20.6834 29.0976 21.3166 28.7071 21.7071L23.7071 26.7071C23.3166 27.0976 22.6834 27.0976 22.2929 26.7071L17.2929 21.7071C16.9024 21.3166 16.9024 20.6834 17.2929 20.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 13C23.5523 13 24 13.4477 24 14V26C24 26.5523 23.5523 27 23 27C22.4477 27 22 26.5523 22 26V14C22 13.4477 22.4477 13 23 13Z"
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
                d="M5 8C5 7.44772 5.44772 7 6 7H23C23.5523 7 24 7.44772 24 8C24 8.55228 23.5523 9 23 9H6C5.44772 9 5 8.55228 5 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 24C5 23.4477 5.44772 23 6 23H13C13.5523 23 14 23.4477 14 24C14 24.5523 13.5523 25 13 25H6C5.44772 25 5 24.5523 5 24Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorSortascendingIcon
