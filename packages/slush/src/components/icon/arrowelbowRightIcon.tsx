import { IconProps } from './type'

const ArrowelbowRightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 10C19 9.44772 19.4477 9 20 9H29C29.5523 9 30 9.44772 30 10V19C30 19.5523 29.5523 20 29 20C28.4477 20 28 19.5523 28 19V11H20C19.4477 11 19 10.5523 19 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.7071 9.29289C30.0976 9.68342 30.0976 10.3166 29.7071 10.7071L15.7071 24.7071C15.3166 25.0976 14.6834 25.0976 14.2929 24.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929C2.68342 10.9024 3.31658 10.9024 3.70711 11.2929L15 22.5858L28.2929 9.29289C28.6834 8.90237 29.3166 8.90237 29.7071 9.29289Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowRightIcon
