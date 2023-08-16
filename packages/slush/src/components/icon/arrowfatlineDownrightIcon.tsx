import { IconProps } from './type'

const ArrowfatlineDownrightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.29289 10.2929C9.68342 9.90237 10.3166 9.90237 10.7071 10.2929L24.7071 24.2929C25.0976 24.6834 25.0976 25.3166 24.7071 25.7071C24.3166 26.0976 23.6834 26.0976 23.2929 25.7071L9.29289 11.7071C8.90237 11.3166 8.90237 10.6834 9.29289 10.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 11.5C24.5523 11.5 25 11.9477 25 12.5V25C25 25.5523 24.5523 26 24 26H11.5C10.9477 26 10.5 25.5523 10.5 25C10.5 24.4477 10.9477 24 11.5 24H23V12.5C23 11.9477 23.4477 11.5 24 11.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H27C27.5523 4 28 4.44772 28 5C28 5.55228 27.5523 6 27 6H5C4.44772 6 4 5.55228 4 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineDownrightIcon
