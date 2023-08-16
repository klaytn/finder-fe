import { IconProps } from './type'

const MathPercentIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.7071 6.29289C26.0976 6.68342 26.0976 7.31658 25.7071 7.70711L7.70711 25.7071C7.31658 26.0976 6.68342 26.0976 6.29289 25.7071C5.90237 25.3166 5.90237 24.6834 6.29289 24.2929L24.2929 6.29289C24.6834 5.90237 25.3166 5.90237 25.7071 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 7C8.11929 7 7 8.11929 7 9.5C7 10.8807 8.11929 12 9.5 12C10.8807 12 12 10.8807 12 9.5C12 8.11929 10.8807 7 9.5 7ZM5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.5 20C21.1193 20 20 21.1193 20 22.5C20 23.8807 21.1193 25 22.5 25C23.8807 25 25 23.8807 25 22.5C25 21.1193 23.8807 20 22.5 20ZM18 22.5C18 20.0147 20.0147 18 22.5 18C24.9853 18 27 20.0147 27 22.5C27 24.9853 24.9853 27 22.5 27C20.0147 27 18 24.9853 18 22.5Z"
                fill={color}
            />
        </svg>
    )
}

export default MathPercentIcon
