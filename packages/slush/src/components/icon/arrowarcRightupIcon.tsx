import { IconProps } from './type'

const ArrowarcRightupIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.2929 3.29289C18.6834 2.90237 19.3166 2.90237 19.7071 3.29289L25.7071 9.29289C26.0976 9.68342 26.0976 10.3166 25.7071 10.7071C25.3166 11.0976 24.6834 11.0976 24.2929 10.7071L19 5.41421L13.7071 10.7071C13.3166 11.0976 12.6834 11.0976 12.2929 10.7071C11.9024 10.3166 11.9024 9.68342 12.2929 9.29289L18.2929 3.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 3C19.5523 3 20 3.44772 20 4V16C20 19.4478 18.6304 22.7544 16.1924 25.1924C13.7544 27.6304 10.4478 29 7 29C6.44772 29 6 28.5523 6 28C6 27.4477 6.44772 27 7 27C9.91738 27 12.7153 25.8411 14.7782 23.7782C16.8411 21.7153 18 18.9174 18 16V4C18 3.44772 18.4477 3 19 3Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowarcRightupIcon
