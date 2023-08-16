import { IconProps } from './type'

const ArrowDownrightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L24.7071 23.2929C25.0976 23.6834 25.0976 24.3166 24.7071 24.7071C24.3166 25.0976 23.6834 25.0976 23.2929 24.7071L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 10C24.5523 10 25 10.4477 25 11V24C25 24.5523 24.5523 25 24 25H11C10.4477 25 10 24.5523 10 24C10 23.4477 10.4477 23 11 23H23V11C23 10.4477 23.4477 10 24 10Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowDownrightIcon
