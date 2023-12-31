import { IconProps } from './type'

const ConfirmSquareoffsetIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.08579 5.08579C5.46086 4.71071 5.96957 4.5 6.5 4.5H25.5C26.0304 4.5 26.5391 4.71071 26.9142 5.08579C27.2893 5.46086 27.5 5.96957 27.5 6.5V25.5C27.5 26.0304 27.2893 26.5391 26.9142 26.9142C26.5391 27.2893 26.0304 27.5 25.5 27.5H16.95C16.3977 27.5 15.95 27.0523 15.95 26.5C15.95 25.9477 16.3977 25.5 16.95 25.5H25.5V6.5L6.5 6.5L6.5 17.9125C6.5 18.4648 6.05228 18.9125 5.5 18.9125C4.94772 18.9125 4.5 18.4648 4.5 17.9125V6.5C4.5 5.96957 4.71071 5.46086 5.08579 5.08579Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7071 18.2929C17.0976 18.6834 17.0976 19.3166 16.7071 19.7071L8.70711 27.7071C8.31658 28.0976 7.68342 28.0976 7.29289 27.7071L3.29289 23.7071C2.90237 23.3166 2.90237 22.6834 3.29289 22.2929C3.68342 21.9024 4.31658 21.9024 4.70711 22.2929L8 25.5858L15.2929 18.2929C15.6834 17.9024 16.3166 17.9024 16.7071 18.2929Z"
                fill={color}
            />
        </svg>
    )
}

export default ConfirmSquareoffsetIcon
