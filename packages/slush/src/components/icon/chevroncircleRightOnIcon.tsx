import { IconProps } from './type'

const ChevroncircleRightOmIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM15.169 10.7567C14.7585 10.3873 14.1262 10.4205 13.7567 10.831C13.3873 11.2416 13.4205 11.8738 13.831 12.2433L18.0052 16L13.831 19.7567C13.4205 20.1262 13.3873 20.7585 13.7567 21.169C14.1262 21.5795 14.7585 21.6128 15.169 21.2433L20.169 16.7433C20.3797 16.5537 20.5 16.2835 20.5 16C20.5 15.7165 20.3797 15.4464 20.169 15.2567L15.169 10.7567Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleRightOmIcon
