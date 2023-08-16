import { IconProps } from './type'

const SimcardIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H19C19.2652 3 19.5196 3.10536 19.7071 3.29289L26.7071 10.2929C26.8946 10.4804 27 10.7348 27 11V27C27 27.5304 26.7893 28.0391 26.4142 28.4142C26.0391 28.7893 25.5304 29 25 29H7C6.46957 29 5.96086 28.7893 5.58579 28.4142C5.21071 28.0391 5 27.5304 5 27V5C5 4.46957 5.21071 3.96086 5.58579 3.58579ZM18.5858 5L7 5L7 27H25V11.4142L18.5858 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 15C9 14.4477 9.44772 14 10 14H22C22.5523 14 23 14.4477 23 15V24C23 24.5523 22.5523 25 22 25H10C9.44772 25 9 24.5523 9 24V15ZM11 16V23H21V16H11Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 18C14.5523 18 15 18.4477 15 19V24C15 24.5523 14.5523 25 14 25C13.4477 25 13 24.5523 13 24V19C13 18.4477 13.4477 18 14 18Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 18C18.5523 18 19 18.4477 19 19V24C19 24.5523 18.5523 25 18 25C17.4477 25 17 24.5523 17 24V19C17 18.4477 17.4477 18 18 18Z"
                fill={color}
            />
        </svg>
    )
}

export default SimcardIcon
