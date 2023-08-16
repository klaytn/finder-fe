import { IconProps } from './type'

const ArrowfatlineUpleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.29289 6.29289C7.68342 5.90237 8.31658 5.90237 8.70711 6.29289L22.7071 20.2929C23.0976 20.6834 23.0976 21.3166 22.7071 21.7071C22.3166 22.0976 21.6834 22.0976 21.2929 21.7071L7.29289 7.70711C6.90237 7.31658 6.90237 6.68342 7.29289 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 7C7 6.44772 7.44772 6 8 6H20.5C21.0523 6 21.5 6.44772 21.5 7C21.5 7.55228 21.0523 8 20.5 8H9V19.5C9 20.0523 8.55228 20.5 8 20.5C7.44772 20.5 7 20.0523 7 19.5V7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 27C4 26.4477 4.44772 26 5 26H27C27.5523 26 28 26.4477 28 27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineUpleftIcon
