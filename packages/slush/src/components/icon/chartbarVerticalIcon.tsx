import { IconProps } from './type'

const ChartbarVerticalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 17C4.5 16.4477 4.94772 16 5.5 16H12.5C13.0523 16 13.5 16.4477 13.5 17C13.5 17.5523 13.0523 18 12.5 18H6.5V26C6.5 26.5523 6.05228 27 5.5 27C4.94772 27 4.5 26.5523 4.5 26V17Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 26C2.5 25.4477 2.94772 25 3.5 25H28.5C29.0523 25 29.5 25.4477 29.5 26C29.5 26.5523 29.0523 27 28.5 27H3.5C2.94772 27 2.5 26.5523 2.5 26Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 11C11.5 10.4477 11.9477 10 12.5 10H19.5C20.0523 10 20.5 10.4477 20.5 11C20.5 11.5523 20.0523 12 19.5 12H13.5V26C13.5 26.5523 13.0523 27 12.5 27C11.9477 27 11.5 26.5523 11.5 26V11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.5 5C18.5 4.44772 18.9477 4 19.5 4H26.5C27.0523 4 27.5 4.44772 27.5 5V26C27.5 26.5523 27.0523 27 26.5 27H19.5C18.9477 27 18.5 26.5523 18.5 26V5ZM20.5 6V25H25.5V6H20.5Z"
                fill={color}
            />
        </svg>
    )
}

export default ChartbarVerticalIcon
