import { IconProps } from './type'

const ArrowelbowLeftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 10C2 9.44772 2.44772 9 3 9H12C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11H4V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.29289 9.29289C2.68342 8.90237 3.31658 8.90237 3.70711 9.29289L17 22.5858L28.2929 11.2929C28.6834 10.9024 29.3166 10.9024 29.7071 11.2929C30.0976 11.6834 30.0976 12.3166 29.7071 12.7071L17.7071 24.7071C17.3166 25.0976 16.6834 25.0976 16.2929 24.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowLeftIcon
