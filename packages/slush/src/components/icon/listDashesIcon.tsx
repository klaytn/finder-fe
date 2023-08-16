import { IconProps } from './type'

const ListDashesIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 8C11 7.44772 11.4477 7 12 7H27C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9H12C11.4477 9 11 8.55228 11 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 16C11 15.4477 11.4477 15 12 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H12C11.4477 17 11 16.5523 11 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 24C11 23.4477 11.4477 23 12 23H27C27.5523 23 28 23.4477 28 24C28 24.5523 27.5523 25 27 25H12C11.4477 25 11 24.5523 11 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 8C4 7.44772 4.44772 7 5 7H7C7.55228 7 8 7.44772 8 8C8 8.55228 7.55228 9 7 9H5C4.44772 9 4 8.55228 4 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 16C4 15.4477 4.44772 15 5 15H7C7.55228 15 8 15.4477 8 16C8 16.5523 7.55228 17 7 17H5C4.44772 17 4 16.5523 4 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 24C4 23.4477 4.44772 23 5 23H7C7.55228 23 8 23.4477 8 24C8 24.5523 7.55228 25 7 25H5C4.44772 25 4 24.5523 4 24Z"
                fill={color}
            />
        </svg>
    )
}

export default ListDashesIcon
