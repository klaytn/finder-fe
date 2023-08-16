import { IconProps } from './type'

const PockersymbolDiamondIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.49667 17.4142C1.71562 16.6332 1.71562 15.3668 2.49667 14.5858L14.5794 2.5031C15.3604 1.72205 16.6267 1.72205 17.4078 2.5031L29.494 14.5893C30.2751 15.3704 30.2751 16.6367 29.494 17.4177L17.4113 29.5004C16.6303 30.2815 15.3639 30.2815 14.5829 29.5004L2.49667 17.4142ZM15.9936 3.91731L3.91089 16L15.9971 28.0862L28.0798 16.0035L15.9936 3.91731Z"
                fill={color}
            />
        </svg>
    )
}

export default PockersymbolDiamondIcon
