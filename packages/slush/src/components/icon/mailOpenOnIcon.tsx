import { IconProps } from './type'

const MailOpenOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4453 3.16795C15.7812 2.94402 16.2188 2.94402 16.5547 3.16795L28.1313 10.8857L17.8747 18.0001H14.1254L3.86875 10.8857L15.4453 3.16795ZM3 12.7171V25C3 25.5304 3.21071 26.0391 3.58579 26.4142C3.96086 26.7893 4.46957 27 5 27H27C27.5304 27 28.0391 26.7893 28.4142 26.4142C28.7893 26.0391 29 25.5304 29 25V12.7171L18.7575 19.8218C18.5901 19.9379 18.3912 20.0001 18.1875 20.0001H13.8125C13.6088 20.0001 13.41 19.9379 13.2426 19.8218L3 12.7171Z"
                fill={color}
            />
        </svg>
    )
}

export default MailOpenOnIcon
