import { IconProps } from './type'

const ArrowcomboVerticalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2929 2.29289C15.6834 1.90237 16.3166 1.90237 16.7071 2.29289L20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711C20.3166 8.09763 19.6834 8.09763 19.2929 7.70711L16 4.41421L12.7071 7.70711C12.3166 8.09763 11.6834 8.09763 11.2929 7.70711C10.9024 7.31658 10.9024 6.68342 11.2929 6.29289L15.2929 2.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 2C16.5523 2 17 2.44772 17 3V29C17 29.5523 16.5523 30 16 30C15.4477 30 15 29.5523 15 29V3C15 2.44772 15.4477 2 16 2Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2929 24.2929C11.6834 23.9024 12.3166 23.9024 12.7071 24.2929L16 27.5858L19.2929 24.2929C19.6834 23.9024 20.3166 23.9024 20.7071 24.2929C21.0976 24.6834 21.0976 25.3166 20.7071 25.7071L16.7071 29.7071C16.3166 30.0976 15.6834 30.0976 15.2929 29.7071L11.2929 25.7071C10.9024 25.3166 10.9024 24.6834 11.2929 24.2929Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcomboVerticalIcon
