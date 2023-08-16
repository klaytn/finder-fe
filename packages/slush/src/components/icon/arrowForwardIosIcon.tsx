import { IconProps } from './type'

const ArrowForwardIosIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.94922 18.4525L7.57172 20.075L16.6467 11L7.57172 1.92505L5.94922 3.54755L13.4017 11L5.94922 18.4525Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowForwardIosIcon
