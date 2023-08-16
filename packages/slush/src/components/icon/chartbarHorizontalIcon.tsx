import { IconProps } from './type'

const ChartbarHorizontalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4C5.55228 4 6 4.44772 6 5V27C6 27.5523 5.55228 28 5 28C4.44772 28 4 27.5523 4 27V5C4 4.44772 4.44772 4 5 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 7C4 6.44772 4.44772 6 5 6H21C21.5523 6 22 6.44772 22 7V13C22 13.5523 21.5523 14 21 14C20.4477 14 20 13.5523 20 13V8H5C4.44772 8 4 7.55228 4 7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 13C4 12.4477 4.44772 12 5 12H27C27.5523 12 28 12.4477 28 13V19C28 19.5523 27.5523 20 27 20H5C4.44772 20 4 19.5523 4 19V13ZM6 14V18H26V14H6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 18C17.5523 18 18 18.4477 18 19V25C18 25.5523 17.5523 26 17 26H5C4.44772 26 4 25.5523 4 25C4 24.4477 4.44772 24 5 24H16V19C16 18.4477 16.4477 18 17 18Z"
                fill={color}
            />
        </svg>
    )
}

export default ChartbarHorizontalIcon
