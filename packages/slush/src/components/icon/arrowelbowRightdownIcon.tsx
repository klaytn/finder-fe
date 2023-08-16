import { IconProps } from './type'

const ArrowelbowRightdownIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2929 19.2929C15.6834 18.9024 16.3166 18.9024 16.7071 19.2929L22 24.5858L27.2929 19.2929C27.6834 18.9024 28.3166 18.9024 28.7071 19.2929C29.0976 19.6834 29.0976 20.3166 28.7071 20.7071L22.7071 26.7071C22.3166 27.0976 21.6834 27.0976 21.2929 26.7071L15.2929 20.7071C14.9024 20.3166 14.9024 19.6834 15.2929 19.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 8C3 7.44772 3.44772 7 4 7H22C22.5523 7 23 7.44772 23 8V26C23 26.5523 22.5523 27 22 27C21.4477 27 21 26.5523 21 26V9H4C3.44772 9 3 8.55228 3 8Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowRightdownIcon
