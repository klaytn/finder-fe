import { IconProps } from './type'

const ArrowfatlineLeftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16C8 15.4477 8.44772 15 9 15H28C28.5523 15 29 15.4477 29 16C29 16.5523 28.5523 17 28 17H9C8.44772 17 8 16.5523 8 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.7071 6.29289C19.0976 6.68342 19.0976 7.31658 18.7071 7.70711L10.4142 16L18.7071 24.2929C19.0976 24.6834 19.0976 25.3166 18.7071 25.7071C18.3166 26.0976 17.6834 26.0976 17.2929 25.7071L8.29289 16.7071C7.90237 16.3166 7.90237 15.6834 8.29289 15.2929L17.2929 6.29289C17.6834 5.90237 18.3166 5.90237 18.7071 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 4C5.55228 4 6 4.44772 6 5V27C6 27.5523 5.55228 28 5 28C4.44772 28 4 27.5523 4 27V5C4 4.44772 4.44772 4 5 4Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineLeftIcon
