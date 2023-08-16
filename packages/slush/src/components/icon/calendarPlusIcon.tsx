import { IconProps } from './type'

const CalendarPlusIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M11.5 19C11.5 18.4477 11.9477 18 12.5 18H19.5C20.0523 18 20.5 18.4477 20.5 19C20.5 19.5523 20.0523 20 19.5 20H12.5C11.9477 20 11.5 19.5523 11.5 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 14.5C16.5523 14.5 17 14.9477 17 15.5V22.5C17 23.0523 16.5523 23.5 16 23.5C15.4477 23.5 15 23.0523 15 22.5V15.5C15 14.9477 15.4477 14.5 16 14.5Z"
                fill={color}
            />
        </svg>
    )
}

export default CalendarPlusIcon
