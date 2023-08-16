import { IconProps } from './type'

const ArrowUprightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.7071 7.29289C25.0976 7.68342 25.0976 8.31658 24.7071 8.70711L8.70711 24.7071C8.31658 25.0976 7.68342 25.0976 7.29289 24.7071C6.90237 24.3166 6.90237 23.6834 7.29289 23.2929L23.2929 7.29289C23.6834 6.90237 24.3166 6.90237 24.7071 7.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 8C10 7.44772 10.4477 7 11 7H24C24.5523 7 25 7.44772 25 8V21C25 21.5523 24.5523 22 24 22C23.4477 22 23 21.5523 23 21V9H11C10.4477 9 10 8.55228 10 8Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowUprightIcon
