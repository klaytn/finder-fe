import { IconProps } from './type'

const ArrowelbowUprightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289L26.7071 9.29289C27.0976 9.68342 27.0976 10.3166 26.7071 10.7071L20.7071 16.7071C20.3166 17.0976 19.6834 17.0976 19.2929 16.7071C18.9024 16.3166 18.9024 15.6834 19.2929 15.2929L24.5858 10L19.2929 4.70711C18.9024 4.31658 18.9024 3.68342 19.2929 3.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 10C7 9.44772 7.44772 9 8 9H26C26.5523 9 27 9.44772 27 10C27 10.5523 26.5523 11 26 11H9V28C9 28.5523 8.55228 29 8 29C7.44772 29 7 28.5523 7 28V10Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowelbowUprightIcon
