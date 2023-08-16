import { IconProps } from './type'

const BatteryWarningIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5 10C16.0523 10 16.5 10.4477 16.5 11V16C16.5 16.5523 16.0523 17 15.5 17C14.9477 17 14.5 16.5523 14.5 16V11C14.5 10.4477 14.9477 10 15.5 10Z"
                fill={color}
            />
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
                d="M15.5 22C16.3284 22 17 21.3284 17 20.5C17 19.6716 16.3284 19 15.5 19C14.6716 19 14 19.6716 14 20.5C14 21.3284 14.6716 22 15.5 22Z"
                fill={color}
            />
        </svg>
    )
}

export default BatteryWarningIcon
