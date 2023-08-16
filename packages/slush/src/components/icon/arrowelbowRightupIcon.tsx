import { IconProps } from './type'

const ArrowelbowRightupIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2929 5.29289C21.6834 4.90237 22.3166 4.90237 22.7071 5.29289L28.7071 11.2929C29.0976 11.6834 29.0976 12.3166 28.7071 12.7071C28.3166 13.0976 27.6834 13.0976 27.2929 12.7071L22 7.41421L16.7071 12.7071C16.3166 13.0976 15.6834 13.0976 15.2929 12.7071C14.9024 12.3166 14.9024 11.6834 15.2929 11.2929L21.2929 5.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 5C22.5523 5 23 5.44772 23 6V24C23 24.5523 22.5523 25 22 25H4C3.44772 25 3 24.5523 3 24C3 23.4477 3.44772 23 4 23H21V6C21 5.44772 21.4477 5 22 5Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowRightupIcon
