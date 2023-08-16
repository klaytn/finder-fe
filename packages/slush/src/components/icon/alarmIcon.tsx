import { IconProps } from './type'

const AlarmIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16.5523 8 17 8.44772 17 9V15H23C23.5523 15 24 15.4477 24 16C24 16.5523 23.5523 17 23 17H16C15.4477 17 15 16.5523 15 16V9C15 8.44772 15.4477 8 16 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6ZM4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.7804 2.5678C24.171 2.17727 24.8041 2.17727 25.1947 2.5678L29.4322 6.80529C29.8227 7.19582 29.8227 7.82898 29.4322 8.21951C29.0416 8.61003 28.4085 8.61003 28.0179 8.21951L23.7804 3.98201C23.3899 3.59148 23.3899 2.95832 23.7804 2.5678Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.21951 2.5678C8.61003 2.95832 8.61003 3.59148 8.21951 3.98201L3.98201 8.21951C3.59148 8.61003 2.95832 8.61003 2.5678 8.21951C2.17727 7.82898 2.17727 7.19582 2.5678 6.8053L6.8053 2.5678C7.19582 2.17727 7.82898 2.17727 8.21951 2.5678Z"
                fill={color}
            />
        </svg>
    )
}

export default AlarmIcon
