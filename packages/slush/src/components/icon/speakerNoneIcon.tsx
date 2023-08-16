import { IconProps } from './type'

const SpeakerNoneIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.4394 3.10169C19.7824 3.2695 20 3.61807 20 4.00001V28C20 28.3819 19.7824 28.7305 19.4394 28.8983C19.0963 29.0661 18.6875 29.0238 18.3861 28.7894L9.65689 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H9.65689L18.3861 3.21066C18.6875 2.97617 19.0963 2.93389 19.4394 3.10169ZM18 6.04465L10.6139 11.7894C10.4384 11.9259 10.2224 12 10 12H4V20H10C10.2224 20 10.4384 20.0741 10.6139 20.2107L18 25.9554V6.04465Z"
                fill={color}
            />
        </svg>
    )
}

export default SpeakerNoneIcon
