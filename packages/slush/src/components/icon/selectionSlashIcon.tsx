import { IconProps } from './type'

const SelectionSlashIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 5C13 4.44772 13.4477 4 14 4H18C18.5523 4 19 4.44772 19 5C19 5.55228 18.5523 6 18 6H14C13.4477 6 13 5.55228 13 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 27C13 26.4477 13.4477 26 14 26H18C18.5523 26 19 26.4477 19 27C19 27.5523 18.5523 28 18 28H14C13.4477 28 13 27.5523 13 27Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 5C22 4.44772 22.4477 4 23 4H26C26.5304 4 27.0391 4.21071 27.4142 4.58579C27.7893 4.96086 28 5.46957 28 6V9C28 9.55228 27.5523 10 27 10C26.4477 10 26 9.55228 26 9L26 6L23 6C22.4477 6 22 5.55228 22 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 13C27.5523 13 28 13.4477 28 14V18C28 18.5523 27.5523 19 27 19C26.4477 19 26 18.5523 26 18V14C26 13.4477 26.4477 13 27 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 13C5.55228 13 6 13.4477 6 14V18C6 18.5523 5.55228 19 5 19C4.44772 19 4 18.5523 4 18V14C4 13.4477 4.44772 13 5 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 22C5.55228 22 6 22.4477 6 23V26H9C9.55228 26 10 26.4477 10 27C10 27.5523 9.55228 28 9 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V23C4 22.4477 4.44772 22 5 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.32733 4.26007C5.73599 3.88856 6.36844 3.91868 6.73995 4.32733L26.7399 26.3273C27.1115 26.736 27.0813 27.3684 26.6727 27.7399C26.264 28.1115 25.6316 28.0813 25.2601 27.6727L5.26007 5.67268C4.88856 5.26402 4.91868 4.63157 5.32733 4.26007Z"
                fill={color}
            />
        </svg>
    )
}

export default SelectionSlashIcon
