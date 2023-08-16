import { IconProps } from './type'

const TrendDownIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.29289 8.29289C2.68342 7.90237 3.31658 7.90237 3.70711 8.29289L12 16.5858L16.2929 12.2929C16.6834 11.9024 17.3166 11.9024 17.7071 12.2929L29.7071 24.2929C30.0976 24.6834 30.0976 25.3166 29.7071 25.7071C29.3166 26.0976 28.6834 26.0976 28.2929 25.7071L17 14.4142L12.7071 18.7071C12.3166 19.0976 11.6834 19.0976 11.2929 18.7071L2.29289 9.70711C1.90237 9.31658 1.90237 8.68342 2.29289 8.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29 16C29.5523 16 30 16.4477 30 17V25C30 25.5523 29.5523 26 29 26H21C20.4477 26 20 25.5523 20 25C20 24.4477 20.4477 24 21 24H28V17C28 16.4477 28.4477 16 29 16Z"
                fill={color}
            />
        </svg>
    )
}

export default TrendDownIcon
