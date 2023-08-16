import { IconProps } from './type'

const SignpostIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.58579 8.58579C3.96086 8.21071 4.46957 8 5 8H25.5C25.7835 8 26.0537 8.12032 26.2433 8.33104L30.7433 13.331C31.0856 13.7113 31.0856 14.2887 30.7433 14.669L26.2433 19.669C26.0537 19.8797 25.7835 20 25.5 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V10C3 9.46957 3.21071 8.96086 3.58579 8.58579ZM25.0546 10L5 10L5 18H25.0546L28.6546 14L25.0546 10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 3C16.5523 3 17 3.44772 17 4V9C17 9.55228 16.5523 10 16 10C15.4477 10 15 9.55228 15 9V4C15 3.44772 15.4477 3 16 3Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 18C16.5523 18 17 18.4477 17 19V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V19C15 18.4477 15.4477 18 16 18Z"
                fill={color}
            />
        </svg>
    )
}

export default SignpostIcon
