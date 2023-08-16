import { IconProps } from './type'

const BalloonIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C13.6131 4 11.3239 4.94821 9.63604 6.63604C7.94821 8.32387 7 10.6131 7 13C7 15.514 8.02763 18.3011 9.71529 20.4551C11.4059 22.6129 13.6438 24 16 24C18.3562 24 20.5941 22.6129 22.2847 20.4551C23.9724 18.3011 25 15.514 25 13C25 10.6131 24.0518 8.32387 22.364 6.63604C20.6761 4.94821 18.3869 4 16 4ZM8.22183 5.22183C10.2847 3.15893 13.0826 2 16 2C18.9174 2 21.7153 3.15893 23.7782 5.22183C25.8411 7.28473 27 10.0826 27 13C27 16.011 25.7901 19.2239 23.859 21.6886C21.9309 24.1496 19.1688 26 16 26C12.8312 26 10.0691 24.1496 8.14096 21.6886C6.20987 19.2239 5 16.011 5 13C5 10.0826 6.15893 7.28473 8.22183 5.22183Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0214 23.9463C15.5342 24.1514 15.7836 24.7334 15.5785 25.2462L14.477 27.9998H17.523L16.4215 25.2462C16.2164 24.7334 16.4658 24.1514 16.9786 23.9463C17.4914 23.7412 18.0734 23.9906 18.2785 24.5034L19.9285 28.6284C20.0517 28.9365 20.0141 29.2856 19.8281 29.5604C19.642 29.8352 19.3318 29.9998 19 29.9998H13C12.6682 29.9998 12.358 29.8352 12.1719 29.5604C11.9859 29.2856 11.9483 28.9365 12.0715 28.6284L13.7215 24.5034C13.9266 23.9906 14.5086 23.7412 15.0214 23.9463Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.0136 6.92331C16.1043 6.37853 16.6195 6.01043 17.1643 6.10114C18.5987 6.33997 19.9225 7.02113 20.9507 8.04935C21.979 9.07757 22.6601 10.4014 22.899 11.8358C22.9897 12.3806 22.6216 12.8958 22.0768 12.9865C21.532 13.0772 21.0168 12.7091 20.9261 12.1643C20.7558 11.1412 20.2699 10.197 19.5365 9.46356C18.8031 8.73017 17.8589 8.24433 16.8358 8.07398C16.291 7.98327 15.9229 7.4681 16.0136 6.92331Z"
                fill={color}
            />
        </svg>
    )
}

export default BalloonIcon
