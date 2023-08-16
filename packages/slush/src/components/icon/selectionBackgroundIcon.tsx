import { IconProps } from './type'

const SelectionBackgroundIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 12C4 10.8954 4.89543 10 6 10H20C21.1046 10 22 10.8954 22 12V26C22 27.1046 21.1046 28 20 28H6C4.89543 28 4 27.1046 4 26V12ZM20 12H6V26H20V12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 5C17 4.44772 17.4477 4 18 4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H18C17.4477 6 17 5.55228 17 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 5C24 4.44772 24.4477 4 25 4H26C26.5304 4 27.0391 4.21071 27.4142 4.58579C27.7893 4.96086 28 5.46957 28 6V7C28 7.55228 27.5523 8 27 8C26.4477 8 26 7.55228 26 7L26 6L25 6C24.4477 6 24 5.55228 24 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 11C27.5523 11 28 11.4477 28 12V14C28 14.5523 27.5523 15 27 15C26.4477 15 26 14.5523 26 14V12C26 11.4477 26.4477 11 27 11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 18C27.5523 18 28 18.4477 28 19V20C28 20.5304 27.7893 21.0391 27.4142 21.4142C27.0391 21.7893 26.5304 22 26 22H25C24.4477 22 24 21.5523 24 21C24 20.4477 24.4477 20 25 20H26V19C26 18.4477 26.4477 18 27 18Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4H13C13.5523 4 14 4.44772 14 5C14 5.55228 13.5523 6 13 6L12 6L12 7C12 7.55228 11.5523 8 11 8C10.4477 8 10 7.55228 10 7V6C10 5.46957 10.2107 4.96086 10.5858 4.58579Z"
                fill={color}
            />
        </svg>
    )
}

export default SelectionBackgroundIcon
