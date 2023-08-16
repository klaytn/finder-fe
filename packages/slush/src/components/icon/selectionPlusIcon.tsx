import { IconProps } from './type'

const SelectionPlusIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 6C13.5 5.44772 13.9477 5 14.5 5H17.5C18.0523 5 18.5 5.44772 18.5 6C18.5 6.55228 18.0523 7 17.5 7H14.5C13.9477 7 13.5 6.55228 13.5 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 26C13.5 25.4477 13.9477 25 14.5 25H17.5C18.0523 25 18.5 25.4477 18.5 26C18.5 26.5523 18.0523 27 17.5 27H14.5C13.9477 27 13.5 26.5523 13.5 26Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5 6C21.5 5.44772 21.9477 5 22.5 5H25C25.5304 5 26.0391 5.21071 26.4142 5.58579C26.7893 5.96086 27 6.46957 27 7V9.5C27 10.0523 26.5523 10.5 26 10.5C25.4477 10.5 25 10.0523 25 9.5L25 7L22.5 7C21.9477 7 21.5 6.55228 21.5 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 13.5C26.5523 13.5 27 13.9477 27 14.5V17.5C27 18.0523 26.5523 18.5 26 18.5C25.4477 18.5 25 18.0523 25 17.5V14.5C25 13.9477 25.4477 13.5 26 13.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 13.5C6.55228 13.5 7 13.9477 7 14.5V17.5C7 18.0523 6.55228 18.5 6 18.5C5.44772 18.5 5 18.0523 5 17.5V14.5C5 13.9477 5.44772 13.5 6 13.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 21.5C6.55228 21.5 7 21.9477 7 22.5V25H9.5C10.0523 25 10.5 25.4477 10.5 26C10.5 26.5523 10.0523 27 9.5 27H7C6.46957 27 5.96086 26.7893 5.58579 26.4142C5.21071 26.0391 5 25.5304 5 25V22.5C5 21.9477 5.44772 21.5 6 21.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5H9.5C10.0523 5 10.5 5.44772 10.5 6C10.5 6.55228 10.0523 7 9.5 7L7 7L7 9.5C7 10.0523 6.55228 10.5 6 10.5C5.44772 10.5 5 10.0523 5 9.5V7C5 6.46957 5.21071 5.96086 5.58579 5.58579Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 21.5C26.5523 21.5 27 21.9477 27 22.5V29.5C27 30.0523 26.5523 30.5 26 30.5C25.4477 30.5 25 30.0523 25 29.5V22.5C25 21.9477 25.4477 21.5 26 21.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5 26C21.5 25.4477 21.9477 25 22.5 25H29.5C30.0523 25 30.5 25.4477 30.5 26C30.5 26.5523 30.0523 27 29.5 27H22.5C21.9477 27 21.5 26.5523 21.5 26Z"
                fill={color}
            />
        </svg>
    )
}

export default SelectionPlusIcon
