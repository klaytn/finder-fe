import { IconProps } from './type'

const ArrowfatlineRightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 15.4477 3.44772 15 4 15H23C23.5523 15 24 15.4477 24 16C24 16.5523 23.5523 17 23 17H4C3.44772 17 3 16.5523 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2929 6.29289C13.6834 5.90237 14.3166 5.90237 14.7071 6.29289L23.7071 15.2929C24.0976 15.6834 24.0976 16.3166 23.7071 16.7071L14.7071 25.7071C14.3166 26.0976 13.6834 26.0976 13.2929 25.7071C12.9024 25.3166 12.9024 24.6834 13.2929 24.2929L21.5858 16L13.2929 7.70711C12.9024 7.31658 12.9024 6.68342 13.2929 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 4C27.5523 4 28 4.44772 28 5V27C28 27.5523 27.5523 28 27 28C26.4477 28 26 27.5523 26 27V5C26 4.44772 26.4477 4 27 4Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineRightIcon
