import { IconProps } from './type'

const ListBulletsIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 8C10 7.44772 10.4477 7 11 7H27C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9H11C10.4477 9 10 8.55228 10 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 16C10 15.4477 10.4477 15 11 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H11C10.4477 17 10 16.5523 10 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 24C10 23.4477 10.4477 23 11 23H27C27.5523 23 28 23.4477 28 24C28 24.5523 27.5523 25 27 25H11C10.4477 25 10 24.5523 10 24Z"
                fill={color}
            />
            <path
                d="M5.5 9.5C6.32843 9.5 7 8.82843 7 8C7 7.17157 6.32843 6.5 5.5 6.5C4.67157 6.5 4 7.17157 4 8C4 8.82843 4.67157 9.5 5.5 9.5Z"
                fill={color}
            />
            <path
                d="M5.5 17.5C6.32843 17.5 7 16.8284 7 16C7 15.1716 6.32843 14.5 5.5 14.5C4.67157 14.5 4 15.1716 4 16C4 16.8284 4.67157 17.5 5.5 17.5Z"
                fill={color}
            />
            <path
                d="M5.5 25.5C6.32843 25.5 7 24.8284 7 24C7 23.1716 6.32843 22.5 5.5 22.5C4.67157 22.5 4 23.1716 4 24C4 24.8284 4.67157 25.5 5.5 25.5Z"
                fill={color}
            />
        </svg>
    )
}

export default ListBulletsIcon
