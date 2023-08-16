import { IconProps } from './type'

const ChatMultiIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H21C21.5304 4 22.0391 4.21071 22.4142 4.58579C22.7893 4.96086 23 5.46957 23 6V17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H9.30354L4.62852 22.7778C4.32884 23.02 3.9167 23.0684 3.56902 22.9024C3.22135 22.7363 3 22.3853 3 22V6C3 5.46957 3.21071 4.96086 3.58579 4.58579ZM21 6L5 6L5 19.9062L8.32148 17.2222C8.4994 17.0784 8.72124 17 8.95 17H21V6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 11C21 10.4477 21.4477 10 22 10H27C27.5304 10 28.0391 10.2107 28.4142 10.5858C28.7893 10.9609 29 11.4696 29 12V28C29 28.3853 28.7786 28.7363 28.431 28.9024C28.0833 29.0684 27.6712 29.02 27.3715 28.7778L22.6965 25H11C10.4696 25 9.96086 24.7893 9.58579 24.4142C9.21071 24.0391 9 23.5304 9 23V18C9 17.4477 9.44772 17 10 17C10.5523 17 11 17.4477 11 18V23H23.05C23.2788 23 23.5006 23.0784 23.6785 23.2222L27 25.9062V12H22C21.4477 12 21 11.5523 21 11Z"
                fill={color}
            />
        </svg>
    )
}

export default ChatMultiIcon
