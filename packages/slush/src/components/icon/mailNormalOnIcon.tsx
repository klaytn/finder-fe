import { IconProps } from './type'

const MailNormalOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7.36091V24C3 24.5304 3.21071 25.0391 3.58579 25.4142C3.96086 25.7893 4.46957 26 5 26H27C27.5304 26 28.0391 25.7893 28.4142 25.4142C28.7893 25.0391 29 24.5304 29 24V7.36092L16.6783 18.7348C16.2952 19.0884 15.7048 19.0884 15.3217 18.7348L3 7.36091ZM27.5257 6H4.47432L16 16.6391L27.5257 6Z"
                fill={color}
            />
        </svg>
    )
}

export default MailNormalOnIcon
