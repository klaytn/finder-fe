import { IconProps } from './type'

const ChartpieNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3C16.5523 3 17 3.44772 17 4V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16V4C15 3.44772 15.4477 3 16 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.2534 9.49999C27.5296 9.97823 27.3659 10.5899 26.8876 10.8661L6.11264 22.8661C5.63441 23.1423 5.02278 22.9786 4.74655 22.5003C4.47031 22.0221 4.63406 21.4105 5.1123 21.1342L25.8873 9.13424C26.3655 8.858 26.9772 9.02176 27.2534 9.49999Z"
                fill={color}
            />
        </svg>
    )
}

export default ChartpieNormalIcon
