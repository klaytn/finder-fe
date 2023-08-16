import { IconProps } from './type'

const EditorTextoutdentIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M9.70711 6.29289C10.0976 6.68342 10.0976 7.31658 9.70711 7.70711L5.41421 12L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L8.29289 6.29289C8.68342 5.90237 9.31658 5.90237 9.70711 6.29289Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTextoutdentIcon
