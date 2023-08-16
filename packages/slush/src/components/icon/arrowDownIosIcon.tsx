import { IconProps } from './type'

const ArrowDownIosIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.47773 2.5689L0.740234 3.31056L4.86523 7.4314L8.99023 3.3064L8.25273 2.5689L4.86523 5.9564L1.47773 2.5689V2.5689Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowDownIosIcon
