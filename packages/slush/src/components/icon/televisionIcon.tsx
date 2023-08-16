import { IconProps } from './type'

const TelevisionIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10C3 8.89543 3.89543 8 5 8H27C28.1046 8 29 8.89543 29 10V25C29 26.1046 28.1046 27 27 27H5C3.89543 27 3 26.1046 3 25V10ZM27 10H5V25H27V10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16 7.58579L21.2929 2.29289C21.6834 1.90237 22.3166 1.90237 22.7071 2.29289C23.0976 2.68342 23.0976 3.31658 22.7071 3.70711L16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L9.29289 3.70711C8.90237 3.31658 8.90237 2.68342 9.29289 2.29289Z"
                fill={color}
            />
        </svg>
    )
}

export default TelevisionIcon
