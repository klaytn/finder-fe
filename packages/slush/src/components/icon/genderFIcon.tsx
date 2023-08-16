import { IconProps } from './type'

const GenderFIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4ZM6 12C6 6.47715 10.4772 2 16 2C21.5228 2 26 6.47715 26 12C26 17.5228 21.5228 22 16 22C10.4772 22 6 17.5228 6 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 20C16.5523 20 17 20.4477 17 21V30C17 30.5523 16.5523 31 16 31C15.4477 31 15 30.5523 15 30V21C15 20.4477 15.4477 20 16 20Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 26C10 25.4477 10.4477 25 11 25H21C21.5523 25 22 25.4477 22 26C22 26.5523 21.5523 27 21 27H11C10.4477 27 10 26.5523 10 26Z"
                fill={color}
            />
        </svg>
    )
}

export default GenderFIcon
