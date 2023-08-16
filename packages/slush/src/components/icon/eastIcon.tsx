import { IconProps } from './type'

const EastIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 2.5L6.795 3.205L9.085 5.5H1V6.5H9.085L6.79 8.795L7.5 9.5L11 6L7.5 2.5Z" fill={color} />
        </svg>
    )
}

export default EastIcon
