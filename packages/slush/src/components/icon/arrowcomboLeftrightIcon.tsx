import { IconProps } from './type'

const ArrowcomboLeftrightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2929 17.2929C21.6834 16.9024 22.3166 16.9024 22.7071 17.2929L26.7071 21.2929C27.0976 21.6834 27.0976 22.3166 26.7071 22.7071L22.7071 26.7071C22.3166 27.0976 21.6834 27.0976 21.2929 26.7071C20.9024 26.3166 20.9024 25.6834 21.2929 25.2929L24.5858 22L21.2929 18.7071C20.9024 18.3166 20.9024 17.6834 21.2929 17.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 22C5 21.4477 5.44772 21 6 21H26C26.5523 21 27 21.4477 27 22C27 22.5523 26.5523 23 26 23H6C5.44772 23 5 22.5523 5 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7071 5.29289C11.0976 5.68342 11.0976 6.31658 10.7071 6.70711L7.41421 10L10.7071 13.2929C11.0976 13.6834 11.0976 14.3166 10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289L9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 10C5 9.44772 5.44772 9 6 9H26C26.5523 9 27 9.44772 27 10C27 10.5523 26.5523 11 26 11H6C5.44772 11 5 10.5523 5 10Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcomboLeftrightIcon
