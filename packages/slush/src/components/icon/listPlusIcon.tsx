import { IconProps } from './type'

const ListPlusIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 24C4 23.4477 4.44772 23 5 23H18C18.5523 23 19 23.4477 19 24C19 24.5523 18.5523 25 18 25H5C4.44772 25 4 24.5523 4 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 24C22 23.4477 22.4477 23 23 23H29C29.5523 23 30 23.4477 30 24C30 24.5523 29.5523 25 29 25H23C22.4477 25 22 24.5523 22 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 20C26.5523 20 27 20.4477 27 21V27C27 27.5523 26.5523 28 26 28C25.4477 28 25 27.5523 25 27V21C25 20.4477 25.4477 20 26 20Z"
                fill={color}
            />
        </svg>
    )
}

export default ListPlusIcon
