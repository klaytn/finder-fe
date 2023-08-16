import { IconProps } from './type'

const RadioCheckIcon = ({ size }: IconProps) => (
    <svg width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx={8} cy={8} r={8} fill="#7A70FF" />
        <circle cx={8} cy={8} r={4} fill="#19171C" />
    </svg>
)

export default RadioCheckIcon
