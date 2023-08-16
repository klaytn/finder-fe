import { IconProps } from './type'

const ArrowelbowLeftdownIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.29289 19.2929C3.68342 18.9024 4.31658 18.9024 4.70711 19.2929L10 24.5858L15.2929 19.2929C15.6834 18.9024 16.3166 18.9024 16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071L10.7071 26.7071C10.3166 27.0976 9.68342 27.0976 9.29289 26.7071L3.29289 20.7071C2.90237 20.3166 2.90237 19.6834 3.29289 19.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 8C9 7.44772 9.44772 7 10 7H28C28.5523 7 29 7.44772 29 8C29 8.55228 28.5523 9 28 9H11V26C11 26.5523 10.5523 27 10 27C9.44772 27 9 26.5523 9 26V8Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowLeftdownIcon
