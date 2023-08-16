import { IconProps } from './type'

const UsersquareIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 11C13.7909 11 12 12.7909 12 15C12 17.2091 13.7909 19 16 19C18.2091 19 20 17.2091 20 15C20 12.7909 18.2091 11 16 11ZM10 15C10 11.6863 12.6863 9 16 9C19.3137 9 22 11.6863 22 15C22 18.3137 19.3137 21 16 21C12.6863 21 10 18.3137 10 15Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6C4 4.89543 4.89543 4 6 4H26C27.1046 4 28 4.89543 28 6V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V6ZM26 6H6V26H26V6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 21C14.1872 21 12.4282 21.6157 11.0111 22.7462C9.59397 23.8766 8.60282 25.4549 8.20001 27.2224C8.07729 27.7608 7.54128 28.0979 7.00281 27.9752C6.46433 27.8524 6.12729 27.3164 6.25001 26.778C6.75352 24.5686 7.99246 22.5958 9.76385 21.1827C11.5352 19.7696 13.734 19 16 19C18.266 19 20.4648 19.7696 22.2362 21.1827C24.0076 22.5958 25.2465 24.5686 25.75 26.778C25.8727 27.3164 25.5357 27.8524 24.9972 27.9752C24.4587 28.0979 23.9227 27.7608 23.8 27.2224C23.3972 25.4549 22.4061 23.8766 20.9889 22.7462C19.5718 21.6157 17.8128 21 16 21Z"
                fill={color}
            />
        </svg>
    )
}

export default UsersquareIcon
