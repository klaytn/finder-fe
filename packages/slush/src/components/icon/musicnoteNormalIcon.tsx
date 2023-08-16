import { IconProps } from './type'

const MusicnoteNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 19C8.79086 19 7 20.7909 7 23C7 25.2091 8.79086 27 11 27C13.2091 27 15 25.2091 15 23C15 20.7909 13.2091 19 11 19ZM5 23C5 19.6863 7.68629 17 11 17C14.3137 17 17 19.6863 17 23C17 26.3137 14.3137 29 11 29C7.68629 29 5 26.3137 5 23Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4031 4.19772C15.6567 4.00902 15.9846 3.95135 16.2874 4.04218L26.2874 7.04218C26.7104 7.16908 27 7.5584 27 8.00001V14C27 14.3161 26.8506 14.6136 26.5969 14.8023C26.3433 14.991 26.0154 15.0487 25.7127 14.9578L17 12.344V23C17 23.5523 16.5523 24 16 24C15.4477 24 15 23.5523 15 23V11.0233C14.9997 11.0081 14.9997 10.9928 15 10.9775V5.00001C15 4.6839 15.1495 4.38641 15.4031 4.19772ZM17 10.256L25 12.656V8.74404L17 6.34404V10.256Z"
                fill={color}
            />
        </svg>
    )
}

export default MusicnoteNormalIcon
