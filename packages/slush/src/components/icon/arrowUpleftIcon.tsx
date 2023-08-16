import { IconProps } from './type'

const ArrowUpleftIcon = ({ size, color = '#19171C' }: IconProps) => {
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
                d="M7 8C7 7.44772 7.44772 7 8 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H9V21C9 21.5523 8.55228 22 8 22C7.44772 22 7 21.5523 7 21V8Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowUpleftIcon
