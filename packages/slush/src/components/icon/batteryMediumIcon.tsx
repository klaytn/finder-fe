import { IconProps } from './type'

const BatteryMediumIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31 11C31.5523 11 32 11.4477 32 12V20C32 20.5523 31.5523 21 31 21C30.4477 21 30 20.5523 30 20V12C30 11.4477 30.4477 11 31 11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 9C26 8.44772 25.5523 8 25 8L6 8C5.44772 8 5 8.44772 5 9V23C5 23.5523 5.44772 24 6 24H25C25.5523 24 26 23.5523 26 23V9ZM25 6C26.6569 6 28 7.34315 28 9V23C28 24.6569 26.6569 26 25 26H6C4.34315 26 3 24.6569 3 23V9C3 7.34315 4.34315 6 6 6L25 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2 10C13.7522 10 14.2 10.4477 14.2 11V21C14.2 21.5523 13.7522 22 13.2 22C12.6477 22 12.2 21.5523 12.2 21V11C12.2 10.4477 12.6477 10 13.2 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.59998 10C9.15226 10 9.59998 10.4477 9.59998 11V21C9.59998 21.5523 9.15226 22 8.59998 22C8.04769 22 7.59998 21.5523 7.59998 21V11C7.59998 10.4477 8.04769 10 8.59998 10Z"
                fill={color}
            />
        </svg>
    )
}

export default BatteryMediumIcon
