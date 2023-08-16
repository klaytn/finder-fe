import { IconProps } from './type'

const ArrowelbowDownleftIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071L7.41421 22L12.7071 27.2929C13.0976 27.6834 13.0976 28.3166 12.7071 28.7071C12.3166 29.0976 11.6834 29.0976 11.2929 28.7071L5.29289 22.7071C4.90237 22.3166 4.90237 21.6834 5.29289 21.2929L11.2929 15.2929C11.6834 14.9024 12.3166 14.9024 12.7071 15.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 3C24.5523 3 25 3.44772 25 4V22C25 22.5523 24.5523 23 24 23H6C5.44772 23 5 22.5523 5 22C5 21.4477 5.44772 21 6 21H23V4C23 3.44772 23.4477 3 24 3Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowDownleftIcon
