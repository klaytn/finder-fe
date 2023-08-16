import { IconProps } from './type'

const ArrowcomboDownupIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 21.2929C5.68342 20.9024 6.31658 20.9024 6.70711 21.2929L10 24.5858L13.2929 21.2929C13.6834 20.9024 14.3166 20.9024 14.7071 21.2929C15.0976 21.6834 15.0976 22.3166 14.7071 22.7071L10.7071 26.7071C10.3166 27.0976 9.68342 27.0976 9.29289 26.7071L5.29289 22.7071C4.90237 22.3166 4.90237 21.6834 5.29289 21.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5C10.5523 5 11 5.44772 11 6V26C11 26.5523 10.5523 27 10 27C9.44772 27 9 26.5523 9 26V6C9 5.44772 9.44772 5 10 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2929 5.29289C21.6834 4.90237 22.3166 4.90237 22.7071 5.29289L26.7071 9.29289C27.0976 9.68342 27.0976 10.3166 26.7071 10.7071C26.3166 11.0976 25.6834 11.0976 25.2929 10.7071L22 7.41421L18.7071 10.7071C18.3166 11.0976 17.6834 11.0976 17.2929 10.7071C16.9024 10.3166 16.9024 9.68342 17.2929 9.29289L21.2929 5.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 5C22.5523 5 23 5.44772 23 6V26C23 26.5523 22.5523 27 22 27C21.4477 27 21 26.5523 21 26V6C21 5.44772 21.4477 5 22 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcomboDownupIcon
