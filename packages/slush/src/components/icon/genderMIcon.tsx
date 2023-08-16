import { IconProps } from './type'

const GenderMIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.9498 25.0502C21.3403 25.4407 21.3403 26.0739 20.9498 26.4644L16.7071 30.7071C16.3166 31.0976 15.6834 31.0976 15.2929 30.7071L11.0503 26.4644C10.6597 26.0739 10.6597 25.4407 11.0503 25.0502C11.4408 24.6597 12.0739 24.6597 12.4645 25.0502L16 28.5858L19.5355 25.0502C19.9261 24.6597 20.5592 24.6597 20.9498 25.0502Z"
                fill={color}
            />
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
        </svg>
    )
}

export default GenderMIcon
