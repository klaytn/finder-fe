import { IconProps } from './type'

const SegmentLineIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 22C6.89543 22 6 22.8954 6 24C6 25.1046 6.89543 26 8 26C9.10457 26 10 25.1046 10 24C10 22.8954 9.10457 22 8 22ZM4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 6C22.8954 6 22 6.89543 22 8C22 9.10457 22.8954 10 24 10C25.1046 10 26 9.10457 26 8C26 6.89543 25.1046 6 24 6ZM20 8C20 5.79086 21.7909 4 24 4C26.2091 4 28 5.79086 28 8C28 10.2091 26.2091 12 24 12C21.7909 12 20 10.2091 20 8Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.5821 9.41789C22.9726 9.80842 22.9726 10.4416 22.5821 10.8321L10.8321 22.5821C10.4416 22.9726 9.80842 22.9726 9.41789 22.5821C9.02737 22.1916 9.02737 21.5584 9.41789 21.1679L21.1679 9.41789C21.5584 9.02737 22.1916 9.02737 22.5821 9.41789Z"
                fill={color}
            />
        </svg>
    )
}

export default SegmentLineIcon
