import { IconProps } from './type'

const ChartlineUpIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4.55228 5 5 5.44772 5 6V25H28C28.5523 25 29 25.4477 29 26C29 26.5523 28.5523 27 28 27H4C3.44772 27 3 26.5523 3 26V6C3 5.44772 3.44772 5 4 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.7071 7.29289C27.0976 7.68342 27.0976 8.31658 26.7071 8.70711L16.7071 18.7071C16.3166 19.0976 15.6834 19.0976 15.2929 18.7071L12 15.4142L4.70711 22.7071C4.31658 23.0976 3.68342 23.0976 3.29289 22.7071C2.90237 22.3166 2.90237 21.6834 3.29289 21.2929L11.2929 13.2929C11.6834 12.9024 12.3166 12.9024 12.7071 13.2929L16 16.5858L25.2929 7.29289C25.6834 6.90237 26.3166 6.90237 26.7071 7.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 8C20 7.44772 20.4477 7 21 7H26C26.5523 7 27 7.44772 27 8V13C27 13.5523 26.5523 14 26 14C25.4477 14 25 13.5523 25 13V9H21C20.4477 9 20 8.55228 20 8Z"
                fill={color}
            />
        </svg>
    )
}

export default ChartlineUpIcon
