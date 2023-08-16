import { IconProps } from './type'

const CalendarCheckIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V6ZM26 6H6V26H26V6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 2C22.5523 2 23 2.44772 23 3V7C23 7.55228 22.5523 8 22 8C21.4477 8 21 7.55228 21 7V3C21 2.44772 21.4477 2 22 2Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2C10.5523 2 11 2.44772 11 3V7C11 7.55228 10.5523 8 10 8C9.44772 8 9 7.55228 9 7V3C9 2.44772 9.44772 2 10 2Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 11C4 10.4477 4.44772 10 5 10H27C27.5523 10 28 10.4477 28 11C28 11.5523 27.5523 12 27 12H5C4.44772 12 4 11.5523 4 11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2278 15.3142C21.6066 15.7162 21.5877 16.3491 21.1858 16.7278L15.3483 22.2278C14.9621 22.5916 14.3592 22.5906 13.9743 22.2255L10.8118 19.2255C10.4111 18.8454 10.3944 18.2125 10.7745 17.8118C11.1546 17.4111 11.7875 17.3944 12.1882 17.7745L14.6648 20.1239L19.8142 15.2722C20.2162 14.8934 20.8491 14.9123 21.2278 15.3142Z"
                fill={color}
            />
        </svg>
    )
}

export default CalendarCheckIcon
