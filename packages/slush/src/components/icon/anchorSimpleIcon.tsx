import { IconProps } from './type'

const AnchorSimpleIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C14.8954 6 14 6.89543 14 8C14 9.10457 14.8954 10 16 10C17.1046 10 18 9.10457 18 8C18 6.89543 17.1046 6 16 6ZM12 8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10C16.5523 10 17 10.4477 17 11V27C17 27.5523 16.5523 28 16 28C15.4477 28 15 27.5523 15 27V11C15 10.4477 15.4477 10 16 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.29289 14.2929C3.48043 14.1054 3.73478 14 4 14H7C7.55228 14 8 14.4477 8 15C8 15.5523 7.55228 16 7 16H5.04552C5.27827 18.5507 6.39596 20.9523 8.22183 22.7782C10.2847 24.8411 13.0826 26 16 26C18.9174 26 21.7153 24.8411 23.7782 22.7782C25.604 20.9523 26.7217 18.5507 26.9545 16H25C24.4477 16 24 15.5523 24 15C24 14.4477 24.4477 14 25 14H28C28.2652 14 28.5196 14.1054 28.7071 14.2929C28.8946 14.4804 29 14.7348 29 15C29 18.4478 27.6304 21.7544 25.1924 24.1924C22.7544 26.6304 19.4478 28 16 28C12.5522 28 9.24558 26.6304 6.80761 24.1924C4.36964 21.7544 3 18.4478 3 15C3 14.7348 3.10536 14.4804 3.29289 14.2929Z"
                fill={color}
            />
        </svg>
    )
}

export default AnchorSimpleIcon
