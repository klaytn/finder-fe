import { IconProps } from './type'

const ShapeCirclesmallOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="15.9999" r="3.22011" fill={color} stroke={color} strokeWidth="2" />
        </svg>
    )
}

export default ShapeCirclesmallOnIcon
