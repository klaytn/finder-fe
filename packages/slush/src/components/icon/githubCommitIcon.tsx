import { IconProps } from './type'

const GithubCommitIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10.5C12.9624 10.5 10.5 12.9624 10.5 16C10.5 19.0376 12.9624 21.5 16 21.5C19.0376 21.5 21.5 19.0376 21.5 16C21.5 12.9624 19.0376 10.5 16 10.5ZM8.5 16C8.5 11.8579 11.8579 8.5 16 8.5C20.1421 8.5 23.5 11.8579 23.5 16C23.5 20.1421 20.1421 23.5 16 23.5C11.8579 23.5 8.5 20.1421 8.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 16C0 15.4477 0.447715 15 1 15H9.5C10.0523 15 10.5 15.4477 10.5 16C10.5 16.5523 10.0523 17 9.5 17H1C0.447715 17 0 16.5523 0 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5 16C21.5 15.4477 21.9477 15 22.5 15H31C31.5523 15 32 15.4477 32 16C32 16.5523 31.5523 17 31 17H22.5C21.9477 17 21.5 16.5523 21.5 16Z"
                fill={color}
            />
        </svg>
    )
}

export default GithubCommitIcon
