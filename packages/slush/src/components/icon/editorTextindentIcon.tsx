import { IconProps } from './type'

const EditorTextindentIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 16C13 15.4477 13.4477 15 14 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H14C13.4477 17 13 16.5523 13 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 8C13 7.44772 13.4477 7 14 7H27C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9H14C13.4477 9 13 8.55228 13 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 24C4 23.4477 4.44772 23 5 23H27C27.5523 23 28 23.4477 28 24C28 24.5523 27.5523 25 27 25H5C4.44772 25 4 24.5523 4 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.29289 6.29289C4.68342 5.90237 5.31658 5.90237 5.70711 6.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L5.70711 17.7071C5.31658 18.0976 4.68342 18.0976 4.29289 17.7071C3.90237 17.3166 3.90237 16.6834 4.29289 16.2929L8.58579 12L4.29289 7.70711C3.90237 7.31658 3.90237 6.68342 4.29289 6.29289Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTextindentIcon
