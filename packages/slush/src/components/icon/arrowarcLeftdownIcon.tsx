import { IconProps } from './type'

const ArrowarcLeftdownIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.29289 21.2929C6.68342 20.9024 7.31658 20.9024 7.70711 21.2929L13 26.5858L18.2929 21.2929C18.6834 20.9024 19.3166 20.9024 19.7071 21.2929C20.0976 21.6834 20.0976 22.3166 19.7071 22.7071L13.7071 28.7071C13.3166 29.0976 12.6834 29.0976 12.2929 28.7071L6.29289 22.7071C5.90237 22.3166 5.90237 21.6834 6.29289 21.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.8076 6.80761C18.2456 4.36964 21.5522 3 25 3C25.5523 3 26 3.44772 26 4C26 4.55228 25.5523 5 25 5C22.0826 5 19.2847 6.15893 17.2218 8.22183C15.1589 10.2847 14 13.0826 14 16V28C14 28.5523 13.5523 29 13 29C12.4477 29 12 28.5523 12 28V16C12 12.5522 13.3696 9.24558 15.8076 6.80761Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcLeftdownIcon
