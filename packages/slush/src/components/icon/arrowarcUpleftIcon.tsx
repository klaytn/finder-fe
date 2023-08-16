import { IconProps } from './type'

const ArrowarcUpleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7071 6.29289C11.0976 6.68342 11.0976 7.31658 10.7071 7.70711L5.41421 13L10.7071 18.2929C11.0976 18.6834 11.0976 19.3166 10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071L3.29289 13.7071C2.90237 13.3166 2.90237 12.6834 3.29289 12.2929L9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 13C3 12.4477 3.44772 12 4 12H16C19.4478 12 22.7544 13.3696 25.1924 15.8076C27.6304 18.2456 29 21.5522 29 25C29 25.5523 28.5523 26 28 26C27.4477 26 27 25.5523 27 25C27 22.0826 25.8411 19.2847 23.7782 17.2218C21.7153 15.1589 18.9174 14 16 14H4C3.44772 14 3 13.5523 3 13Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcUpleftIcon
