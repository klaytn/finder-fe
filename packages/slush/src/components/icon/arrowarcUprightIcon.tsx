import { IconProps } from './type'

const ArrowarcUprightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2929 6.29289C21.6834 5.90237 22.3166 5.90237 22.7071 6.29289L28.7071 12.2929C29.0976 12.6834 29.0976 13.3166 28.7071 13.7071L22.7071 19.7071C22.3166 20.0976 21.6834 20.0976 21.2929 19.7071C20.9024 19.3166 20.9024 18.6834 21.2929 18.2929L26.5858 13L21.2929 7.70711C20.9024 7.31658 20.9024 6.68342 21.2929 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 14C13.0826 14 10.2847 15.1589 8.22183 17.2218C6.15893 19.2847 5 22.0826 5 25C5 25.5523 4.55228 26 4 26C3.44772 26 3 25.5523 3 25C3 21.5522 4.36964 18.2456 6.80761 15.8076C9.24558 13.3696 12.5522 12 16 12H28C28.5523 12 29 12.4477 29 13C29 13.5523 28.5523 14 28 14H16Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcUprightIcon
