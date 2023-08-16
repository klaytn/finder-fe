import { IconProps } from './type'

const ChevroncircleLeftOmIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM18.669 12.2433C19.0795 11.8738 19.1128 11.2416 18.7433 10.831C18.3738 10.4205 17.7415 10.3873 17.331 10.7567L12.331 15.2567C12.1203 15.4464 12 15.7165 12 16C12 16.2835 12.1203 16.5537 12.331 16.7433L17.331 21.2433C17.7415 21.6128 18.3738 21.5795 18.7433 21.169C19.1128 20.7585 19.0795 20.1262 18.669 19.7567L14.4948 16L18.669 12.2433Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleLeftOmIcon
