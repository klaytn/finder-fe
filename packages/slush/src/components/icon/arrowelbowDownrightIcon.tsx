import { IconProps } from './type'

const ArrowelbowDownrightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.2929 15.2929C19.6834 14.9024 20.3166 14.9024 20.7071 15.2929L26.7071 21.2929C27.0976 21.6834 27.0976 22.3166 26.7071 22.7071L20.7071 28.7071C20.3166 29.0976 19.6834 29.0976 19.2929 28.7071C18.9024 28.3166 18.9024 27.6834 19.2929 27.2929L24.5858 22L19.2929 16.7071C18.9024 16.3166 18.9024 15.6834 19.2929 15.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 3C8.55228 3 9 3.44772 9 4V21H26C26.5523 21 27 21.4477 27 22C27 22.5523 26.5523 23 26 23H8C7.44772 23 7 22.5523 7 22V4C7 3.44772 7.44772 3 8 3Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowDownrightIcon
