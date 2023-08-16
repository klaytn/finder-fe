import { IconProps } from './type'

const ChevroncircleLeftOffIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.7433 10.831C19.1128 11.2416 19.0795 11.8738 18.669 12.2433L14.4948 16L18.669 19.7567C19.0795 20.1262 19.1128 20.7585 18.7433 21.169C18.3738 21.5795 17.7415 21.6128 17.331 21.2433L12.331 16.7433C12.1203 16.5537 12 16.2835 12 16C12 15.7165 12.1203 15.4464 12.331 15.2567L17.331 10.7567C17.7415 10.3873 18.3738 10.4205 18.7433 10.831Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevroncircleLeftOffIcon
