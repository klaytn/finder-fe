import { IconProps } from './type'

const ArrowBackIosIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.051 3.54755L14.4193 1.92505L5.35352 11L14.4285 20.075L16.051 18.4525L8.59852 11L16.051 3.54755Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowBackIosIcon
