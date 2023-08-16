import { IconProps } from './type'

const ArrowfatlineTopIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16.5523 8 17 8.44772 17 9V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V9C15 8.44772 15.4477 8 16 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2929 8.29289C15.6834 7.90237 16.3166 7.90237 16.7071 8.29289L25.7071 17.2929C26.0976 17.6834 26.0976 18.3166 25.7071 18.7071C25.3166 19.0976 24.6834 19.0976 24.2929 18.7071L16 10.4142L7.70711 18.7071C7.31658 19.0976 6.68342 19.0976 6.29289 18.7071C5.90237 18.3166 5.90237 17.6834 6.29289 17.2929L15.2929 8.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H27C27.5523 4 28 4.44772 28 5C28 5.55228 27.5523 6 27 6H5C4.44772 6 4 5.55228 4 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineTopIcon
