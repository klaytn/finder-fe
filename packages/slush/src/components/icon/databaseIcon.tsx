import { IconProps } from './type'

const DatabaseIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.70068 6.63525C6.8456 7.64712 6 8.88064 6 10C6 11.1194 6.8456 12.3529 8.70068 13.3647C10.5179 14.356 13.0968 15 16 15C18.9032 15 21.4821 14.356 23.2993 13.3647C25.1544 12.3529 26 11.1194 26 10C26 8.88064 25.1544 7.64712 23.2993 6.63525C21.4821 5.64402 18.9032 5 16 5C13.0968 5 10.5179 5.64402 8.70068 6.63525ZM7.74297 4.87946C9.90692 3.69913 12.8281 3 16 3C19.1719 3 22.0931 3.69913 24.257 4.87946C26.3832 6.03917 28 7.80565 28 10C28 12.1943 26.3832 13.9608 24.257 15.1205C22.0931 16.3009 19.1719 17 16 17C12.8281 17 9.90692 16.3009 7.74297 15.1205C5.61684 13.9608 4 12.1943 4 10C4 7.80565 5.61684 6.03917 7.74297 4.87946Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 9C5.55228 9 6 9.44772 6 10V16C6 17.1187 6.84554 18.3522 8.70078 19.3643C10.5181 20.3557 13.0969 21 16 21C18.9031 21 21.4819 20.3557 23.2992 19.3643C25.1545 18.3522 26 17.1187 26 16V10C26 9.44772 26.4477 9 27 9C27.5523 9 28 9.44772 28 10V16C28 18.1938 26.383 19.9603 24.257 21.1201C22.0931 22.3005 19.1719 23 16 23C12.8281 23 9.90691 22.3005 7.74297 21.1201C5.61696 19.9603 4 18.1938 4 16V10C4 9.44772 4.44772 9 5 9Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 15C5.55228 15 6 15.4477 6 16V22C6 23.1187 6.84554 24.3522 8.70078 25.3643C10.5181 26.3557 13.0969 27 16 27C18.9031 27 21.4819 26.3557 23.2992 25.3643C25.1545 24.3522 26 23.1187 26 22V16C26 15.4477 26.4477 15 27 15C27.5523 15 28 15.4477 28 16V22C28 24.1938 26.383 25.9603 24.257 27.1201C22.0931 28.3005 19.1719 29 16 29C12.8281 29 9.90691 28.3005 7.74297 27.1201C5.61696 25.9603 4 24.1938 4 22V16C4 15.4477 4.44772 15 5 15Z"
                fill={color}
            />
        </svg>
    )
}

export default DatabaseIcon
