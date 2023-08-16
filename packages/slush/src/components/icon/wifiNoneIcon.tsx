import { IconProps } from './type'

const WifiNoneIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 26.5C16.8284 26.5 17.5 25.8284 17.5 25C17.5 24.1716 16.8284 23.5 16 23.5C15.1716 23.5 14.5 24.1716 14.5 25C14.5 25.8284 15.1716 26.5 16 26.5Z"
                fill={color}
            />
        </svg>
    )
}

export default WifiNoneIcon
