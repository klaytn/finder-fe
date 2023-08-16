import { IconProps } from './type'

const ArrowarcLeftupIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2929 3.29289C12.6834 2.90237 13.3166 2.90237 13.7071 3.29289L19.7071 9.29289C20.0976 9.68342 20.0976 10.3166 19.7071 10.7071C19.3166 11.0976 18.6834 11.0976 18.2929 10.7071L13 5.41421L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289L12.2929 3.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 3C13.5523 3 14 3.44772 14 4V16C14 18.9174 15.1589 21.7153 17.2218 23.7782C19.2847 25.8411 22.0826 27 25 27C25.5523 27 26 27.4477 26 28C26 28.5523 25.5523 29 25 29C21.5522 29 18.2456 27.6304 15.8076 25.1924C13.3696 22.7544 12 19.4478 12 16V4C12 3.44772 12.4477 3 13 3Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcLeftupIcon
