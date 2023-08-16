import { IconProps } from './type'

const ConfirmSquareIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2236 12.3097C22.6048 12.7093 22.5899 13.3423 22.1903 13.7236L14.8528 20.7236C14.4662 21.0924 13.8579 21.0921 13.4716 20.723L9.80912 17.223C9.40983 16.8414 9.39547 16.2084 9.77704 15.8091C10.1586 15.4098 10.7916 15.3955 11.1909 15.777L14.1631 18.6174L20.8097 12.2765C21.2093 11.8952 21.8423 11.9101 22.2236 12.3097Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V6ZM26 6H6V26H26V6Z"
                fill={color}
            />
        </svg>
    )
}

export default ConfirmSquareIcon
