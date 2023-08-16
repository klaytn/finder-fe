import { IconProps } from './type'

const QueueIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 8C4 7.44772 4.44772 7 5 7H27C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9H5C4.44772 9 4 8.55228 4 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 16C4 15.4477 4.44772 15 5 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H5C4.44772 17 4 16.5523 4 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 24C4 23.4477 4.44772 23 5 23H17C17.5523 23 18 23.4477 18 24C18 24.5523 17.5523 25 17 25H5C4.44772 25 4 24.5523 4 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5152 14.1254C21.8332 13.9491 22.2217 13.9593 22.53 14.152L30.53 19.152C30.8224 19.3347 31 19.6552 31 20C31 20.3448 30.8224 20.6653 30.53 20.848L22.53 25.848C22.2217 26.0407 21.8332 26.0509 21.5152 25.8746C21.1973 25.6984 21 25.3635 21 25V15C21 14.6365 21.1973 14.3016 21.5152 14.1254ZM23 16.8042V23.1958L28.1132 20L23 16.8042Z"
                fill={color}
            />
        </svg>
    )
}

export default QueueIcon
