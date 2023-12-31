import { IconProps } from './type'

const MailOpenOffIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4453 3.16795C15.7812 2.94402 16.2188 2.94402 16.5547 3.16795L28.5547 11.1679C28.8329 11.3534 29 11.6656 29 12V25C29 25.5304 28.7893 26.0391 28.4142 26.4142C28.0391 26.7893 27.5304 27 27 27H5C4.46957 27 3.96086 26.7893 3.58579 26.4142C3.21071 26.0391 3 25.5304 3 25V12C3 11.6656 3.1671 11.3534 3.4453 11.1679L15.4453 3.16795ZM5 12.5352V25H27V12.5352L16 5.20185L5 12.5352Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.18593 11.4193C3.50667 10.9697 4.13116 10.8653 4.58076 11.186L14.1326 18.0001H17.8674L27.4193 11.186C27.8689 10.8653 28.4934 10.9697 28.8141 11.4193C29.1348 11.8689 29.0304 12.4934 28.5808 12.8142L18.7683 19.8142C18.5988 19.9351 18.3957 20.0001 18.1875 20.0001H13.8125C13.6043 20.0001 13.4013 19.9351 13.2318 19.8142L3.41927 12.8142C2.96966 12.4934 2.8652 11.8689 3.18593 11.4193Z"
                fill={color}
            />
        </svg>
    )
}

export default MailOpenOffIcon
