import { IconProps } from './type'

const WebcamIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C11.5817 5 8 8.58172 8 13C8 17.4183 11.5817 21 16 21C20.4183 21 24 17.4183 24 13C24 8.58172 20.4183 5 16 5ZM6 13C6 7.47715 10.4772 3 16 3C21.5228 3 26 7.47715 26 13C26 18.5228 21.5228 23 16 23C10.4772 23 6 18.5228 6 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10C14.3431 10 13 11.3431 13 13C13 14.6569 14.3431 16 16 16C17.6569 16 19 14.6569 19 13C19 11.3431 17.6569 10 16 10ZM11 13C11 10.2386 13.2386 8 16 8C18.7614 8 21 10.2386 21 13C21 15.7614 18.7614 18 16 18C13.2386 18 11 15.7614 11 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 21C16.5523 21 17 21.4477 17 22V26C17 26.5523 16.5523 27 16 27C15.4477 27 15 26.5523 15 26V22C15 21.4477 15.4477 21 16 21Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 26C3 25.4477 3.44772 25 4 25H28C28.5523 25 29 25.4477 29 26C29 26.5523 28.5523 27 28 27H4C3.44772 27 3 26.5523 3 26Z"
                fill={color}
            />
        </svg>
    )
}

export default WebcamIcon
