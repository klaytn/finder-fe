import { IconProps } from './type'

const UploadIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2929 4.29289C15.6834 3.90237 16.3166 3.90237 16.7071 4.29289L21.9571 9.54289C22.3476 9.93342 22.3476 10.5666 21.9571 10.9571C21.5666 11.3476 20.9334 11.3476 20.5429 10.9571L16 6.41421L11.4571 10.9571C11.0666 11.3476 10.4334 11.3476 10.0429 10.9571C9.65237 10.5666 9.65237 9.93342 10.0429 9.54289L15.2929 4.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V5C15 4.44772 15.4477 4 16 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 18C5.55228 18 6 18.4477 6 19V26H26V19C26 18.4477 26.4477 18 27 18C27.5523 18 28 18.4477 28 19V26C28 26.5304 27.7893 27.0391 27.4142 27.4142C27.0391 27.7893 26.5304 28 26 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V19C4 18.4477 4.44772 18 5 18Z"
                fill={color}
            />
        </svg>
    )
}

export default UploadIcon
