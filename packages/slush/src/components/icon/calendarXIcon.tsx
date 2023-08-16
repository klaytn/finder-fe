import { IconProps } from './type'

const CalendarXIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M19.7071 15.2929C20.0976 15.6834 20.0976 16.3166 19.7071 16.7071L13.7071 22.7071C13.3166 23.0976 12.6834 23.0976 12.2929 22.7071C11.9024 22.3166 11.9024 21.6834 12.2929 21.2929L18.2929 15.2929C18.6834 14.9024 19.3166 14.9024 19.7071 15.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2929 15.2929C12.6834 14.9024 13.3166 14.9024 13.7071 15.2929L19.7071 21.2929C20.0976 21.6834 20.0976 22.3166 19.7071 22.7071C19.3166 23.0976 18.6834 23.0976 18.2929 22.7071L12.2929 16.7071C11.9024 16.3166 11.9024 15.6834 12.2929 15.2929Z"
                fill={color}
            />
        </svg>
    )
}

export default CalendarXIcon
